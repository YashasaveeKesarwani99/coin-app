import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import { useEffect, useState } from "react";
import { formatPriceData } from "../../utils/format-price-data";
import { useNotify } from "../../hooks/use-notify";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
);

export interface GraphProps {
  data: GraphData[] | undefined;
  error: Error | null;
}

export interface GraphDataType {
  date: string[] | undefined;
  price: string[] | undefined;
}

const Graph: React.FC<GraphProps> = ({ data, error }) => {
  const notify = useNotify();
  const [formattedData, setFormattedData] = useState<
    GraphDataType | undefined
  >();

  if (error) {
    notify.error("Unable to render visuals!");
    return;
  }

  useEffect(() => {
    const res = formatPriceData(data);
    setFormattedData(res);
  }, [data]);

  const graphData = {
    labels: formattedData?.date,
    datasets: [
      {
        label: "Price in USD",
        data: formattedData?.price,
        fill: true,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.4)", // Background color
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div style={{ height: "420px", width: "100%" }}>
      <Line data={graphData} options={options} />
    </div>
  );
};

export default Graph;
