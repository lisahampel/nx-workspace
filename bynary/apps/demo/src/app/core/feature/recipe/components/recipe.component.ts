import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, } from '@angular/core';

@Component({
    selector: 'bynary-recipes-component',
    templateUrl: './recipe.component.html',
    styleUrls: ['./recipe.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'c-recipes-component',
    },
})
export class RecipeComponent implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }
}
