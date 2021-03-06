import { Injectable } from '@angular/core';
import { IIngredient } from '@bynary/angular-ingredient';
import { ShoppingListFacade } from '@bynary/angular/shopping-list';
import { Subject } from 'rxjs';
import { IRecipe } from '../../../../../../apps/demo/src/app/core/feature/recipe/models/recipe.interface';
@Injectable()
export class RecipesService {
  recipeChanged = new Subject<IRecipe[]>();

  /*private _recipes: IRecipe[] = [
    {
      name: 'Test Recipe',
      description: 'This is a simply test',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/b/b9/Recipe_icon.svg',
      ingredients: [
        {
          name: 'Egg',
          amount: 3
        },
        {
          name: 'Bread',
          amount: 1
        }
      ]
    },
    {
      name: '2. Recipe',
      description: 'Second recipe',
      imagePath:
        'https://upload.wikimedia.org/wikipedia/commons/b/b9/Recipe_icon.svg',
      ingredients: [
        {
          name: 'Tomatoe',
          amount: 3
        },
        {
          name: 'Onion',
          amount: 2
        }
      ]
    }
  ];*/

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

  getRecipe(index: number) {
    return this._recipes[index];
  }

  addIngredientsToShoppingList(ingredients: IIngredient[]) {
    this._shoppingListFacade.addIngredients(ingredients);
  }

  addRecipe(recipe: IRecipe) {
    this._recipes.push(recipe);
    this.recipeChanged.next(this._recipes.slice());
  }

  updateRecipe(index: number, newRecipe: IRecipe) {
    this._recipes[index] = newRecipe;
    this.recipeChanged.next(this._recipes.slice());
  }

  deleteRecipe(index: number) {
    this._recipes.splice(index, 1);
    this.recipeChanged.next(this._recipes.slice());
  }
}
