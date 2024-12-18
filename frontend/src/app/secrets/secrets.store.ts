import { inject } from "@angular/core";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { catchError, of, switchMap, tap } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { Secret } from "./secrets.model";
import { Router } from "@angular/router";
import copy from "copy-to-clipboard";
import { ToastsStore } from "../shared/toast.store";

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

        const http = inject(HttpClient);
        const router = inject(Router);
        const toastStore = inject(ToastsStore);

        return {
            getSecrets: rxMethod<void>($p => $p.pipe(
                tap(() => patchState(state, { loading: true })),
                switchMap(() => http.get(`${environment.api}/secrets`).pipe(
                    tap((results: any) => {
                        patchState(state, {
                            loading: false,
                            secrets: results.secrets
                        });
                    }),
                    catchError(err => {
                        patchState(state, { loading: false });
                        toastStore.add({
                            message: err.message,
                            type: 'error'
                        });
                        return of(err);
                    })
                ))
            )),
            getSecretById: rxMethod<number>($p => $p.pipe(
                tap(() => patchState(state, { loading: true })),
                switchMap((id) => http.get(`${environment.api}/secrets/${id}`).pipe(
                    tap((results: any) => {
                        patchState(state, {
                            loading: false
                        });
                        copy(results.secret?.value);
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
                    http.post(`${environment.api}/secrets`, payload).pipe(
                        tap((results: any) => {
                            patchState(state, {
                                loading: false,
                                secrets: [...state.secrets(), results.secret]
                            });
                            toastStore.add({
                                message: 'Secret is saved!',
                                type: 'success'
                            });
                            router.navigateByUrl('/');
                        }),
                        catchError(err => {
                            patchState(state, { loading: false });
                            toastStore.add({
                                message: err.message,
                                type: 'error'
                            });
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
                        toastStore.add({
                            message: 'Secret is deleted!',
                            type: 'info'
                        });
                        router.navigateByUrl('/');
                    }),
                    catchError(err => {
                        patchState(state, { loading: false });
                        toastStore.add({
                            message: err.message,
                            type: 'error'
                        });
                        return of(err);
                    })
                ))
            ))
        }
    })
)