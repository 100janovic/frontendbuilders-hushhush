import { patchState, signalStore, withHooks, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { AuthState, Login, LoginResults } from "./auth.models";
import { catchError, filter, finalize, map, of, switchMap, tap } from "rxjs";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";

export const AuthStore = signalStore({
  providedIn: 'root'
},
  withState({
    user: null,
    authenticated: false,
    loading: false
  } as AuthState),

  withMethods((state) => {

    const router = inject(Router);
    const http = inject(HttpClient);

    return {
      getStatus: rxMethod<void>((m$) => m$.pipe(
        switchMap((_) => http.post(`${environment.api}/auth/status`, {}).pipe(
          tap((results: any) => {
            patchState(state, {
              user: results.user
            })
          }),
          catchError((err) => {
            return of(err);
          })
        ))
      )),

      login: rxMethod<Login>((payload$) => payload$.pipe(
        tap(() => patchState(state, { loading: true })),
        switchMap((payload: Login) => http.post<LoginResults>(`${environment.api}/auth/login`, payload).pipe(
          tap((results: LoginResults) => {
            patchState(state, {
              user: results.user,
              loading: false
            });
            router.navigateByUrl(payload.redirectURL ?? '/');
          }),
          catchError(err => {
            patchState(state, { loading: false })
            return of(err);
          }),
        )),
      )),

      register: rxMethod<Login>((payload$) => payload$.pipe(
        tap(() => patchState(state, { loading: true })),
        switchMap((payload: Login) => http.post<LoginResults>(`${environment.api}/auth/register`, payload).pipe(
          tap((results: LoginResults) => {
            patchState(state, {
              user: results.user,
              loading: false
            });
            router.navigateByUrl(payload.redirectURL ?? '/');
          }),
          catchError(err => {
            patchState(state, { loading: false })
            return of(err);
          }),
        )),
      )),

      logout: rxMethod<void>((m$) => m$.pipe(
        switchMap((_) => http.post(`${environment.api}/auth/logout`, {}).pipe(
          tap((_: any) => {
            patchState(state, {
              user: null
            });
            router.navigateByUrl('login');
          }),
          catchError((err) => {
            return of(err);
          })
        ))
      ))
    }
  }),
  withHooks({
    onInit({ getStatus }) {
      getStatus();
    }
  })
)