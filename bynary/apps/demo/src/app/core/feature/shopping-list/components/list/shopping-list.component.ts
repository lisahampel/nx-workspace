import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IIngredient } from '@bynary/angular-ingredient';
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
        /*this.subscription = this._shoppingListFacade.ingredientsChanged.subscribe(
            (ingredients: IIngredient[]) => {
                this.ingredients = ingredients;
            }
        );*/

        console.log(this._shoppingListFacade.watchIngredients());
        this._shoppingListFacade.watchIngredients().subscribe((ingredients) => {
            this.ingredients = ingredients;
        });
    }

    onEditItem(index: number, ingredient: IIngredient) {
        console.log('ShoppingListComponent - onEditItem clicked');
        console.log('ShoppingListComponent - onEditItem clicked - ingredient: ', ingredient);
        this._shoppingListFacade.startedEditing.next(index);
    }

    /*  ngOnDestroy() {
          this.subscription.unsubscribe();
      }*/
}
