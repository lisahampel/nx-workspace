import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesFacade } from '../../services/recipes.facade';

@Component({
    selector: 'bynary-recipe-edit-component',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'c-recipe-edit-component'
    }
})
export class RecipeEditComponent implements OnInit {
    id!: number;
    editMode: boolean = false;
    recipeForm!: FormGroup;

    constructor(private readonly _route: ActivatedRoute,
                private readonly _router: Router,
                private readonly _recipeFacade: RecipesFacade) {
    }

    ngOnInit(): void {
        this._route.params.subscribe(
            (params: Params) => {
                this.id = +params['id'];
                this.editMode = params['id'] != null;
                this.initForm();
            }
        );
    }

    onSubmit() {
        if (this.editMode) {
            this._recipeFacade.updateRecipe(this.id, this.recipeForm.value);
        } else {
            this._recipeFacade.addRecipe(this.recipeForm.value);
        }
        this.onCancel();
    }

    onAddIngredient() {
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup({
                'name': new FormControl(null, Validators.required),
                'amount': new FormControl([
                    Validators.required,
                    Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
            })
        );
    }

    onCancel() {
        this._router.navigate(['../'], { relativeTo: this._route });
    }

    onDeleteIngredient(index: number) {
        (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
    }

    get controls() {
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

    private initForm() {
        let recipeName = '';
        let recipeImagePath = '';
        let recipeDescription = '';
        let recipeIngredients = new FormArray([]);

        if (this.editMode) {
            // TODO: Problem wenn object von type IRecipe ist
            this._recipeFacade.getRecipe(this.id).subscribe((object: any) => {
                const recipe = object.recipe.recipe[this.id];

                recipeName = recipe.name;
                recipeImagePath = recipe.imagePath;
                recipeDescription = recipe.description;
                if (recipe['ingredients']) {
                    for (let ingredient of recipe.ingredients) {
                        recipeIngredients.push(
                            new FormGroup({
                                'name': new FormControl(ingredient.name, Validators.required),
                                'amount': new FormControl(ingredient.amount, [
                                    Validators.required,
                                    Validators.pattern(/^[1-9]+[0-9]*$/)
                                ])
                            })
                        );
                    }
                }
            });

        }

        this.recipeForm = new FormGroup({
            'name': new FormControl(recipeName, Validators.required),
            'imagePath': new FormControl(recipeImagePath, Validators.required),
            'description': new FormControl(recipeDescription, Validators.required),
            'ingredients': recipeIngredients
        });
    }

}
