export function converterTextoMonetarioEmCentavos(texto: string): number {
  const correspondencia = texto.match(/(-?)\s*R\$\s*([\d.]+),(\d{2})/);
  if (!correspondencia) {
    throw new Error(`Não foi possível converter o valor monetário exibido: "${texto}".`);
  }

  const reais = Number(correspondencia[2].replace(/\./g, ''));
  const centavos = Number(correspondencia[3]);
  const valorEmCentavos = reais * 100 + centavos;
  return correspondencia[1] === '-' ? -valorEmCentavos : valorEmCentavos;
}
