import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxsModule } from '@ngxs/store';
import { of } from 'rxjs';
import { MaybeMocked, mocked } from 'ts-jest/dist/utils/testing';
import { RecipesFacade } from '../../services/recipes.facade';
import { RecipesState } from '../../state/recipes.state';

import { RecipeDetailComponent } from './recipe-detail.component';

describe('RecipeDetailComponent', () => {
    let component: RecipeDetailComponent;
    let fixture: ComponentFixture<RecipeDetailComponent>;
    let mockedActivatedRoute: MaybeMocked<ActivatedRoute>;
    let mockedRouter: MaybeMocked<Router>;
    let mockedRecipeFace: MaybeMocked<RecipesFacade>;

    const recipe = {
        name: 'Schnitzel mit Pommes', description: 'Bla bla',
        imagePath: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Recipe_icon.svg',
        ingredients: [{ name: 'Schnitzel', amount: 2, }, { name: 'Pommes', amount: 1 }]
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
                    useValue: {
                        getRecipe: jest.fn(),
                        addIngredientsToShoppingList: jest.fn(),
                        deleteRecipe: jest.fn()
                    }
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        params: of({ id: 1 })
                    }
                },
                {
                    provide: Router,
                    useValue: {
                        navigate: jest.fn()
                    }
                }
            ]
        })
            .compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(RecipeDetailComponent);
        component = fixture.componentInstance;

        mockedActivatedRoute = mocked(TestBed.inject(ActivatedRoute));
        mockedRouter = mocked(TestBed.inject(Router));
        mockedRecipeFace = mocked(TestBed.inject(RecipesFacade));

        component.recipe = recipe;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('logic', () => {

        it('should call getRecipe method when ngOnInit is called', () => {
            expect(mockedRecipeFace.getRecipe).toHaveBeenCalledWith(1);
        });

        it('should call addIngredientsToShoppingList in onAddToShoppingList method', () => {
            component.onAddToShoppingList();
            expect(mockedRecipeFace.addIngredientsToShoppingList).toHaveBeenCalledWith([
                { name: 'Schnitzel', amount: 2, },
                { name: 'Pommes', amount: 1 }
            ]);
        });

        it('should navigate to edit page when call onEditRecipe method', () => {
            component.onEditRecipe();
            expect(mockedRouter.navigate).toHaveBeenCalledWith(['edit'], { relativeTo: { params: mockedActivatedRoute.params } });
        });

        describe('onDeleteRecipe', () => {

            beforeEach(() => {
                component.onDeleteRecipe();
            });

            it('should call recipeFacade.deleteRecipe with the correct arguments', () => {
                expect(mockedRecipeFace.deleteRecipe).toHaveBeenCalledWith(1);
            });

            it('should call router.navigate with the correct arguments', () => {
                expect(mockedRouter.navigate).toHaveBeenCalledWith(['recipes']);
            });

        });

    });

    describe('template', () => {
        let debugElement: DebugElement;

        beforeEach(() => {
            debugElement = fixture.debugElement;
        });

        describe('recipe', () => {

            it('should have a name', () => {
                const recipeName = debugElement.query(By.css('.c-recipe-detail-component__recipe-name'));

                expect(recipeName.nativeElement.textContent).toEqual('Schnitzel mit Pommes');
            });

            it('should have an image', () => {
                const recipeImage = debugElement.query(By.css('.c-recipe-detail-component__recipe-image')).properties;

                expect(recipeImage.src).toEqual('https://upload.wikimedia.org/wikipedia/commons/b/b9/Recipe_icon.svg');
            });

            it('should have a description', () => {
                const recipeDescription = debugElement.query(By.css('.c-recipe-detail-component__recipe-description'));

                expect(recipeDescription.nativeElement.textContent).toEqual(' Bla bla ');
            });

            it('should have a ingredients', () => {
                const recipeIngredients = debugElement.queryAll(By.css('.c-recipe-detail-component__recipe-ingredients'));

                expect(recipeIngredients).toHaveLength(2);
                expect(recipeIngredients[0].nativeElement.textContent).toEqual(' Schnitzel - 2 ');
                expect(recipeIngredients[1].nativeElement.textContent).toEqual(' Pommes - 1 ');
            });

        });

        // TODO: Überprüfen, ob Buttons richtige Texte anzeigen

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
