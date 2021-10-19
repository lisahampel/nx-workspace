import { Routes } from '@angular/router';
import { AuthComponent } from '../components/auth/auth.component';

export const APP_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/recipes'
    },
    {
        path: 'recipes',
        loadChildren: () => import('../feature/recipe/recipe.module').then((m) => m.RecipeModule)
    },
    {
        path: 'shopping-list',
        loadChildren: () => import('../feature/shopping-list/shopping-list.module').then((m) => m.ShoppingListModule)
    },
    {
        path: 'auth',
        component: AuthComponent
    }
];
