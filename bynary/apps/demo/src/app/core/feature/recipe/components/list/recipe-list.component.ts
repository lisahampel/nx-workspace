import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IRecipe } from '../../models/recipe.interface';
import { RecipesFacade } from '../../services/recipes.facade';

@Component({
    selector: 'bynary-recipes-list-component',
    templateUrl: './recipe-list.component.html',
    styleUrls: ['./recipe-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'c-recipes-component',
    },
})
export class AngularRecipesListComponent implements OnInit {
    recipes!: IRecipe[] | null;

    constructor(private readonly _recipesFacade: RecipesFacade,
                private readonly _router: Router,
                private readonly _route: ActivatedRoute) {

    }

    ngOnInit() {
        // TODO: Dadurch geht fetchData und saveData nicht mehr
        this._recipesFacade.watchRecipes().subscribe((recipes) => {
            this.recipes = recipes;
        });
    }

    onNewRecipe() {
        this._router.navigate(['new'], { relativeTo: this._route });
    }

}
