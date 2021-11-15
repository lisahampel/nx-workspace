import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import * as uuid from 'uuid';

import { IIngredient } from '../../../ingredient/ingredient.interface';
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

    constructor(private readonly _shoppingListFacade: ShoppingListFacade) {
    }

    ngOnInit() {
        // TODO: wie kann man das ohne subscription und subject lösen?
        this._subscription = this._shoppingListFacade.startedEditing.subscribe(
            (index: number) => {
                this.editedItemIndex = index;
                this.editMode = true;
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
        console.log('FORM: ', form);
        const value = form.value;
        const newIngredient: IIngredient = { id: uuid.v4(), name: value.name, amount: value.amount };
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
