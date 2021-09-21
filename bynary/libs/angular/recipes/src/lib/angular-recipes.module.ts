import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { RecipesService } from './services/recipes.service';
import { RecipesState } from './state/recipes.state';

@NgModule({
  imports: [
    CommonModule,
    NgxsModule.forFeature([RecipesState])
  ],
  providers: [
    RecipesService
  ]
})
export class AngularRecipesModule {
}
