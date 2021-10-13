import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ShoppingListFacade } from '../../shopping-list/services/shopping-list.facade';
import { IRecipe } from '../models/recipe.interface';

@Injectable()
export class RecipesService {
    recipeChanged = new Subject<IRecipe[]>();

    private _recipes: IRecipe[] = [];

    constructor(private readonly _shoppingListFacade: ShoppingListFacade) {
    }

    setRecipes(recipes: IRecipe[]) {
        this._recipes = recipes;
        this.recipeChanged.next(this._recipes.slice());
    }

    getRecipes() {
        return this._recipes.slice();
    }

    addRecipe(recipe: IRecipe) {
        this._recipes.push(recipe);
        this.recipeChanged.next(this._recipes.slice());
    }

    deleteRecipe(index: number) {
        this._recipes.splice(index, 1);
        this.recipeChanged.next(this._recipes.slice());
    }
}
