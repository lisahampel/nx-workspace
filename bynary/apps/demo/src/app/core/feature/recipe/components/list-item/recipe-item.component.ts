import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IRecipe } from '../../models/recipe.interface';


@Component({
    selector: 'bynary-recipe-item-component',
    templateUrl: './recipe-item.component.html',
    styleUrls: ['./recipe-item.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'c-recipe-item-component'
    }
})
export class RecipeItemComponent implements OnInit {
    @Input() recipe!: IRecipe;
    @Input() index!: number;

    constructor() {
    }

    ngOnInit() {
    }

}
