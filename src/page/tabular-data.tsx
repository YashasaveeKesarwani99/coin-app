// page in which data will be rendered

import * as _ from "lodash";
import { useRecoilState } from "recoil";
import { pageNumberState } from "../store";
import { useQueryClient } from "react-query";
import { useFetch } from "../hooks/use-fetch";
import { useEffect, useRef, useState } from "react";
import { getCommaSeparatedIds } from "../utils/get-comma-separated-ids";
import { url, webSocketUrl } from "../config";
import { handleWebSocketMessage } from "../utils/handle-web-socket-message";
import TableComponent from "../components/table-component";
import { useNotify } from "../hooks/use-notify";

const TabularData = () => {
  const notify = useNotify();
  const [ids, setIds] = useState(""); // updating ids of coins
  const queryClient = useQueryClient(); // for manipulating data
  const wsRef = useRef<WebSocket | null>(null); // ref for storing context of the current web socket
  const [pageNumber, setPageNumber] = useRecoilState(pageNumberState); // global state to hold page number
  const { data, isLoading, error } = useFetch<TableDataResponse>(
    url,
    pageNumber
  ); // custom hook to fetch and cache data using react-query

  // handling data error
  if (error) {
    notify.error("Unable to load the data!");
    return;
  }

  // creating coin list ids as soon as we fetch data
  useEffect(() => {
    if (data && !ids) {
      let ids = getCommaSeparatedIds(data.data);
      setIds(ids);
    }
  }, [data]);

  // handling the subscription of web socket
  useEffect(() => {
    if (ids) {
      if (!wsRef.current) {
        wsRef.current = new WebSocket(webSocketUrl + ids); // storing the reference of web socket to prevent re-render of the component when state reloads
        wsRef.current.onmessage = (event) => {
          const response: UpdatedResponse = JSON.parse(event.data);
          handleWebSocketMessage(response, data, queryClient, url, pageNumber); // updating data on receiving a message
        };

        wsRef.current.onclose = () => {
          wsRef.current = null; // Clear reference when closed
        };
      }
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
    };
  }, [ids]);

  useEffect(() => {
    setIds("");
  }, [pageNumber]);

  return (
    <TableComponent
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      data={data}
      isLoading={isLoading}
    />
  );
};

export default TabularData;
