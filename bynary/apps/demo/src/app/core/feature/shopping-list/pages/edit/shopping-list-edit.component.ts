import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IIngredient } from '@bynary/angular-ingredient';
import { Subscription } from 'rxjs';
import { ShoppingListFacade } from '../../services/shopping-list.facade';

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

    constructor(private readonly _shoppingListFacade: ShoppingListFacade) {
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
        } else {
            this._shoppingListFacade.addIngredient(newIngredient);
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
        this.onClear();
    }

    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
}
