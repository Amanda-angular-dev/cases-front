import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]'
})
export class ScrollAnimationDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Inicializa el elemento como oculto
    this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateX(-100%)');
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.5s ease-out, opacity 0.5s ease-out');
  }

  // Detecta cuando el elemento entra en la vista
  @HostListener('window:scroll', [])
  onScroll() {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
      this.renderer.setStyle(this.el.nativeElement, 'transform', 'translateX(0)');
    }
  }
}
