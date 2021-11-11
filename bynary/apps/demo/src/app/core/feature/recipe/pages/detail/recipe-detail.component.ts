import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, pluck, switchMap, takeUntil, tap } from 'rxjs/operators';
import { IRecipe } from '../../models/recipe.interface';
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
export class RecipeDetailComponent implements OnInit, OnDestroy {
    // TODO: recipe IRecipe
    recipe!: IRecipe;
    id!: number;

    readonly recipe$: Observable<IRecipe>;

    private readonly _onDestroy = new Subject();

    constructor(private readonly _recipeFacade: RecipesFacade,
                private readonly _route: ActivatedRoute,
                private readonly _router: Router) {
        this.recipe$ = this._route.params
            .pipe(
                pluck('id'),
                tap((id) => {
                    this.id = id;
                }),
                switchMap((id) => this._recipeFacade.watchRecipe(id)),
                takeUntil(this._onDestroy)
            );
    }

    ngOnInit() {
        this.recipe$ .subscribe((recipe) => {
                console.log('recipe: ', recipe);
                this.recipe = recipe;
            });
    }

    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
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
