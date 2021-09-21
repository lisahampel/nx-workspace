import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListService } from '@bynary/angular/shopping-list';
import { NgxsModule } from '@ngxs/store';
import { ShoppingListState } from './state/shopping-list.state';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([ShoppingListState])
  ],
  providers: [
    ShoppingListService
  ]
})
export class AngularShoppingListModule {}
