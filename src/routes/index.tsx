// rendering pages in a defined "parent" routes
import { useRoutes } from "react-router-dom";
import AppLayout from "../layout";
import TabularData from "../page/tabular-data";
import DetailsPage from "../page/details-page";

const AppRoutes = () => {
  const routes = [
    {
      path: "/", // the parent route
      element: <AppLayout />, // layout
      children: [
        { index: true, element: <TabularData /> }, // table page
        { path: "/:id", element: <DetailsPage /> }, // detail's page
      ],
    },
  ];

  return useRoutes(routes);
};

export default AppRoutes;
