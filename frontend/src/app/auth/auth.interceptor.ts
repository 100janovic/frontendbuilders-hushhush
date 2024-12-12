import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { environment } from "../../environments/environment.development";

export const AuthInterceptor = (
    request: HttpRequest<unknown>,
    next: HttpHandlerFn
) => {

    const token = localStorage.getItem(environment.authKey);
    const isApiCall = request.url.includes(environment.api);
    const isExeption = request.url.includes('/register');

    if (!!token && isApiCall && !isExeption) {
        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        })
    }

    return next(request);
}