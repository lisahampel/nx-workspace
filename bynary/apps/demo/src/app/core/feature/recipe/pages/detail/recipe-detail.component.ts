import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesFacade } from '../../services/recipes.facade';

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
    // TODO: recipe IRecipe
    recipe!: any;
    id!: number;

    constructor(private readonly _recipeFacade: RecipesFacade,
                private readonly _route: ActivatedRoute,
                private readonly _router: Router) {
    }

    ngOnInit() {
        this._route.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];
                this._recipeFacade.getRecipe(this.id).subscribe((recipe: any) => {
                    console.log('recipe: ', recipe);
                    this.recipe = recipe.recipe.recipe[this.id];
                });
            }
        );
    }

    onAddToShoppingList() {
        this._recipeFacade.addIngredientsToShoppingList(this.recipe.ingredients);
    }

    onEditRecipe() {
        this._router.navigate(['edit'], { relativeTo: this._route });
    }

    onDeleteRecipe() {
        this._recipeFacade.deleteRecipe(this.id);
        this._router.navigate(['recipes']);
    }
}
