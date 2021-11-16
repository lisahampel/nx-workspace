import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { IIngredient } from '../../ingredient/ingredient.interface';
import { ShoppingListFacade } from '../../shopping-list/services/shopping-list.facade';
import { IRecipe } from '../models/recipe.interface';
import { RecipeActions } from '../state/recipes.actions';
import { RecipesState } from '../state/recipes.state';

@Injectable({
    providedIn: 'root'
})
export class RecipesFacade {

    constructor(private readonly _store: Store,
                private readonly _shoppingListFacade: ShoppingListFacade) {
    }

    // TODO: wenn nicht genutzt, dann raus!
    getRecipes() {
        return this._store.selectSnapshot(RecipesState.getRecipes);
    }

    watchRecipes(): Observable<IRecipe[] | null> {
        return this._store.select(RecipesState.getRecipes);
    }

    watchRecipe(index: number): Observable<IRecipe> {
        return this._store.select(RecipesState.getRecipe(index));
    }

    addRecipe(recipe: IRecipe) {
        return this._store.dispatch(new RecipeActions.AddRecipe(recipe));
    }

    updateRecipe(index: number, recipe: IRecipe) {
        this._store.dispatch(new RecipeActions.UpdateRecipe(index, recipe));
    }

    deleteRecipe(index: number) {
        this._store.dispatch(new RecipeActions.DeleteRecipe(index));
    }

    addIngredientsToShoppingList(ingredients: IIngredient[]) {
        this._shoppingListFacade.addIngredients(ingredients);
    }
}
