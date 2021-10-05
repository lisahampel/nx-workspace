import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

export interface IAuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({
    providedIn: 'root'
})
export class AuthFacade {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    user = new BehaviorSubject<User>(null);
    private _tokenExpirationTimer: any;

    constructor(private readonly _http: HttpClient, private readonly _router: Router) {
    }

    signup(email: string, password: string) {
        return this._http.post<IAuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBXvOs3Zbu2wxD9n3gBJQxBVL86P0U5-TY',
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
            .pipe(catchError(this.handleError),
                tap((responseData) => {
                    this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
                }));
    }

    login(email: string, password: string) {
        return this._http.post<IAuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBXvOs3Zbu2wxD9n3gBJQxBVL86P0U5-TY',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError),
            tap((responseData) => {
                this.handleAuthentication(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
            }));
    }

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        }
            = JSON.parse(<string>localStorage.getItem('userData'));

        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));

        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration =
                new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    logout() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this.user.next(null);
        this._router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this._tokenExpirationTimer) {
            clearTimeout(this._tokenExpirationTimer);
        }
        this._tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number) {
        this._tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured';
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
        }
        switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = ' This email already exists';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email does not exist';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct';
                break;
        }
        return throwError(errorMessage);
    }
}
