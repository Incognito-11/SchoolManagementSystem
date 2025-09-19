import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private ms: MessageService) {}

  success(summary: string, detail?: string) {
    this.ms.add({ severity: 'success', summary, detail, life: 3000 });
  }
  info(summary: string, detail?: string) {
    this.ms.add({ severity: 'info', summary, detail, life: 3000 });
  }
  warn(summary: string, detail?: string) {
    this.ms.add({ severity: 'warn', summary, detail, life: 4000 });
  }
  error(summary: string, detail?: string) {
    this.ms.add({ severity: 'error', summary, detail, life: 5000 });
  }
}
