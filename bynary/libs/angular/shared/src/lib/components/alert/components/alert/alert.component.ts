import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'bynary-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'c-alert-component'
    }
})
export class AlertComponent {
    @Input() message!: string;
    @Output() close = new EventEmitter<void>();

    constructor() {
    }

    onClose() {
        this.close.emit();
    }

}
