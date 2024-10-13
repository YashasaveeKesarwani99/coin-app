// updating data when web socket sends a message

import { QueryClient } from "react-query";

export const handleWebSocketMessage = (
  updatedData: UpdatedResponse,
  data: TableDataResponse | undefined,
  queryClient: QueryClient,
  url: string,
  pageNumber: number
) => {
  if (data) {
    queryClient.setQueryData<TableDataResponse>(
      [url, pageNumber],
      (oldData: any) => {
        let newRes = oldData?.data?.map((item: any) => ({
          ...item,
          priceUsd: updatedData.hasOwnProperty(item.id)
            ? updatedData[item.id]
            : item.priceUsd, // Update price if exists in response
        }));

        return {
          data: newRes,
          timestamp: oldData.timestamp,
        };
      }
    );
  }
};
