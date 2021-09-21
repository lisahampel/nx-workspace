import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularShoppingListModule } from '../../../../../../../libs/angular/shopping-list/src/lib/angular-shopping-list.module';
import { ShoppingListEditComponent } from './shopping-list-edit/shopping-list-edit.component';
import { ShoppingListComponent } from './shopping-list.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngularShoppingListModule
  ],
  exports: [
    ShoppingListComponent
  ],
  declarations: [
    ShoppingListComponent,
    ShoppingListEditComponent
  ]
})
export class ShoppingListModule {
}
