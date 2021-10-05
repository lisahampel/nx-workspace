import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthFacade } from '../../../../../../../libs/angular/auth/src/lib/services/auth.facade';
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
export class HeaderComponent implements OnInit, OnDestroy {
    private userSub!: Subscription;
    isAuthenticated = false;

    constructor(private _dataStorageService: DataStorageService, private readonly _authFacade: AuthFacade) {
    }

    onSaveData() {
        this._dataStorageService.storeRecipes();
    }

    onFetchData() {
        this._dataStorageService.fetchRecipes().subscribe();
    }

    onLogout() {
        this._authFacade.logout();

    }

    ngOnInit(): void {
        this.userSub = this._authFacade.user.subscribe((user) => {
            this.isAuthenticated = !!user;
        });
    }

    ngOnDestroy() {
        this.userSub.unsubscribe();
    }
}
