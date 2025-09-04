export const formatter = (amount: number) => new Intl.NumberFormat('es-ES', {
	style: 'currency',
	currency: 'EUR',
}).format(amount/100);
  