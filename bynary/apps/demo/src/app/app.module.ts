import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AuthInterceptorService } from '../../../../libs/angular/auth/src/lib/services/auth-interceptor.service';

import { AppComponent } from './app.component';

import { CoreModule } from './core/core.module';
import { RoutingModule } from './core/routing/routing.module';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,

        CoreModule,
        RoutingModule,
    ],
    declarations: [AppComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptorService,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    exports: [],
})
export class AppModule {
}
