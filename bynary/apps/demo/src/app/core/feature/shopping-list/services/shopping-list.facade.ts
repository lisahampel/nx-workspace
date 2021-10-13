import { Injectable } from '@angular/core';

import { Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';

import { IIngredient } from '../../ingredient/ingredient.interface';
import { ShoppingListActions } from '../state/shopping-list.actions';
import { ShoppingListState } from '../state/shopping-list.state';

@Injectable({
    providedIn: 'root'
})
export class ShoppingListFacade {
    // TODO: bessere Lösung finden für startedEditing
    startedEditing = new Subject<number>();

    constructor(private readonly _store: Store) {
    }

    getIngredient(index: number): Observable<IIngredient> {
        return this._store.dispatch(new ShoppingListActions.GetIngredient(index));
    }

    watchIngredients(): Observable<IIngredient[] | null> {
        return this._store.select(ShoppingListState.getIngredients);
    }

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
