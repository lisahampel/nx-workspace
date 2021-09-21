import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IRecipe, RecipesService } from '@bynary/angular-recipes';

@Component({
  selector: 'bynary-recipe-detail-component',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'c-recipe-detail-component'
  }
})
export class RecipeDetailComponent implements OnInit {
  recipe!: IRecipe;
  id!: number;

  constructor(private readonly _recipeService: RecipesService,
              private readonly _route: ActivatedRoute,
              private readonly _router: Router) {
  }

  ngOnInit() {
    this._route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this._recipeService.getRecipe(this.id);
        console.log('RECIPE: ', this.recipe);
      }
    );
  }

  onAddToShoppingList() {
    this._recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this._router.navigate(['edit'], { relativeTo: this._route });
  }

  onDeleteRecipe() {
    this._recipeService.deleteRecipe(this.id);
    this._router.navigate(['recipes']);
  }
}
