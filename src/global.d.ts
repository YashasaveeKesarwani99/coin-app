declare global {
  interface TableData {
    changePercent24Hr: string;
    explorer: string;
    id: string;
    marketCapUsd: string;
    maxSupply: string;
    name: string;
    priceUsd: string;
    rank: string;
    supply: string;
    symbol: string;
    volumeUsd24Hr: string;
    vwap24Hr: string;
    isFavourite?: boolean;
  }

  interface TableDataResponse {
    data: tableData[];
    timestamp: number;
  }

  interface UpdatedResponse {
    [key: string]: string;
  }

  interface DetailsResponse {
    data: TableData;
    timestamp: number;
  }

  interface GraphData {
    priceUsd: string;
    time: number;
    circulatingSupply: string;
    date: string;
  }

  interface GraphDataResponse {
    data: GraphData[];
    timestamp: number;
  }
}

export {};
