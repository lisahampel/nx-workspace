import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IIngredient } from '@bynary/angular-ingredient';
import { ShoppingListFacade } from '@bynary/angular/shopping-list';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'bynary-shopping-list-edit-component',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'c-shopping-list-component'
  }
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) shoppingListForm!: NgForm;
  private _subscription!: Subscription;
  editMode: boolean = false;
  editedItemIndex!: number;

  // editedItem!: Observable<IIngredient>;

  constructor(private readonly _shoppingListFacade: ShoppingListFacade,
              private readonly _store: Store) {
  }

  ngOnInit() {
    // TODO: work with subscribtion when shopping list is edited
    this._subscription = this._shoppingListFacade.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        console.log('ShoppingListEditComponent - ngOnInit: ', this._shoppingListFacade.getIngredient(index));
        this._shoppingListFacade.getIngredient(index)
          .subscribe((ingredient: any) =>
            this.shoppingListForm.setValue(
              {
                name: ingredient.shoppingList.ingredient[index].name,
                amount: ingredient.shoppingList.ingredient[index].amount
              }
            )
          );
      }
    );
  }

  onSubmit(form: NgForm) {
    console.log(form.valid);
    const value = form.value;
    const newIngredient: IIngredient = { name: value.name, amount: value.amount };
    if (this.editMode) {
      this._shoppingListFacade.updateIngredient(this.editedItemIndex, newIngredient);
      // this._shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      // TODO: subscribe to update shoppingList (siehe Abschnitt 18: 262. Sending a delete request)
      this._shoppingListFacade.addIngredient(newIngredient);
      // this._store.dispatch(new ShoppingListActions.AddIngredient(newIngredient)).subscribe(() => this.resetForm(form));
    }
    this.resetForm(form);
  }

  resetForm(form: NgForm) {
    this.editMode = false;
    form.onReset();
  }

  onClear() {
    this.shoppingListForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this._shoppingListFacade.deleteIngredient(this.editedItemIndex);
    // this._shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
