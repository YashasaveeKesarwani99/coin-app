// converts long unreadable market cap amount to a readable format

export const formatMarketCap = (value: number): string => {
  let formattedValue = "";

  if (value >= 1_000_000_000) {
    formattedValue = `$${(value / 1_000_000_000).toFixed(2)}b`;
  } else if (value >= 1_000_000) {
    formattedValue = `$${(value / 1_000_000).toFixed(2)}m`;
  } else if (value >= 1_000) {
    formattedValue = `$${(value / 1_000).toFixed(2)}k`;
  } else {
    formattedValue = `$${value.toFixed(2)}`;
  }

  return formattedValue;
};
