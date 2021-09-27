import { Routes } from '@angular/router';
import { RecipesResolverService } from '@bynary/angular-recipes';
import { RecipeDetailComponent } from '../feature/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../feature/recipes/recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from '../feature/recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from '../feature/recipes/recipes.component';
import { ShoppingListComponent } from '../feature/shopping-list/shopping-list.component';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/recipes'
  },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      {
        path: '',
        component: RecipeStartComponent
      },
      {
        path: 'new',
        component: RecipeEditComponent
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService]
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipesResolverService]
      }
    ]
  },
  {
   path: 'shopping-list',
   component: ShoppingListComponent
  }
]
