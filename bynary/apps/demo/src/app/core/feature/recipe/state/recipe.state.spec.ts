import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { IRecipe } from '../models/recipe.interface';
import { RecipeActions } from './recipes.actions';
import { RecipesState } from './recipes.state';

describe('RecipeState', () => {
    let store: Store;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([RecipesState])]
        });

        store = TestBed.inject(Store);
    });

    it('should select recipes', () => {
        const recipes = store.selectSnapshot(RecipesState.getRecipes);

        expect(recipes).toEqual([{
            name: 'Schnitzel mit Pommes',
            description: 'Bla bla',
            imagePath: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Recipe_icon.svg',
            ingredients: [{ name: 'Schnitzel', amount: 2, }, { name: 'Pommes', amount: 1 }]
        }]);
    });

    it('should add recipe', () => {
        store.dispatch(new RecipeActions.AddRecipe({
            name: 'Milchreis',
            description: 'Schnell und einfach',
            imagePath: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Recipe_icon.svg',
            ingredients: [{ name: 'Milch', amount: 1, }, { name: 'Milchreis', amount: 1 }]
        }));

        const recipes = store.selectSnapshot(RecipesState.getRecipes);
        expect(recipes).toEqual([
            {
                name: 'Schnitzel mit Pommes',
                description: 'Bla bla',
                imagePath: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Recipe_icon.svg',
                ingredients: [{ name: 'Schnitzel', amount: 2, }, { name: 'Pommes', amount: 1 }]
            },
            {
                name: 'Milchreis',
                description: 'Schnell und einfach',
                imagePath: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Recipe_icon.svg',
                ingredients: [{ name: 'Milch', amount: 1, }, { name: 'Milchreis', amount: 1 }]
            }
        ]);
    });

    it('should update recipe', () => {
        store.dispatch(new RecipeActions.UpdateRecipe(0, {
            name: 'Schnitzel mit Pommes',
            description: 'UPDATE',
            imagePath: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Recipe_icon.svg',
            ingredients: [{ name: 'Schnitzel', amount: 2, }, { name: 'Pommes', amount: 1 }]
        }));

        const newRecipes = store.selectSnapshot(RecipesState.getRecipes);
        expect(newRecipes).toEqual([{
            name: 'Schnitzel mit Pommes',
            description: 'UPDATE',
            imagePath: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Recipe_icon.svg',
            ingredients: [{ name: 'Schnitzel', amount: 2, }, { name: 'Pommes', amount: 1 }]
        }]);
    });

    it('should delete recipe', () => {
        store.dispatch(new RecipeActions.DeleteRecipe(0));

        const newRecipeState = store.selectSnapshot(RecipesState.getRecipes);
        expect(newRecipeState).toEqual([]);
    });

    it('should get recipe', () => {
        const recipe = store.dispatch(new RecipeActions.GetRecipe(0));
        recipe.subscribe((recipe: IRecipe) => {
            expect(recipe).toEqual({
                name: 'Schnitzel mit Pommes',
                description: 'Bla bla',
                imagePath: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Recipe_icon.svg',
                ingredients: [{ name: 'Schnitzel', amount: 2, }, { name: 'Pommes', amount: 1 }]
            });
        });
    });

});
