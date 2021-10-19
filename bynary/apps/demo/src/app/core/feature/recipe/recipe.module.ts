import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxsModule } from '@ngxs/store';

import { RecipesService } from '@bynary/angular-recipes';
import { AngularSharedModule } from '@bynary/angular/shared';
import { RecipeItemComponent } from './components/list-item/recipe-item.component';
import { AngularRecipesListComponent } from './components/list/recipe-list.component';
import { RecipeComponent } from './components/recipe.component';
import { RecipeDetailComponent } from './pages/detail/recipe-detail.component';
import { RecipeEditComponent } from './pages/edit/recipe-edit.component';
import { RecipeStartComponent } from './pages/start/recipe-start.component';
import { RECIPE_ROUTES } from './recipe.routes';
import { RecipesState } from './state/recipes.state';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(RECIPE_ROUTES),

        AngularSharedModule,
        ReactiveFormsModule,
        NgxsModule.forFeature([RecipesState])
    ],
    exports: [RecipeComponent],
    providers: [
        RecipesService
    ],
    declarations: [
        RecipeDetailComponent,
        AngularRecipesListComponent,
        RecipeItemComponent,
        RecipeComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ],
})
export class RecipeModule {
}
