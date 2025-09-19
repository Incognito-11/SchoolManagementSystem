import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  template: `<p-toast position="top-right" [baseZIndex]="10000"></p-toast>`,
})
export class ToastComponent {}
