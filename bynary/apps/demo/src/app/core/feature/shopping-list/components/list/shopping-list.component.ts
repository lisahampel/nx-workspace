import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

import { IIngredient } from '../../../ingredient/ingredient.interface';
import { ShoppingListFacade } from '../../services/shopping-list.facade';

@Component({
    selector: 'bynary-shopping-list-component',
    templateUrl: './shopping-list.component.html',
    styleUrls: ['./shopping-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'c-shopping-list-component'
    }
})
export class ShoppingListComponent implements OnInit {
    ingredients: IIngredient[] | null = [];

    constructor(private readonly _shoppingListFacade: ShoppingListFacade) {

    }

    ngOnInit() {
        this._shoppingListFacade.watchIngredients().subscribe((ingredients) => {
            this.ingredients = ingredients;
        });
    }

    onEditItem(index: number) {
        this._shoppingListFacade.startedEditing.next(index);
    }

}
