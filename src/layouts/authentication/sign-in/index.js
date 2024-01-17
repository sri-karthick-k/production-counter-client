// react components
import { useState } from "react";

// react-router-dom components
import { Navigate } from 'react-router-dom';

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Import Config
import config from "config";
function Basic() {
  
  const [uname, setUname] = useState('');
  const [pass, setPass] = useState('');
  
  // handles form filling ------------------------------
  const loginSubmit = async ()=>{
    
    console.log(uname,pass)
    try {
        const dataToSend = {
          email: uname,
          password: pass
        };
        
        // Make a POST request to your Express backend
        const response = await fetch(`${config.server.hostname}:${config.server.port}${config.apiKeys.login}`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json', 
            },
            body: JSON.stringify(dataToSend),
        });
  
        // Handle the response from the backend
        if (response.ok) {
            const data = await response.json();
            const auth_response = await fetch(`${config.server.hostname}:${config.server.port}${config.apiKeys.authenticate}`, {
                method: "GET",
                headers: {
                    "Authorization": `${data.token}`
                }                
                })
                if (auth_response.ok) {
                    const auth_data = await auth_response.json();
                    if (auth_data.message){
                        localStorage.setItem('token', data.token)
                        localStorage.setItem('uid', data.uid)
                        localStorage.setItem('role', data.type)
                        window.location.href = "/dashboard"
                    }
                  } else {
                    console.error(`HTTP error! Status: ${response.status}`);
                  }
        } else {
            console.error('Error:', response.statusText);
        }
      } catch (error) {
        // Handle errors
        console.error('Error:', error.message);
      }
    }
    // -------------------------------------------------


    // Checks Authentication ---------------------------
    const isAuthenticated = () => {
      const token = localStorage.getItem("token");
      return token !== null && token !== undefined;
    };
    // -------------------------------------------------

    if(isAuthenticated()) {
      return <Navigate to='/get-devices'/>
    } else{
      return (
        <BasicLayout>
          <Card>
            <MDBox
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
              mx={2}
              mt={-3}
              p={2}
              mb={1}
              textAlign="center"
            >
              <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                Welcome
              </MDTypography>
            </MDBox>
            <MDBox pt={4} pb={3} px={3}>
              <MDBox component="form" role="form">
                <MDBox mb={2}>
                  <MDInput type="email" label="Email" value={uname} fullWidth onChange={(e)=>{setUname(e.target.value)}} />
                </MDBox>
                <MDBox mb={2}>
                  <MDInput type="password" label="Password" fullWidth value={pass} onChange={(e)=>{setPass(e.target.value)}}/>
                </MDBox>
                <MDBox mt={4} mb={1}>
                  <MDButton variant="gradient" color="info" fullWidth onClick={loginSubmit}>
                    Sign in
                  </MDButton>
                </MDBox>
              </MDBox>
            </MDBox>
          </Card>
        </BasicLayout>
      );
    }
}

export default Basic;
