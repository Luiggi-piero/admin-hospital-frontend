import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: [],
})
export class IncrementadorComponent implements OnInit {
  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;
  }

  // Renombra el argumento con 'value'
  // @Input('value') progreso: number = 50;

  @Input() progreso: number = 50;
  @Input() btnClass: string = 'btn-primary';

  @Output() valorSalida: EventEmitter<number> = new EventEmitter();

  changeValue(value: number): void {
    if (this.progreso >= 100 && value >= 0) {
      this.valorSalida.emit(100);
      this.progreso = 100;
      return;
    }
    if (this.progreso <= 0 && value < 0) {
      this.valorSalida.emit(0);
      this.progreso = 0;
      return;
    }

    this.progreso = this.progreso + value;
    this.valorSalida.emit(this.progreso);
  }

  // Controla la escritura sobre el input (no toma en cuenta los botones)
  onChange(value: number) {
    if (value >= 100) this.progreso = 100;
    else if (value <= 0) this.progreso = 0;
    else this.progreso = value;

    this.valorSalida.emit(this.progreso);
  }
}
