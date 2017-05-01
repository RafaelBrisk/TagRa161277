/* Angular */
import { Component, OnInit } from '@angular/core';

/* Modelos */
import { Arvore } from '..';

@Component({
  selector: 'arvore',
  templateUrl: './arvore.component.html',
  styleUrls: ['./arvore.component.scss']
})
export class ArvoreComponent implements OnInit {

  raiz: Arvore;
  pai: Arvore;

  exibicao = [];

  constructor(
  ) { }

  ngOnInit() {

    let nome = "Despesas Operacionais";
    let valor = 0;
    let pai = null;
    let filhos = [];

    let arvore = new Arvore(
      nome,
      valor,
      pai,
      filhos,
      1
    );

    this.raiz = arvore;

    this.queryChilds();
  }

  /**
   * Busca plano de contas padrão
   */
  private queryChilds(): void {
    let arvores: Arvore[] = [];

    let despesasAdministrativas = new Arvore("Despesas Administrativas", 0, this.raiz, [], 0);

    let agua = new Arvore("Água", 10, despesasAdministrativas, [], 0);
    let aluguel = new Arvore("Aluguel", 20, despesasAdministrativas, [], 0);
    let internetTelefone = new Arvore("Internet e Telefone", 30, despesasAdministrativas, [], 0);
    let energiaEletrica = new Arvore("Energia Elétrica", 40, despesasAdministrativas, [], 0);

    despesasAdministrativas.filhos.push(agua);
    despesasAdministrativas.filhos.push(aluguel);
    despesasAdministrativas.filhos.push(internetTelefone);
    despesasAdministrativas.filhos.push(energiaEletrica);



    let gastosPessoal = new Arvore("Gastos com Pessoal", 0, this.raiz, [], 0);

    let beneficios = new Arvore("Benefício", 50, gastosPessoal, [], 0);
    let encargos = new Arvore("Encargos", 60, gastosPessoal, [], 0);
    let salarios = new Arvore("Salários", 70, gastosPessoal, [], 0);

    gastosPessoal.filhos.push(beneficios);
    gastosPessoal.filhos.push(encargos);
    gastosPessoal.filhos.push(salarios);

    let manutençãoLimpeza = new Arvore("Manutenção e Limpeza", 0, this.raiz, [], 0);

    let servicosLimpeza = new Arvore("Serviços de Limpeza", 80, manutençãoLimpeza, [], 0);
    let servicosManutencao = new Arvore("Serviços de Manutenção", 90, manutençãoLimpeza, [], 0);

    manutençãoLimpeza.filhos.push(servicosLimpeza);
    manutençãoLimpeza.filhos.push(servicosManutencao);

    let materiais = new Arvore("Materiais", 0, this.raiz, [], 0);

    let materiasEscritorio = new Arvore("Materias de Escritório", 100, materiais, [], 0);
    let materiaisLimpeza = new Arvore("Materiais de Limpeza", 110, materiais, [], 0);

    materiais.filhos.push(materiasEscritorio);
    materiais.filhos.push(materiaisLimpeza);

    arvores.push(despesasAdministrativas);
    arvores.push(gastosPessoal);
    arvores.push(manutençãoLimpeza);
    arvores.push(materiais);

    for (let i = 0; i < arvores.length; i++) {
      this.criarFilho(arvores[i]);
    }

    console.log(this.raiz);
  }

  /**
   * Cria o array que irá exibir, com o pai raiz e todos os filhos
   * Já contando as tabulações com o método contaTabulacoes
   *
   * @param {Arvore} pai   [description]
   * @param {string} idPai [description]
   */
  private exibir(pai: Arvore, idPai: string): void {

    let tabu = "";

    if (pai.pai) {
      idPai += pai.pai.id + ".";

      tabu = this.contaTabulacoes(pai.pai, "\t");
    }

    this.exibicao.push({e: tabu + idPai + pai.id + " - " + pai.nome + " = " + pai.valor, pai: pai});

    if (pai.filhos) {
      for (let f of pai.filhos) {
        this.exibir(f, idPai);
      }
    }
  }

  /**
   * Conta quantas tabulações precisa para esse 'galho'
   * @param  {Arvore} pai  [description]
   * @param  {string} tabu [description]
   * @return {string}      [description]
   */
  private contaTabulacoes(pai: Arvore, tabu: string): string {
    if (pai.pai) {
       return this.contaTabulacoes(pai.pai, tabu + '\t');
    } else {
      return tabu;
    }
  }

  private calculaValor(filho: Arvore): void {
    if (filho.pai) {
      filho.pai.valor = 0;
      for (let f of filho.pai.filhos) {
        filho.pai.valor += f.valor;
      }

      this.calculaValor(filho.pai);
    }
  }

  /**
   * Recebe o novo filho
   * E adiciona o no pai
   * Refaz a exibição
   * Retorna a arvore adicionada
   *
   * @param  {Arvore} event [description]
   * @param  {number} id    [description]
   * @return {Arvore}       [description]
   */
  criarFilho(event: Arvore, id?: number): Arvore {

    let bol = !id && id !== 0;

    if (bol) {
      id = event.pai.filhos.length;
    }

    let arvore = new Arvore(event.nome, event.valor, event.pai, event.filhos, id + 1);

    if (!arvore.filhos) {
      arvore.filhos = [];
    } else {
      for (let i = 0; i < arvore.filhos.length; i++) {
        arvore.filhos[i].pai = arvore;
        arvore.filhos[i] = this.criarFilho(arvore.filhos[i], i);
      }
    }

    if (bol) {
      event.pai.filhos.push(arvore);
    }

    this.calculaValor(arvore);

    this.exibicao = [];
    this.exibir(this.raiz, "");

    return arvore;
  }

  /**
   * Diz para o component NovoFilhoComponent quem é o pai selecionado
   * @param {Arvore} pai [description]
   */
  selectPai(pai: Arvore): void {
    this.pai = pai;
  }

}
