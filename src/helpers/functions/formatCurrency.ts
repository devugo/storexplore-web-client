import { CURRENCY } from '../../constants';

export const formatCurrency = (currency: number | string): string =>
  CURRENCY +
  Number(currency)
    ?.toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
