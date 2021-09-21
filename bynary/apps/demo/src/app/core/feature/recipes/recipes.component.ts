import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation, } from '@angular/core';

@Component({
  selector: 'bynary-recipes-component',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'c-recipes-component',
  },
})
export class RecipesComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
