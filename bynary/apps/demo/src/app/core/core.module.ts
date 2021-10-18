import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipesService } from '@bynary/angular-recipes';
import { AlertComponent, AngularSharedModule } from '@bynary/angular/shared';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { HeaderComponent } from './components/header/header.component';
import { AppState } from './state/app.state';
import { AuthComponent } from './components/auth/auth.component';


@NgModule({
  imports: [
    CommonModule,

    HttpClientModule,

    NgxsModule.forRoot([AppState]),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),

    RouterModule,
    AngularSharedModule,
    FormsModule
  ],
  exports: [
    HeaderComponent,
    NgxsModule
  ],
  declarations: [
    HeaderComponent,
    AuthComponent
  ],
  providers: [
    RecipesService
  ]

})
export class CoreModule {
}
