import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipesService } from '@bynary/angular-recipes';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IRecipe } from '../../../../../../apps/demo/src/app/core/feature/recipe/models/recipe.interface';
import { AuthFacade } from '../../../../auth/src/lib/services/auth.facade';

@Injectable({
    providedIn: 'root'
})
export class DataStorageService {

    constructor(private _http: HttpClient, private _recipesService: RecipesService, private readonly _authFacade: AuthFacade) {
    }

    storeRecipes() {
        const recipes = this._recipesService.getRecipes();
        this._http.put('https://recipe-book-e1564-default-rtdb.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes(): Observable<any> {
        return this._http.get<IRecipe[]>('https://recipe-book-e1564-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
                // rxjs Operator
                map(recipes => {
                    // Javascript Array method
                    return recipes.map((recipe: IRecipe) => {
                        // Hat das Rezept Zutaten, werden diese mit gespeichert, ansonsten wird ein leeres Array zum Speichern übergeben
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                    });
                }),
                tap(recipes => {
                    this._recipesService.setRecipes(recipes);
                })
            );
    }
}
