import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipesService } from '@bynary/angular-recipes';
import { AngularSharedModule } from '@bynary/angular/shared';
import { NgxsModule } from '@ngxs/store';
import { APP_ROUTES } from '../../routing/app.routes';
import { RecipeItemComponent } from './components/list-item/recipe-item.component';
import { AngularRecipesListComponent } from './components/list/recipe-list.component';
import { RecipeComponent } from './components/recipe.component';
import { RecipeDetailComponent } from './pages/detail/recipe-detail.component';
import { RecipeEditComponent } from './pages/edit/recipe-edit.component';
import { RecipeStartComponent } from './pages/start/recipe-start.component';
import { RecipesState } from './state/recipes.state';

@NgModule({
    imports: [
        CommonModule,
        AngularSharedModule,
        RouterModule.forChild(APP_ROUTES),
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
