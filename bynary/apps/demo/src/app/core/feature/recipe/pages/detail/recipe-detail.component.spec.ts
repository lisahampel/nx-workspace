import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { RecipesFacade } from '../../services/recipes.facade';
import { RecipesState } from '../../state/recipes.state';

import { RecipeDetailComponent } from './recipe-detail.component';

describe('RecipeDetailComponent', () => {
    let component: RecipeDetailComponent;
    let fixture: ComponentFixture<RecipeDetailComponent>;
    const recipe = {
        name: 'Schnitzel mit Pommes', description: 'Bla bla',
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Recipe_icon.svg',
        ingredients: [{ name: 'Schnitzel', amount: 2, }, { name: 'Pommes', amount: 1 }]
    };
    const router = {
        navigate: jest.fn(),
    };
    const route = {
        params: {
            subscribe: jest.fn()
        }
    };
    const recipesFacadeStub = {
        getRecipe: jest.fn(),
        addIngredientsToShoppingList: jest.fn(),
        deleteRecipe: jest.fn()
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RecipeDetailComponent],
            imports: [
                RouterTestingModule.withRoutes([]),
                NgxsModule.forRoot([RecipesState])
            ],
            providers: [
                {
                    provide: RecipesFacade,
                    useValue: recipesFacadeStub
                }
            ]
        })
            .compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(RecipeDetailComponent);
        component = fixture.componentInstance;
        component.recipe = recipe;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('logic', () => {


        it('should call getRecipe method', () => {
            const routeParams = jest.spyOn(route.params, 'subscribe');

            route.params.subscribe(() => {
                recipesFacadeStub.getRecipe();
                expect(recipesFacadeStub.getRecipe).toHaveBeenCalledTimes(1);
            });

            expect(routeParams).toHaveBeenCalledTimes(1);
        });

        it('should call addIngredientsToShoppingList in onAddToShoppingList method', () => {
            recipesFacadeStub.addIngredientsToShoppingList();
            expect(recipesFacadeStub.addIngredientsToShoppingList).toHaveBeenCalledTimes(1);
        });

        it('should navigate to edit-page when call onEditRecipe method', () => {
            router.navigate(['edit']);
            expect(router.navigate).toHaveBeenCalledWith(['edit']);
        });

        it('should call deleteRecipe method and navigate to recipes page when call onDeleteRecipe method', () => {
            recipesFacadeStub.deleteRecipe();
            expect(recipesFacadeStub.deleteRecipe).toHaveBeenCalledTimes(1);

            router.navigate(['recipes']);
            expect(router.navigate).toHaveBeenCalledWith(['recipes']);
        });

    });


    describe('template', () => {
        let debugElement: DebugElement;

        beforeEach(() => {
            debugElement = fixture.debugElement;
        });

        it('should display recipe with name, image, description and ingredients', () => {
            const recipeImage = debugElement.query(By.css('.recipe-image')).properties;
            const recipeName = debugElement.query(By.css('.recipe-name'));
            const recipeDescribtion = debugElement.query(By.css('.recipe-description'));
            const recipeIngredients = debugElement.queryAll(By.css('.recipe-ingredients'));

            expect(recipeImage.src).toEqual('https://upload.wikimedia.org/wikipedia/commons/b/b9/Recipe_icon.svg');
            expect(recipeName.nativeElement.textContent).toEqual('Schnitzel mit Pommes');
            expect(recipeDescribtion.nativeElement.textContent).toEqual(' Bla bla ');

            expect(recipeIngredients).toHaveLength(2);
            expect(recipeIngredients[0].nativeElement.textContent).toEqual(' Schnitzel - 2 ');
            expect(recipeIngredients[1].nativeElement.textContent).toEqual(' Pommes - 1 ');
        });

        it('should call onAddToShoppingList method when button "To Shopping List" is clicked', () => {
            const addToShoppingList = jest.spyOn(component, 'onAddToShoppingList');

            const toShoppingListButton = debugElement.query(By.css('#toShoppingList'));
            toShoppingListButton.triggerEventHandler('click', addToShoppingList);

            expect(addToShoppingList).toHaveBeenCalledTimes(1);
        });

        it('should call onEditRecipe method when button "Edit Recipe" is clicked', () => {
            const onEditRecipe = jest.spyOn(component, 'onEditRecipe');

            const editRecipeButton = debugElement.query(By.css('#editRecipe'));
            editRecipeButton.triggerEventHandler('click', onEditRecipe);

            expect(onEditRecipe).toHaveBeenCalledTimes(1);
        });

        it('should call onDeleteRecipe method when button "onDeleteRecipe" is clicked', () => {
            const onDeleteRecipe = jest.spyOn(component, 'onDeleteRecipe');

            const deleteRecipe = debugElement.query(By.css('#deleteRecipe'));
            deleteRecipe.triggerEventHandler('click', onDeleteRecipe);

            expect(onDeleteRecipe).toHaveBeenCalledTimes(1);
        });
    });

});
