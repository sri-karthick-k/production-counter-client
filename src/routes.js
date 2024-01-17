
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Report from "layouts/report";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
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
];

export default routes;
