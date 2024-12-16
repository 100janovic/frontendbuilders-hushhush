import { HttpHandlerFn, HttpRequest } from "@angular/common/http";
import { environment } from "../../environments/environment.development";

export const AuthInterceptor = (
    request: HttpRequest<unknown>,
    next: HttpHandlerFn
) => {

    const isApiCall = request.url.includes(environment.api);
    const isExeption = request.url.includes('/register');

    if (isApiCall && !isExeption) {
        request = request.clone({
            withCredentials: true
        })
    }

    return next(request);
}