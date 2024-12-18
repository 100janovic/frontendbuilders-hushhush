import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { delay, tap } from 'rxjs';

export type ToastState = {
  messages: Toast[],
  delay: number
}

export type Toast = {
  message: string;
  type: 'success' | 'error' | 'info'
}

export const ToastsStore = signalStore({ providedIn: 'root' },
  withState({
    messages: [],
    delay: 5000
  } as ToastState),
  withMethods((state) => {
    return {
      add: rxMethod<Toast>($p => $p.pipe(
        tap((message: Toast) => patchState(state, {
          messages: [...state.messages(), message]
        })),
        delay(state.delay()),
        tap((message) => {
          patchState(state, {
            messages: [...state.messages().filter((m: Toast) => {
              return m.message !== message.message
            })]
          })
        })
      ))
    }
  })
)