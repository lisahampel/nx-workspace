import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'bynary-root-layout',
  templateUrl: './root.layout.html',
  styleUrls: ['./root.layout.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host : {
    class: 'c-root-layout'
  }
})
export class RootLayout {

}
