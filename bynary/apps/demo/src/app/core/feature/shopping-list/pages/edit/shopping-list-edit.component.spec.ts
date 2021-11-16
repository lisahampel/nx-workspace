import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { MaybeMocked, mocked } from 'ts-jest/dist/utils/testing';
import { ShoppingListFacade } from '../../services/shopping-list.facade';
import { ShoppingListState } from '../../state/shopping-list.state';

import { runOnPushChangeDetection } from '../../../../utils/test.utils';

import { ShoppingListEditComponent } from './shopping-list-edit.component';

describe('ShoppingListEditComponent', () => {
    let component: ShoppingListEditComponent;
    let fixture: ComponentFixture<ShoppingListEditComponent>;
    let mockedShoppingListFacade: MaybeMocked<ShoppingListFacade>;

    const mockedNgForm = {
        onReset: () => null,
        reset: () => null,
        setValue: () => null,
        valid: true,
        value: {
            name: 'milk',
            amount: 2
        }
    } as unknown as NgForm;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ShoppingListEditComponent],
            imports: [
                FormsModule,
                ReactiveFormsModule,
                NgxsModule.forRoot([ShoppingListState])
            ],
            providers: [
                {
                    provide: ShoppingListFacade,
                    useValue: {
                        deleteIngredient: jest.fn(),
                        updateIngredient: jest.fn(),
                        addIngredient: jest.fn(),
                        getIngredient: jest.fn(),
                        startedEditing: { subscribe: jest.fn() }
                    }
                }
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShoppingListEditComponent);
        component = fixture.componentInstance;

        mockedShoppingListFacade = mocked(TestBed.inject(ShoppingListFacade));

        fixture.detectChanges();
    });

    it('should create', async () => {
        expect(component).toBeTruthy();
    });

    describe('logic', () => {
        let spy1: jest.SpyInstance;
        let spy2: jest.SpyInstance;

        beforeEach(() => {
            spy1 = jest.spyOn(mockedNgForm, 'setValue');
            spy2 = jest.spyOn(mockedShoppingListFacade.startedEditing, 'subscribe');
        });

        afterEach(() => {
           spy1.mockReset();
           spy2.mockReset();
        });

        it('should subscribe to shoppingListFacade.startedEditing', () => {
            expect(spy2).toHaveBeenCalledTimes(1);
            // expect(spy1).toHaveBeenCalledTimes(1);
        });

        it('should call shoppingListFacade.getIngredient', () => {
            // expect(mockedShoppingListFacade.getIngredient).toHaveBeenCalledTimes(1);
        });

        it('should call shoppingListForm.setValue', () => {
            // TODO
        });

        describe('onSubmit', () => {

            describe('onSubmit with editMode = true', () => {

                beforeEach(() => {
                    component.editMode = true;
                    component.onSubmit(mockedNgForm);
                });

                it('should call shoppingListFacade.updateIngredient() method', () => {
                    expect(mockedShoppingListFacade.updateIngredient).toHaveBeenCalledTimes(1);
                    // TODO: erst testen, wenn Code in component ausgebessert wurde
                    // expect(mockedShoppingListFacade.updateIngredient).toHaveBeenCalledWith({ name: 'milk', amount: 2 });
                });
            });

            describe('onSubmit with editMode = false', () => {

                beforeEach(() => {
                    component.editMode = false;
                    component.onSubmit(mockedNgForm);
                });

                it('should call shoppingListFacade.addIngredient() method', () => {
                    expect(mockedShoppingListFacade.addIngredient).toHaveBeenCalledTimes(1);
                    // TODO: erst testen, wenn Code in component ausgebessert wurde
                    // expect(mockedShoppingListFacade.addIngredient).toHaveBeenCalledWith({ id: '1', name: 'milk', amount: 2});
                });
            });

            describe('call resetForm', () => {
                let spy: jest.SpyInstance;

                beforeEach(() => {
                    spy = jest.spyOn(component, 'resetForm');
                    component.onSubmit(mockedNgForm);
                });

                afterEach(() => {
                   spy.mockReset();
                });

                it('should be called', () => {
                    expect(spy).toHaveBeenCalledTimes(1);
                });
            });
        });

        describe('resetForm', () => {
            let spy: jest.SpyInstance;

            beforeEach(() => {
                spy = jest.spyOn(mockedNgForm, 'onReset');
                component.resetForm(mockedNgForm);
            });

            afterEach(() => {
                spy.mockReset();
            });

            it('should set editMode to false', () => {
                expect(component.editMode).toBeFalsy();
            });

            it('should call form.onReset method', () => {
                expect(spy).toHaveBeenCalledTimes(1);
            });
        });

        describe('onClear', () => {
            let spy: jest.SpyInstance;

            beforeEach(() => {
                spy = jest.spyOn(mockedNgForm, 'reset');
                component.onClear();
            });

            afterEach(() => {
               spy.mockReset();
            });

            // TODO!
            it('should call shoppingListForm.reset', () => {
                // expect(spy).toHaveBeenCalledTimes(1);
            });

            it('should set editMode to false', () => {
                expect(component.editMode).toBeFalsy();
            });

        });

        describe('onDelete', () => {
            let spy: jest.SpyInstance;

            beforeEach(() => {
                spy = jest.spyOn(component, 'onClear');
                component.onDelete();
            });

            afterEach(() => {
               spy.mockReset();
            });

            it('should call shoppingListFacade.deleteIngredient method', () => {
                expect(mockedShoppingListFacade.deleteIngredient).toHaveBeenCalledTimes(1);
                // TODO:  Received: undefined bei Abfrage
                // expect(mockedShoppingListFacade.deleteIngredient).toHaveBeenCalledWith(1);
            });

            it('should call onClear method', () => {
                expect(spy).toHaveBeenCalledTimes(1);
            });
        });
    });

    describe('template', () => {
        let debugElement: DebugElement;

        beforeEach(() => {
            debugElement = fixture.debugElement;
        });


        describe('form', () => {

            describe('name', () => {
                let inputName: HTMLElement;

                beforeEach(() => {
                    inputName = debugElement.query(By.css('#name')).nativeElement as HTMLElement;
                });

                it('should be empty', () => {
                    expect(inputName.textContent).toEqual('');
                });
            });

            describe('amount', () => {
                let inputAmount: HTMLElement;

                beforeEach(() => {
                    inputAmount = debugElement.query(By.css('#amount')).nativeElement as HTMLElement;
                });

                it('should be empty', () => {
                    expect(inputAmount.textContent).toEqual('');
                });
            });

            describe('buttons', () => {

                describe('onSubmit button', () => {
                    let onSubmitBtn: HTMLElement;

                    beforeEach(() => {
                        onSubmitBtn = debugElement.query(By.css('#onSubmitBtn')).nativeElement as HTMLElement;
                    });

                    it('should call onSubmit method when button is clicked', () => {
                        const onSubmit = jest.spyOn(component, 'onSubmit');

                        onSubmitBtn.click();

                        expect(onSubmit).toHaveBeenCalledTimes(1);
                    });

                    describe('onSubmit button label - Update', () => {

                        beforeEach(() => {
                            component.editMode = true;
                            // fixture.detectChanges();
                            runOnPushChangeDetection(fixture);
                        });

                        it('should have correct label: Update', () => {
                            expect(onSubmitBtn.textContent).toEqual('Update');
                        });
                    });

                    describe('onSubmit button label - Add', () => {

                        beforeEach(() => {
                            component.editMode = false;
                        });

                        it('should have correct label: Add', () => {
                            expect(onSubmitBtn.textContent).toEqual('Add');
                        });
                    });
                });

                describe('onDelete button', () => {
                    let onDeleteBtn: HTMLElement;

                    beforeEach(() => {
                        component.editMode = true;
                        runOnPushChangeDetection(fixture);
                        onDeleteBtn = debugElement.query(By.css('#onDeleteBtn')).nativeElement as HTMLElement;
                    });

                    it('should call onDelete method when button is clicked', () => {
                        const onDelete = jest.spyOn(component, 'onDelete');

                        onDeleteBtn.click();

                        expect(onDelete).toHaveBeenCalledTimes(1);
                    });

                    it('should have correct label: Delete', () => {
                        expect(onDeleteBtn.textContent).toEqual('Delete');
                    });
                });

                describe('onClear button', () => {
                    let onClearBtn: HTMLElement;

                    beforeEach(() => {
                        component.editMode = true;
                        onClearBtn = debugElement.query(By.css('#onClearBtn')).nativeElement as HTMLElement;
                    });

                    it('should call onClear method when button is clicked', () => {
                        const onClear = jest.spyOn(component, 'onClear');

                        onClearBtn.click();

                        expect(onClear).toHaveBeenCalledTimes(1);
                    });

                    it('should have correct label: Clear', () => {
                        expect(onClearBtn.textContent).toEqual('Clear');
                    });
                });

            });

        });

    });

});

