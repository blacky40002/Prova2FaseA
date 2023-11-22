interface IProdotto {
  idProdotto: number;
  nome: string;
  descrizione?: string;
  prezzo: number;
  giacenza: number;
  quantitaMinimaOrdine: number;
  categoria?: string;
}
