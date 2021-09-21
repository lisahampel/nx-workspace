import { Injectable } from '@angular/core';
import { RecipesFacade, RecipesService } from '@bynary/angular-recipes';
import { ShoppingListService } from '@bynary/angular/shopping-list';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ShoppingListActions } from '../../../../shopping-list/src/lib/state/shopping-list.actions';
import { IRecipeState } from '@bynary/angular-recipes';

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
/*
  @Selector()
  static getRecipes(state: IRecipeState) {
    return state.recipe;
  }

  constructor(private readonly _recipeFacade: RecipesFacade,
              private readonly _shoppingListService: ShoppingListService) {
  }

  @Action(RecipeActions.GetRecipes)
  getRecipes(context: StateContext<IRecipeState>) {
    return this._recipeFacade.getRecipes();
  }

  @Action(RecipeActions.GetRecipe)
  getRecipe(action: RecipeActions.GetRecipe) {
    return this._recipeFacade.getRecipe(action.index);
  }

  @Action(RecipeActions.AddRecipe)
  addRecipe(context: StateContext<IRecipeState>, action: RecipeActions.AddRecipe) {
    this._recipeFacade.addRecipe(action.recipe);
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
    // this._shoppingListService.addIngredient(action.ingredients);

    context.dispatch(new ShoppingListActions.AddIngredients(action.ingredients));
  }

  @Action(RecipeActions.UpdateRecipe)
  updateRecipe(context: StateContext<IRecipeState>, action: RecipeActions.UpdateRecipe) {
    this._recipeFacade.updateRecipe(action.index, action.recipe);
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
    this._recipeFacade.deleteRecipe(action.index);
    const state = context.getState();
    const filteredArray = state.recipe.splice(action.index, 1);
    context.setState({
      ...state,
      recipe: filteredArray,
    });
  }*/

}
