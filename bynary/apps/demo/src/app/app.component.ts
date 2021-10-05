import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '../../../../libs/angular/auth/src/lib/services/auth.facade';

@Component({
  selector: 'bynary-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'demo';

  constructor(private readonly _authFacade: AuthFacade) {
  }

  ngOnInit() {
    this._authFacade.autoLogin();
  }

}
