import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'currencyInr' })
export class CurrencyInrPipe implements PipeTransform {
  transform(value: number): string {
    if (value == null) return '';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
    }).format(value);
  }
}
