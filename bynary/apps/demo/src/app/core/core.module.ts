import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RecipesService } from '@bynary/angular-recipes';
import { AngularSharedModule } from '@bynary/angular/shared';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsModule } from '@ngxs/store';
import { HeaderComponent } from './components/header/header.component';
import { AppState } from './state/app.state';


@NgModule({
  imports: [
    CommonModule,

    HttpClientModule,

    NgxsModule.forRoot([AppState]),
    NgxsRouterPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),

    RouterModule,
    AngularSharedModule,
  ],
  exports: [
    HeaderComponent,
    NgxsModule
  ],
  declarations: [
    HeaderComponent
  ],
  providers: [
    RecipesService
  ]

})
export class CoreModule {
}
