import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthFacade, IAuthResponseData } from '../../../../../../../libs/angular/auth/src/lib/services/auth.facade';

@Component({
    selector: 'bynary-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    isLoginMode = true;
    error = '';

    constructor(private readonly _authFacade: AuthFacade, private readonly _router: Router) {

    }

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<IAuthResponseData>;

        if (this.isLoginMode) {
            authObs = this._authFacade.login(email, password);
        } else {
            authObs = this._authFacade.signup(email, password);
        }

        authObs.subscribe((responseData) => {
                console.log('Response Data: ', responseData);
                this._router.navigate(['/recipes']);
            },
            ((errorMessage) => {
                console.log(errorMessage);
                this.error = errorMessage;
            })
        );

        form.reset();
    }

    ngOnInit(): void {
    }

}
