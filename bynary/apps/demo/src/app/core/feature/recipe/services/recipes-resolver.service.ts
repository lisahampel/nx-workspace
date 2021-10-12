import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DataStorageService } from '../../../../../../../../libs/angular/shared/src';
import { IRecipe } from '../models/recipe.interface';
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
