import { inject } from "@angular/core";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { catchError, filter, map, of, switchMap, tap } from "rxjs";
import { AuthStore } from "../auth/auth.store";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { Secret } from "./secrets.model";
import { Router } from "@angular/router";

export const SecretsStore = signalStore({
    providedIn: 'root'
},
    withState({
        secrets: [],
        loading: false
    } as {
        secrets: Secret[],
        loading: boolean
    }),
    withMethods((state) => {

        const authStore = inject(AuthStore);
        const http = inject(HttpClient);
        const router = inject(Router);

        return {
            getSecrets: rxMethod<void>($p => $p.pipe(
                map(() => authStore.user()?.id),
                filter((userId) => !!userId),
                tap(() => patchState(state, { loading: true })),
                switchMap((userId) => http.get(`${environment.api}/secrets/${userId}`).pipe(
                    tap((results: any) => {
                        patchState(state, {
                            loading: false,
                            secrets: results.secrets.map((s: Secret) => ({
                                ...s,
                                displayValue: s.value.split('').map((v) => '*').join('')
                            }))
                        });
                    }),
                    catchError(err => {
                        patchState(state, { loading: false })
                        return of(err);
                    })
                ))
            )),
            addSecret: rxMethod<Secret>($p => $p.pipe(
                tap(() => patchState(state, { loading: true })),
                switchMap((payload: Secret) =>
                    http.post(`${environment.api}/secrets/${authStore.user()?.id}`, payload).pipe(
                        tap((results: any) => {
                            patchState(state, {
                                loading: false,
                                secrets: [...state.secrets(), results.secret]
                            });
                            router.navigateByUrl('/');
                        }),
                        catchError(err => {
                            patchState(state, { loading: false })
                            return of(err);
                        })
                    ))
            )),
            deleteSecret: rxMethod<number>($p => $p.pipe(
                switchMap((id: number) => http.delete(`${environment.api}/secrets/${id}`).pipe(
                    tap((results: any) => {
                        patchState(state, {
                            secrets: state.secrets().filter(s => s.id !== id)
                        });
                        router.navigateByUrl('/');
                    }),
                    catchError(err => {
                        patchState(state, { loading: false })
                        return of(err);
                    })
                ))
            ))
        }
    })
)