import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DataStorageService } from '../../../../../../../libs/angular/shared/src/lib/services/data-storage.service';

@Component({
  selector: 'bynary-header-component',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'c-header-component'
  }
})
export class HeaderComponent {

  constructor(private _dataStorageService: DataStorageService) {
  }

  onSaveData() {
    this._dataStorageService.storeRecipes();
  }

  onFetchData() {
    this._dataStorageService.fetchRecipes().subscribe();
  }
}
