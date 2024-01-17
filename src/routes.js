
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";

import SignUp from "layouts/authentication/sign-up";
import Report from "layouts/report";
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
    route: "/front/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
<<<<<<< Updated upstream
    name: "Billing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },{
    type: "collapse",
    name: "Report",
    key: "Report",
    icon: <Icon fontSize="small">Report</Icon>,
    route: "/report",
    component: <Report />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
=======
    name: "Create User",
>>>>>>> Stashed changes
    key: "sign-up",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/front/create-user",
    component: <SignUp />,
  },
];

export default routes;
