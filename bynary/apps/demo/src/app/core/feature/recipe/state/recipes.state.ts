import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ShoppingListActions } from '../../shopping-list/state/shopping-list.actions';
import { IRecipeState } from '../models/recipe.state';
import { RecipeActions } from './recipes.actions';

@State<IRecipeState>({
    name: 'recipe',
    defaults: {
        recipe: [
            {
                name: 'Schnitzel mit Pommes',
                description: 'Bla bla',
                imagePath: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Recipe_icon.svg',
                ingredients: [
                    {
                        name: 'Schnitzel',
                        amount: 2,
                    },
                    {
                        name: 'Pommes',
                        amount: 1
                    }
                ]
            }
        ]
    }
})
@Injectable()
export class RecipesState {

    @Selector()
    static getRecipes(state: IRecipeState) {
        console.log('STATE: ', state.recipe);
        return state.recipe;
    }

    @Selector()
    static getRecipe(index: number) {
        return createSelector([RecipesState.getRecipes], (recipes) => recipes[index]);
    }

    constructor() {
    }

    @Action(RecipeActions.AddRecipe)
    addRecipe(context: StateContext<IRecipeState>, action: RecipeActions.AddRecipe) {
        console.log('addIngredient ACTION: ', action, 'addIngredient INGREDIENT:', action.recipe, 'STATE: ', context.getState());
        const state = context.getState();
        context.patchState({
            recipe: [
                ...state.recipe,
                action.recipe,
            ]
        });
        console.log('New STATE: ', context.getState());
    }

    @Action(RecipeActions.AddIngredientsToShoppingList)
    addIngredientsToShoppingList(context: StateContext<IRecipeState>, action: RecipeActions.AddIngredientsToShoppingList) {
        context.dispatch(new ShoppingListActions.AddIngredients(action.ingredients));
    }

    @Action(RecipeActions.UpdateRecipe)
    updateRecipe(context: StateContext<IRecipeState>, action: RecipeActions.UpdateRecipe) {
        const state = context.getState();
        console.log('Old STATE: ', context.getState());
        const recipeList = [...state.recipe];
        recipeList[action.index] = action.recipe;
        context.patchState({
            ...state,
            recipe: recipeList,
        });
        console.log('New STATE: ', context.getState());
    }


    @Action(RecipeActions.DeleteRecipe)
    deleteRecipe(context: StateContext<IRecipeState>, action: RecipeActions.DeleteRecipe) {
        const state = context.getState();
        const filteredArray = state.recipe.splice(action.index, 1);
        context.setState({
            ...state,
            recipe: filteredArray,
        });
    }

    @Action(RecipeActions.GetRecipe)
    getRecipe(context: StateContext<IRecipeState>, action: RecipeActions.GetRecipe) {
        console.log('RecipeState - getRecipe: ', context.getState().recipe[action.index]);
        return context.getState().recipe[action.index];
    }

}
