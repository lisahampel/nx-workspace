import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { ShoppingListEditComponent } from '../../pages/edit/shopping-list-edit.component';
import { ShoppingListState } from '../../state/shopping-list.state';

import { ShoppingListComponent } from './shopping-list.component';

describe('ShoppingListComponent', () => {
    let component: ShoppingListComponent;
    let fixture: ComponentFixture<ShoppingListComponent>;
    let debugElement: DebugElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                ShoppingListComponent,
                ShoppingListEditComponent
            ],
            imports: [
                FormsModule,
                NgxsModule.forRoot([ShoppingListState])
            ],
            providers: []
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ShoppingListComponent);
        component = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display shopping list items: Bread (2) and Onion (5)', () => {
        const bread = debugElement.queryAll(By.css('.list-group-item'))[0];
        const onion = debugElement.queryAll(By.css('.list-group-item'))[1];
        expect(bread.nativeElement.textContent).toBe(' Bread (2) ');
        expect(onion.nativeElement.textContent).toBe(' Onion (5) ');
    });

    it('renders bynary-shopping-list-edit-component', () => {
        const shoppingListEditCmp = findComponent(fixture, 'bynary-shopping-list-edit-component');
        expect(shoppingListEditCmp).toBeTruthy();
    });

});

export function findComponent<T>(
    fixture: ComponentFixture<T>,
    selector: string,
): DebugElement {
    return fixture.debugElement.query(By.css(selector));
}
