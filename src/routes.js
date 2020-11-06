/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
// core components/views for Admin layout
import NewsPage from "views/News/News.js";
import TableList from "views/TableList/TableList.js";

const dashboardRoutes = [
  {
    path: "/news",
    name: "News",
    icon: Dashboard,
    component: NewsPage,
    layout: "/admin",
  },
  {
    path: "/table",
    name: "Table for News & Users",
    icon: "content_paste",
    component: TableList,
    layout: "/admin",
  },
];

export default dashboardRoutes;
