import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/use-fetch";
import { detailsUrl } from "../config";
import Details from "../components/detaills";
import { Skeleton } from "antd";

const DetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetch<DetailsResponse>(detailsUrl + id);

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 20 }} className="p-10 h-full" />;
  }

  return <Details detailsData={data?.data} errorResponse={error} />;
};

export default DetailsPage;
