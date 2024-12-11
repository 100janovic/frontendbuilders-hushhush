import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { AuthState, Login, LoginResults } from "./auth.models";
import { catchError, filter, finalize, of, switchMap, tap } from "rxjs";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";

export const AuthStore = signalStore({
    providedIn: 'root'
},
    withState({
        user: {},
        authenticated: false,
        loading: false
    } as AuthState),

    withMethods((state) => {

        const router = inject(Router);
        const http = inject(HttpClient);

        return {
            login: rxMethod<Login>((payload$) => payload$.pipe(
                tap(() => patchState(state, { loading: true })),
                switchMap((payload: Login) => http.post<LoginResults>(`${environment.api}/api/auth/login`, payload).pipe(
                    tap((result: LoginResults) => {
                        patchState(state, {
                            user: result.user,
                            loading: false
                        });
                        localStorage.setItem(environment.authKey, result.token)
                        router.navigateByUrl(payload.redirectURL ?? '/');
                    }),
                    catchError(err => {
                        patchState(state, { loading: false })
                        return of(err);
                    }),
                )),
            )),
        }
    })
)