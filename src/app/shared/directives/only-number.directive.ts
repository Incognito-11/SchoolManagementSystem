import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[onlyNumber]',
})
export class OnlyNumberDirective {
  @HostListener('keypress', ['$event']) onKeyPress(event: KeyboardEvent) {
    const char = String.fromCharCode(event.which || event.keyCode);
    if (!/^[0-9]$/.test(char)) {
      event.preventDefault();
    }
  }
}
