import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AuthInterceptorService } from '../../../../libs/angular/auth/src/lib/services/auth-interceptor.service';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { RecipeModule } from './core/feature/recipe/recipe.module';
import { ShoppingListService } from './core/feature/shopping-list/services/shopping-list.service';
import { ShoppingListModule } from './core/feature/shopping-list/shopping-list.module';
import { RoutingModule } from './core/routing/routing.module';

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,

        //  CommonModule,
        CoreModule,
        RecipeModule,
        ShoppingListModule,
        RoutingModule,
    ],
    declarations: [AppComponent],
    providers: [
        // TODO: wird hier doch eigentlich nicht benötigt?! ShoppingListService ist bereits im ShoppingListModule unter provider gesetzt
        ShoppingListService,
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
