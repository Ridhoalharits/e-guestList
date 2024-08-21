import DaftarTamu from "./page/DaftarTamu/DaftarTamu";
import NewGuest from "./page/Guest/NewGuest";
import Home from "./page/Home/Home";
import { createBrowserRouter } from "react-router-dom";
import Statistic from "./page/Statistic/Statistic";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/newguest",
    element: <NewGuest />,
  },
  {
    path: "/daftartamu",
    element: <DaftarTamu />,
  },
  // {
  //   path: "/statistic",
  //   element: <Statistic />,
  // },
]);
