import { IIngredient } from '../../../../../../../../libs/angular/ingredient/src';
import { IRecipe } from '../models/recipe.interface';

export namespace RecipeActions {

  export class AddIngredientsToShoppingList {
    static readonly type = '[Recipes] add ingredients to shopping list';

    constructor(readonly ingredients: IIngredient[]) {
    }
  }

  export class AddRecipe {
    static readonly type = '[Recipes] add recipe';

    constructor(readonly recipe: IRecipe) {
    }
  }

  export class GetRecipe {
    static readonly type = '[Recipes] get recipe';

    constructor(readonly index: number) {
    }
  }

  export class GetRecipes {
    static readonly type = '[Recipes] get recipes';
  }

  export class DeleteRecipe {
    static readonly type = '[Recipes] delete recipe';

    constructor(readonly index: number) {
    }
  }

  export class UpdateRecipe {
    static readonly type = '[Recipes] update recipe';

    constructor(readonly index: number, readonly recipe: IRecipe) {
    }
  }

}
