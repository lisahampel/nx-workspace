import { IIngredient } from '@bynary/angular-ingredient';

export interface IRecipe {
  name: string;
  description: string;
  imagePath: string;
  ingredients: IIngredient[];
}
