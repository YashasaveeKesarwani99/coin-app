export interface PriceData {
  priceUsd: string;
  time: number;
  circulatingSupply: string;
  date: string;
}

const last30DaysData = (
  data: PriceData[] | undefined
): PriceData[] | undefined => {
  const currentDate = new Date();

  // timestamp for 30 days ago
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(currentDate.getDate() - 30);

  return data?.filter((item) => {
    const itemDate = new Date(item.date);
    // keeping items that lie in the range
    return itemDate >= thirtyDaysAgo && itemDate <= currentDate;
  });
};

export const formatPriceData = (
  data: PriceData[] | undefined
): { date: string[] | undefined; price: string[] | undefined } => {
  const result = {
    date: [] as string[],
    price: [] as string[],
  };
  const res = last30DaysData(data);
  res?.forEach((item) => {
    // Converting date in DD-MM-YYYY format
    const dateObj = new Date(item.date);
    const formattedDate = dateObj.toLocaleDateString("en-GB"); // DD-MM-YYYY format

    // Fixing price to 2 decimal place
    const formattedPrice = parseFloat(item.priceUsd).toFixed(2);

    result.date.push(formattedDate);
    result.price.push(formattedPrice);
  });

  return result;
};
