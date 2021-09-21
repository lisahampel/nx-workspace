import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularSharedModule } from '@bynary/angular/shared';
import { APP_ROUTES } from '../../routing/app.routes';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeItemComponent } from './recipes-list/recipe-item/recipe-item.component';
import { AngularRecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipesComponent } from './recipes.component';

@NgModule({
  imports: [
    CommonModule,
    AngularSharedModule,
    RouterModule.forChild(APP_ROUTES),
    ReactiveFormsModule
  ],
  exports: [RecipesComponent],
  declarations: [
    RecipeDetailComponent,
    AngularRecipesListComponent,
    RecipeItemComponent,
    RecipesComponent,
    RecipeStartComponent,
    RecipeEditComponent,
  ],
})
export class RecipesModule {
}
