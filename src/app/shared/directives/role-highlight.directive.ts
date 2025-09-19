import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Directive({
  selector: '[roleHighlight]',
})
export class RoleHighlightDirective implements OnInit {
  @Input('roleHighlight') role: 'admin' | 'user' = 'user';

  constructor(private el: ElementRef, private auth: AuthService) {}

  ngOnInit(): void {
    if (this.auth.isInRole(this.role)) {
      (this.el.nativeElement as HTMLElement).style.boxShadow =
        '0 0 6px rgba(0,123,255,0.2)';
      (this.el.nativeElement as HTMLElement).style.borderRadius = '6px';
    }
  }
}
