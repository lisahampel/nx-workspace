import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularRecipesListComponent } from './recipe-list.component';

describe('AngularRecipesListComponent', () => {
  let component: AngularRecipesListComponent;
  let fixture: ComponentFixture<AngularRecipesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AngularRecipesListComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularRecipesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
