export const getCommaSeparatedIds = (data: TableData[]) => {
  return data.map((item) => item.id).join(",");
};
