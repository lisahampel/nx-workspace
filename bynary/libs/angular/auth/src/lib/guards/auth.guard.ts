import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthFacade } from '../services/auth.facade';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {

    constructor(private readonly _authFacade: AuthFacade, private readonly _router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this._authFacade.user.pipe(
            take(1),
            map(
                (user) => {
                    const isAuth = !!user;

                    if (isAuth) {
                        return true;
                    }
                    return this._router.createUrlTree(['/auth']);
                }
            )
        );
    }

}
