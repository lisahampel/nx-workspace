import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShoppingListService } from '@bynary/angular/shopping-list';
import { NgxsModule } from '@ngxs/store';
import { ShoppingListComponent } from './components/list/shopping-list.component';
import { ShoppingListEditComponent } from './pages/edit/shopping-list-edit.component';
import { SHOPPING_LIST_ROUTES } from './shopping-list.routes';
import { ShoppingListState } from './state/shopping-list.state';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SHOPPING_LIST_ROUTES),

        ReactiveFormsModule,
        FormsModule,

        NgxsModule.forFeature([ShoppingListState])
    ],
    providers: [
        ShoppingListService
    ],
    exports: [
        ShoppingListComponent,
        RouterModule
    ],
    declarations: [
        ShoppingListComponent,
        ShoppingListEditComponent
    ]
})
export class ShoppingListModule {
}
