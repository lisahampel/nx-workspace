import { Routes } from '@angular/router';

import { AuthGuard } from '../../../../../../../libs/angular/auth/src/lib/guards/auth.guard';

import { RecipesResolverService } from '@bynary/angular-recipes';

import { RecipeComponent } from './components/recipe.component';
import { RecipeDetailComponent } from './pages/detail/recipe-detail.component';
import { RecipeEditComponent } from './pages/edit/recipe-edit.component';
import { RecipeStartComponent } from './pages/start/recipe-start.component';

export const RECIPE_ROUTES: Routes = [
    {
        path: '',
        component: RecipeComponent,
        canActivate: [AuthGuard],
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
    }
];
