import { Injectable } from '@angular/core';

import { IIngredient } from '@bynary/angular-ingredient';
import { Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { ShoppingListActions } from '../state/shopping-list.actions';
import { ShoppingListState } from '../state/shopping-list.state';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListFacade {
  ingredientsChanged = new Subject<IIngredient[]>();
  startedEditing = new Subject<number>();

  constructor(private readonly _store: Store) {
  }

  getIngredient(index: number): Observable<IIngredient> {
    return this._store.dispatch(new ShoppingListActions.GetIngredient(index));
  }

  /*getIngredients(): IIngredient[] | null {
    console.log('ShoppingListFacade - getIngredients');
    return [];
    //return this._store.selectSnapshot(ShoppingListState.getIngredients);
  }*/

  /*watchIngredients(): Observable<IIngredient[] | null> {
    return this._store.select(ShoppingListState.getIngredients);
  }*/

  deleteIngredient(index: number) {
    return this._store.dispatch(new ShoppingListActions.DeleteIngredient(index));
  }

  addIngredient(ingredient: IIngredient) {
    return this._store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
  }

  addIngredients(ingredients: IIngredient[]) {
    this._store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  updateIngredient(index: number, ingredient: IIngredient) {
    this._store.dispatch(new ShoppingListActions.UpdateIngredient(index, ingredient));
  }

}
