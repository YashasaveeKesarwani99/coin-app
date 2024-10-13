import { Button, Skeleton, Table, TablePaginationConfig } from "antd";
import { useEffect, useState } from "react";
import { formatMarketCap } from "../../utils/format-market-cap";
import { SetterOrUpdater } from "recoil";
import { FilterValue, SorterResult } from "antd/es/table/interface";
import { HeartFilled } from "@ant-design/icons";
import useLocalStorage from "../../hooks/use-local-storage";
import { useNavigate } from "react-router-dom";

export interface TableComponentProps {
  pageNumber: number;
  setPageNumber: SetterOrUpdater<number>;
  data: TableDataResponse | undefined;
  isLoading: boolean;
}

const TableComponent: React.FC<TableComponentProps> = ({
  pageNumber,
  data,
  setPageNumber,
  isLoading,
}) => {
  const navigate = useNavigate(); // init navigation hook
  const [pagination, setPagination] = useState<TablePaginationConfig>({
    current: pageNumber + 1,
    pageSize: 10,
    total: 100,
    simple: true,
  }); // initializing pagination state
  const [sortedInfo, setSortedInfo] = useState<
    SorterResult<TableData> | SorterResult<TableData>[] | null
  >(null); // state for sorting
  const [favourites, setFavourites] = useLocalStorage(
    "favourite-currencies",
    null
  ); // using custom hook for handling change in local storage of favourite currencies
  const [key, setKey] = useState(0); // key for handling table update with change in favourite currencies

  // manipulating local storage on fav button click
  const handleFavourite = (record: TableData) => {
    let newFav = favourites;
    if (newFav) {
      if (favourites.some((ele: string) => ele === record.id)) {
        newFav = newFav.filter((ele: string) => ele !== record.id);
      } else {
        newFav.push(record.id);
      }
    } else {
      newFav = [record.id];
    }

    setFavourites(newFav);
    setKey((prevState) => prevState + 1);
  };

  // handling page redirection
  const handleCurrencyClick = (record: TableData) => {
    navigate(`/${record.id}`);
  };

  // columns for table
  const columns = [
    {
      title: "Symbol",
      dataIndex: "symbol",
      key: "symbol",
      sorter: (a: TableData, b: TableData) => a.symbol.localeCompare(b.symbol),
      sortOrder: !Array.isArray(sortedInfo)
        ? sortedInfo?.columnKey === "symbol"
          ? sortedInfo.order
          : null
        : null,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_: any, record: TableData) => (
        <Button
          type="text"
          className="text-white hover:!text-white"
          onClick={() => handleCurrencyClick(record)}
        >
          {record.name}
        </Button>
      ),
      sorter: (a: TableData, b: TableData) => a.name.localeCompare(b.name),
      sortOrder: !Array.isArray(sortedInfo)
        ? sortedInfo?.columnKey === "name"
          ? sortedInfo.order
          : null
        : null,
    },
    {
      title: "Price",
      dataIndex: "priceUsd",
      key: "priceUsd",
      render: (_: any, record: TableData) =>
        `$${Number(record.priceUsd).toFixed(2)}`,
      width: 250,
    },
    {
      title: "Market Cap (in USD)",
      dataIndex: "marketCapUsd",
      key: "marketCapUsd",
      render: (_: any, record: TableData) =>
        formatMarketCap(Number(record.marketCapUsd)),
    },
    {
      title: "",
      dataIndex: "favourites",
      key: "favourites",
      render: (_: any, record: TableData) => {
        let isFilled: string = "text-primary";
        if (favourites) {
          isFilled = favourites.some((ele: string) => ele === record.id)
            ? "green"
            : "#252525";
        } // conditionally styling favourite icon
        return (
          <Button type={"text"} onClick={() => handleFavourite(record)}>
            <HeartFilled style={{ color: isFilled }} />
          </Button>
        );
      },
    },
  ];

  // manipulating data when table synthetic event changes
  const handleTableChange = (
    newPagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<TableData> | SorterResult<TableData>[]
  ) => {
    setPagination(newPagination);
    if (newPagination?.current)
      setPageNumber((newPagination?.current - 1) * 10);

    setSortedInfo(sorter); // Update sorted info in state
    localStorage.setItem("antd-table-sorting", JSON.stringify(sorter)); // Persist sorting state in localStorage
  };

  // Fetch sorting info from localStorage on component mount
  useEffect(() => {
    const savedSortInfo = localStorage.getItem("antd-table-sorting");
    if (savedSortInfo) {
      setSortedInfo(JSON.parse(savedSortInfo));
    }
  }, []);

  if (isLoading) {
    return <Skeleton active paragraph={{ rows: 20 }} className="p-10 h-full" />;
  }
  return (
    <Table
      key={key}
      dataSource={data?.data}
      columns={columns}
      pagination={pagination}
      onChange={handleTableChange}
    />
  );
};

export default TableComponent;
