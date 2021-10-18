import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DropdownDirective } from './directives/dropdown.directive';
import { PlaceholderDirective } from './directives/placeholder.directive';

@NgModule({
    imports: [CommonModule],
    declarations: [
        DropdownDirective,
        PlaceholderDirective
    ],
    exports: [
        DropdownDirective,
        PlaceholderDirective
    ]
})
export class AngularSharedModule {
}
