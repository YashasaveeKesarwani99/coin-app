// rendering pages in a defined "parent" routes
import { useRoutes } from "react-router-dom";
import AppLayout from "../layout";
import TabularData from "../page/tabular-data";

const AppRoutes = () => {
  const routes = [
    {
      path: "/", // the parent route
      element: <AppLayout />, // layout
      children: [
        { index: true, element: <TabularData /> }, // table page
        { path: "/:id", element: <></> }, // detail's page
      ],
    },
  ];

  return useRoutes(routes);
};

export default AppRoutes;
