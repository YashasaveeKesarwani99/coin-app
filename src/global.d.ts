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
  }

  interface TableDataResponse {
    data: tableData[];
    timestamp: number;
  }

  interface UpdatedResponse {
    [key: string]: string;
  }
}

export {};
