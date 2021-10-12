import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IIngredient } from '../../ingredient/ingredient.interface';

@Injectable()
export class ShoppingListService {
    ingredientsChanged = new Subject<IIngredient[]>();
    startedEditing = new Subject<number>();

    private _ingredients: IIngredient[] = [];

    constructor() {

    }

    addIngredient(ingredient: IIngredient) {
        console.log('ShoppingListService - addIngredient: ', this.ingredientsChanged.next());
        // this._ingredients.push(ingredient);
       // this.ingredientsChanged.next(this._ingredients.slice());
    }

    addIngredients(ingredients: IIngredient[]) {
        // this._ingredients.push(...ingredients);
        // this.ingredientsChanged.next(this._ingredients.slice());
    }

    getIngredient(index: number) {
        return;
        // return this._ingredients[index];
    }

    getIngredients() {
        return;
        // return this._ingredients.slice();
    }

    updateIngredient(index: number, newIngredient: IIngredient) {
        // this._ingredients[index] = newIngredient;
        // this.ingredientsChanged.next(this._ingredients.slice());
    }

    deleteIngredient(index: number) {

        // delete this._ingredients[index];
        // this._ingredients.splice(index, 1);
        // this.ingredientsChanged.next(this._ingredients.slice());
    }
}
