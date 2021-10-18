import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[bynaryPlaceholder]'
})
export class PlaceholderDirective {

    constructor(public viewContainerRef: ViewContainerRef) {
    }

}
