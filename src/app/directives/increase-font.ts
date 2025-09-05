import { Directive, ElementRef, inject, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appIncreaseFont]',
})
export class IncreaseFont implements OnInit {
  constructor() {}
  @Input() increaseBy: number = 2;
  private el = inject(ElementRef);
  ngOnInit(): void {
    const currentSize = window.getComputedStyle(this.el.nativeElement).fontSize;
    const newSize = parseFloat(currentSize) + this.increaseBy + 'px';
    this.el.nativeElement.style.fontSize = newSize;
  }
}
