import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { RecipesModule } from './core/feature/recipes/recipes.module';
import { ShoppingListModule } from './core/feature/shopping-list/shopping-list.module';
import { RoutingModule } from './core/routing/routing.module';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    CoreModule,
    RecipesModule,
    ShoppingListModule,
    RoutingModule,
    RouterModule
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {
}
