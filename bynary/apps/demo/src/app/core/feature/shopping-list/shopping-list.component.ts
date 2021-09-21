import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { IIngredient } from '@bynary/angular-ingredient';
import { ShoppingListFacade } from '@bynary/angular/shopping-list';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { ShoppingListState } from '../../../../../../../libs/angular/shopping-list/src/lib/state/shopping-list.state';

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
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: IIngredient[] | null = [];
  //  readonly ingredients$: Observable<IIngredient[] | null>;
  subscription!: Subscription;

  constructor(private readonly _shoppingListFacade: ShoppingListFacade,
              private readonly _store: Store) {

  }

  ngOnInit() {
    this.subscription = this._shoppingListFacade.ingredientsChanged.subscribe(
      (ingredients: IIngredient[]) => {
        this.ingredients = ingredients;
        console.log('ShoppingListComponent - ingredientsChanged');
      }
    );
    // this.ingredients = this._shoppingListService.getIngredients();
    this.ingredients = this._store.selectSnapshot(ShoppingListState.getIngredients);
  }

  onEditItem(index: number) {
    console.log('ShoppingListComponent - onEditItem clicked');
    this._shoppingListFacade.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
