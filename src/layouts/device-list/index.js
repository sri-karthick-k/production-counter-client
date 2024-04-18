// react components
import { Navigate } from 'react-router-dom';

// devices
import Devices from './devices';


// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";


function ListDevices() {
  

  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token !== null && token !== undefined;
  };
  if (isAuthenticated()) {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Devices/>
      </MDBox>
    </DashboardLayout>
  );
  } else {
    return <Navigate to='/front/login'/>
  }
}

export default ListDevices;
