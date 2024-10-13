import React from "react";
import Graph from "../graph";
import { useFetch } from "../../hooks/use-fetch";
import { detailsUrl } from "../../config";
import { Skeleton } from "antd";
import { useNotify } from "../../hooks/use-notify";
import { useNavigate } from "react-router-dom";

export interface DetailsProps {
  detailsData: TableData | undefined;
  errorResponse: Error | null;
}

const Details: React.FC<DetailsProps> = ({ detailsData, errorResponse }) => {
  const notify = useNotify();
  const navigate = useNavigate();
  const { data, isLoading, error } = useFetch<GraphDataResponse>(
    detailsUrl + `${detailsData?.id}/history?interval=d1`
  );

  if (errorResponse) {
    notify.error("Unable to render details!");
    setTimeout(() => {
      navigate("/");
    }, 2000);
    return;
  }

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 20 }} className="p-10 h-full" />;
  }

  return (
    <div className="p-10">
      <div>
        <div className="text-white font-bold text-xl">{detailsData?.name}</div>
      </div>
      <div>
        <Graph data={data?.data} error={error} />
      </div>
    </div>
  );
};

export default Details;
