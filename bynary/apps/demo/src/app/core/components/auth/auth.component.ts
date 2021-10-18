import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertComponent } from '@bynary/angular/shared';
import { Observable, Subscription } from 'rxjs';
import { AuthFacade, IAuthResponseData } from '../../../../../../../libs/angular/auth/src/lib/services/auth.facade';
import { PlaceholderDirective } from '@bynary/angular/shared';


@Component({
    selector: 'bynary-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
    @ViewChild(PlaceholderDirective, { static: false }) alertHost!: PlaceholderDirective;
    isLoginMode = true;
    error = '';

    private closeSub!: Subscription;

    constructor(private readonly _authFacade: AuthFacade,
                private readonly _router: Router,
                private readonly _componentFactoryResolver: ComponentFactoryResolver) {

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
                this.showErrorAlert(errorMessage);
            })
        );

        form.reset();
    }

    onHandleError() {
        this.error = '';
    }

    private showErrorAlert(message: string) {
        const alertComponentFactory = this._componentFactoryResolver.resolveComponentFactory(AlertComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;
        hostViewContainerRef.clear();

        const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
        componentRef.instance.message = message;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        });
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        if (this.closeSub) {
            this.closeSub.unsubscribe();
        }
    }

}
