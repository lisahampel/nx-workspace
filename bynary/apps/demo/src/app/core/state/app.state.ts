import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';

interface IAppState {
  name: string;
}

@State<IAppState>({
  name: 'app',
  defaults: {
    name: 'Demo'
  }
})
@Injectable()
export class AppState {

}
