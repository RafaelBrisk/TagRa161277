export class Arvore {

  constructor (
    public nome: string,
    public valor: number,
    public pai: Arvore,
    public filhos: Arvore[],
    public id: number
  ) { }
}
