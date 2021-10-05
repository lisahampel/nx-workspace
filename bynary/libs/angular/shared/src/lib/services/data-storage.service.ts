import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRecipe, RecipesService } from '@bynary/angular-recipes';
import { map, tap } from 'rxjs/operators';
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

    fetchRecipes() {
        return this._http.get<IRecipe[]>('https://recipe-book-e1564-default-rtdb.firebaseio.com/recipes.json')
            .pipe(
                // rxjs Operator
                map(recipes => {
                    // Javascript Array method
                    recipes.map((recipe: IRecipe) => {
                        console.log(recipes);
                        // Hat das Rezept Zutaten, werden diese mit gespeichert, ansonsten wird ein leeres Array zum Speichern übergeben
                        console.log({ ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] });
                        return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
                    });
                }),
                tap((recipes: any) => {
                    this._recipesService.setRecipes(recipes);
                })
            );
    }
}
