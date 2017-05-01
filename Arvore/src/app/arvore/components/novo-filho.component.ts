/* Angular */
import { Component, Output, EventEmitter, Input } from '@angular/core';

/* Modelos */
import { Arvore } from '..';

@Component({
  selector: 'novo-filho',
  templateUrl: '/novo-filho.component.html'
})
export class NovoFilhoComponent {

  // Recebe o pai do filho que será criado, do component ArvoreComponent
  @Input("pai")
  set value(_pai: Arvore) {
    if (_pai) {

      this.arvore = new Arvore(null, null, _pai, null, _pai.filhos.length + 1);
    }
  }

  // Output do filho que será criado para ArvoreComponent
  @Output("filho") filho: EventEmitter<Arvore> = new EventEmitter<Arvore>();

  // Filho
  arvore: Arvore;

  constructor () { }

  /**
   * Emite para ArvoreComponent o novo filho
   */
  sendFilho(): void {
    this.filho.emit(this.arvore);
  }

}
