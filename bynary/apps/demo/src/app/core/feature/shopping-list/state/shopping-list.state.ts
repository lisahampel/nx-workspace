import { Injectable } from '@angular/core';
import { IIngredient } from '@bynary/angular-ingredient';

import { Action, Selector, State, StateContext } from '@ngxs/store';
import { IShoppingListState } from '../models/shopping-list.model';

import { ShoppingListActions } from './shopping-list.actions';

@State<IShoppingListState>({
    name: 'shoppingList',
    defaults: {
        ingredient: [
            {
                name: 'Bread',
                amount: 2
            },
            {
                name: 'Onion',
                amount: 5
            }
        ]
    }
})
@Injectable()
export class ShoppingListState {

    @Selector()
    static getIngredients(state: IShoppingListState) {
        console.log('STATE: ', state.ingredient);
        return state.ingredient;
    }

    constructor() {
    }

    @Action(ShoppingListActions.GetIngredient)
    getIngredient(context: StateContext<IShoppingListState>, action: ShoppingListActions.GetIngredient) {
        console.log('ShoppingListState - getIngredient: ', context.getState().ingredient[action.index]);
        return context.getState().ingredient[action.index];
    }

    @Action(ShoppingListActions.AddIngredient)
    addIngredient(context: StateContext<IShoppingListState>, action: ShoppingListActions.AddIngredient) {
        console.log('addIngredient ACTION: ', action, 'addIngredient INGREDIENT:', action.ingredient, 'STATE: ', context.getState());
        const state = context.getState();
        context.patchState({
            ingredient: [
                ...state.ingredient,
                action.ingredient,
            ]
        });
        console.log('New STATE: ', context.getState());
    }

    @Action(ShoppingListActions.AddIngredients)
    addIngredients(context: StateContext<IShoppingListState>, action: ShoppingListActions.AddIngredients) {
        console.log('@Action: addIngredients -ingredients: ', action.ingredients);
        const state = context.getState();
        const newIngredientList = [...state.ingredient];
        newIngredientList.push(...action.ingredients);
        context.patchState({
            ...state,
            ingredient: newIngredientList
        });
        console.log('@Action: addIngredients - New STATE: ', context.getState());
    }

    @Action(ShoppingListActions.UpdateIngredient)
    updateIngredient(context: StateContext<IShoppingListState>, action: ShoppingListActions.UpdateIngredient) {
        const state = context.getState();
        console.log('Old STATE: ', context.getState());
        const ingredientList = [...state.ingredient];
        ingredientList[action.index] = action.ingredient;
        context.patchState({
            ...state,
            ingredient: ingredientList,
        });
        console.log('New STATE: ', context.getState());
    }


    @Action(ShoppingListActions.DeleteIngredient)
    deleteIngredient(context: StateContext<IShoppingListState>, action: ShoppingListActions.DeleteIngredient) {
        const state = context.getState();
        const filteredArray = state.ingredient.filter((ingredient: IIngredient) => ingredient !== state.ingredient[action.index]);

        console.log('filteredArray: ', filteredArray);
        context.setState({
            ...state,
            ingredient: filteredArray,
        });
        console.log('@Action: DeleteIngredient - New STATE: ', context.getState());
    }

}
