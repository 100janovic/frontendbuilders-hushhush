import { inject } from "@angular/core";
import { patchState, signalStore, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from "@ngrx/signals/rxjs-interop";
import { catchError, filter, map, of, switchMap, tap } from "rxjs";
import { AuthStore } from "../auth/auth.store";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";
import { Secret } from "./secrets.model";

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

        return {
            getSecrets: rxMethod<void>($p => $p.pipe(
                map(() => authStore.user()?.id),
                filter((userId) => !!userId),
                tap(() => patchState(state, { loading: true })),
                switchMap((userId) => http.get(`${environment.api}/api/secrets/${userId}`).pipe(
                    tap((results: any) => {
                        patchState(state, {
                            loading: false,
                            secrets: results.secrets
                        });
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