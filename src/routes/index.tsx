// rendering pages in a defined "parent" routes
import { useRoutes } from "react-router-dom";

const AppRoutes = () => {
  const routes = [
    {
      path: "/", // the parent route
      element: <></>, // layout
      children: [
        { path: "/", element: <></> }, // table page
        { path: "/:id", element: <></> }, // detail's page
      ],
    },
  ];

  return useRoutes(routes);
};

export default AppRoutes;
