const EUR = new Intl.NumberFormat("ro-RO", { style: "currency", currency: "EUR", minimumFractionDigits: 2 });
export const eur = (n: number) => EUR.format(n);
