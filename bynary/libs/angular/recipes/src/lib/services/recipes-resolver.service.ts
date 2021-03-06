import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IRecipe } from '../../../../../../apps/demo/src/app/core/feature/recipe/models/recipe.interface';
import { DataStorageService } from '../../../../shared/src/lib/services/data-storage.service';
import { RecipesService } from './recipes.service';

@Injectable({
    providedIn: 'root'
})
export class RecipesResolverService implements Resolve<IRecipe[]> {

    constructor(private _dataStorageService: DataStorageService, private _recipesService: RecipesService) {
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IRecipe[]> {
        return this._dataStorageService.fetchRecipes();

        /*if(recipes.length === 0) {
            return this._dataStorageService.fetchRecipes();
        } else {
            return recipes;
        }*/
    }
}
