import { Routes } from '@angular/router';

import { ShoppingListComponent } from './components/list/shopping-list.component';

export const SHOPPING_LIST_ROUTES: Routes = [
    {
        path: '',
        component: ShoppingListComponent
    }
];
