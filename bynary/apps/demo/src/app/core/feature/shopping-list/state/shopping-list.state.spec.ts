import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { IIngredient } from '../../ingredient/ingredient.interface';
import { ShoppingListActions } from './shopping-list.actions';
import { ShoppingListState } from './shopping-list.state';

describe('ShoppingListState', () => {
    let store: Store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                NgxsModule.forRoot([ShoppingListState])
            ]
        });

        store = TestBed.inject(Store);
    });

    it('should select ingredients', () => {
        const ingredients = store.selectSnapshot(ShoppingListState.getIngredients);

        expect(ingredients).toEqual([
            { name: 'Bread', amount: 2 },
            { name: 'Onion', amount: 5 }
        ]);
    });

    it('should get ingredient', async () => {
        const ingredient = store.dispatch(new ShoppingListActions.GetIngredient(1));
        ingredient.subscribe((ingredient: IIngredient) => {
            expect(ingredient).toEqual({ name: 'Onion', amount: 5 });
        });
    });

    it('should add ingredient', () => {
        store.dispatch(new ShoppingListActions.AddIngredient({ name: 'Milk', amount: 1 }));

        const ingredients = store.selectSnapshot(ShoppingListState.getIngredients);
        expect(ingredients).toEqual([
            { name: 'Bread', amount: 2 },
            { name: 'Onion', amount: 5 },
            { name: 'Milk', amount: 1 }
        ]);
    });

    it('should add ingredients', () => {
        store.dispatch(new ShoppingListActions.AddIngredients([
            { name: 'Eggs', amount: 5 },
            { name: 'Potatoes', amount: 10 }
        ]));

        const ingredients = store.selectSnapshot(ShoppingListState.getIngredients);
        expect(ingredients).toEqual([
            { name: 'Bread', amount: 2 },
            { name: 'Onion', amount: 5 },
            { name: 'Eggs', amount: 5 },
            { name: 'Potatoes', amount: 10 }
        ]);
    });

    it('should update ingredient', () => {
        store.dispatch(new ShoppingListActions.UpdateIngredient(1, { name: 'Onions', amount: 4 }));

        const ingredients = store.selectSnapshot(ShoppingListState.getIngredients);
        expect(ingredients).toEqual([
            { name: 'Bread', amount: 2 },
            { name: 'Onions', amount: 4 }
        ]);
    });

    it('should delete ingredient', () => {
        store.dispatch(new ShoppingListActions.DeleteIngredient(0));

        const state = store.selectSnapshot(ShoppingListState.getIngredients);
        expect(state).toEqual([{ name: 'Onion', amount: 5 }]);
    });

});
