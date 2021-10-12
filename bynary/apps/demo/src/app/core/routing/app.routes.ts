import { Routes } from '@angular/router';
import { RecipesResolverService } from '@bynary/angular-recipes';
import { AuthGuard } from '../../../../../../libs/angular/auth/src/lib/guards/auth.guard';
import { AuthComponent } from '../components/auth/auth.component';
import { RecipeComponent } from '../feature/recipe/components/recipe.component';
import { RecipeDetailComponent } from '../feature/recipe/pages/detail/recipe-detail.component';
import { RecipeEditComponent } from '../feature/recipe/pages/edit/recipe-edit.component';
import { RecipeStartComponent } from '../feature/recipe/pages/start/recipe-start.component';
import { ShoppingListComponent } from '../feature/shopping-list/components/list/shopping-list.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/recipes'
    },
    {
        path: 'recipes',
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
    },
    {
        path: 'shopping-list',
        // loadChildren: () => import('../feature/shopping-list/shopping-list.module').then((m) => m.ShoppingListModule)
        component: ShoppingListComponent
    },
    {
        path: 'auth',
        component: AuthComponent
    }
];
