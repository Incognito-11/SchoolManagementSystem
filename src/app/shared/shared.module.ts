import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnlyNumberDirective } from './directives/only-number.directive';
import { RoleHighlightDirective } from './directives/role-highlight.directive';
import { CurrencyInrPipe } from './pipes/currency-inr.pipe';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ToastComponent } from './components/toast.component';

@NgModule({
  declarations: [
    ToastComponent,
    OnlyNumberDirective,
    RoleHighlightDirective,
    CurrencyInrPipe,
  ],
  imports: [CommonModule, ToastModule, FormsModule],
  exports: [
    ToastComponent,
    OnlyNumberDirective,
    RoleHighlightDirective,
    CurrencyInrPipe,
  ],
  providers: [MessageService],
})
export class SharedModule {}
