
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Report from "layouts/report";
import GraphPage from "layouts/dashboard1";
import SignUp from "layouts/authentication/sign-up";
import ListDevices from "layouts/device-list";
import ListUsers from "layouts/user-list";

// @mui icons
import Icon from "@mui/material/Icon";
import SpeedIcon from '@mui/icons-material/Speed';

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/front/dashboard-graph",
    component: <GraphPage />,
  },
  {
    type: "collapse",
    name: "Gauge",
    key: "gauge",
    icon: <SpeedIcon />,
    route: "/front/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Add Devices",
    key: "tables",
    icon: <Icon fontSize="small">add_circle</Icon>,
    route: "/front/Add-Device",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Report",
    key: "Report",
    icon: <Icon fontSize="small">Report</Icon>,
    route: "/front/report",
    component: <Report />,
  },
  {
    type: "collapse",
    name: "Create User",
    key: "sign-up",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/front/create-user",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "List Devices",
    key: "list-devices",
    icon: <Icon fontSize="small">developer_board</Icon>,
    route: "/front/list-devices",
    component: <ListDevices />,
  },
  {
    type: "collapse",
    name: "List Users",
    key: "list-users",
    icon: <Icon fontSize="small">people</Icon>,
    route: "/front/list-users",
    component: <ListUsers />,
  },
];

export default routes;
