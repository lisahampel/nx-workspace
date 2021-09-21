import { IIngredient } from '@bynary/angular-ingredient';

export namespace ShoppingListActions {

  export class AddIngredient {
    static readonly type = '[Shopping List] add ingredient';

    constructor(readonly ingredient: IIngredient) {
    }
  }

  export class AddIngredients {
    static readonly type = '[Shopping List] add ingredients';

    constructor(readonly ingredients: IIngredient[]) {
    }
  }

  export class GetIngredient {
    static readonly type = '[Shopping List] get ingredient';

    constructor(readonly index: number) {
    }
  }

  export class GetIngredients {
    static readonly type = '[Shopping List] get ingredients';
  }

  export class DeleteIngredient {
    static readonly type = '[Shopping List] delete ingredient';

    constructor(readonly index: number) {
    }
  }

  export class UpdateIngredient {
    static readonly type = '[Shopping List] update ingredient';

    constructor(readonly index: number, readonly ingredient: IIngredient) {
    }
  }

}
