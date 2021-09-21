import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IRecipe, RecipesService } from '@bynary/angular-recipes';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bynary-recipes-list-component',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'c-recipes-component',
  },
})
export class AngularRecipesListComponent implements OnInit, OnDestroy {
  recipes!: IRecipe[];
  subscription!: Subscription;

  constructor(private readonly _recipesService: RecipesService,
              private readonly _router: Router,
              private readonly _route: ActivatedRoute) {

  }

  ngOnInit() {
    this.subscription = this._recipesService.recipeChanged.subscribe(
      (recipes: IRecipe[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this._recipesService.getRecipes();
  }

  onNewRecipe() {
    this._router.navigate(['new'], { relativeTo: this._route });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
