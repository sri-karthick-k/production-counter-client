// React Components
import { useState } from "react";

// Config
import config from "config";

// @mui material components
import Card from "@mui/material/Card";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// MUI Materials
import {RadioGroup, Radio } from "@mui/material";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/Industrial-Machinery.jpg";

function Cover() {

  let [name, setName] = useState('')
  let [mob, setMob] = useState('')
  let [email, setEmail] = useState('')
  let [passwd, setPasswd] = useState('')
  let [role, setRole] = useState('user')

  const submitHandle = async ()=>{
    // form submittion
    try{
      let adminid = localStorage.getItem('uid')
      if(!adminid){
          window.location.href = "/front/login"
      } else{
      let dataToSend = {
          name : name ,
          mobile: mob ,
          email: email ,
          password: passwd ,
          role: role,
          adminid : adminid
      }

      const response = await fetch(`${config.server.hostname}:${config.server.port}${config.apiKeys.addTenantUser}`, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json', 
          },
          body: JSON.stringify(dataToSend),
      });

      // const data = await response.json();
      
      if (response.status === 200){
        alert('User Added SuccessFully !')
        setMob('')
        setEmail('')
        setRole('user')
        setPasswd('')
        setName('')

      } else{
        alert('Some Error Encountered !')
      }
  }
  }catch{
      alert('Some Error From Front End')
  }
  }

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Create New User
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="text" label="Name" variant="standard" fullWidth value={name} onChange={(e)=>{setName(e.target.value)}}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="text" label="Mobile" variant="standard" fullWidth value={mob} onChange={(e)=>{setMob(e.target.value)}}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="email" label="Email" variant="standard" fullWidth value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Password" variant="standard" fullWidth value={passwd} onChange={(e)=>{setPasswd(e.target.value)}}/>
            </MDBox>
            <MDBox mb={2} >
            <div style={{display:'grid',gridTemplateColumns:'1fr 4fr'}}>
            <MDBox pb={1} pt={1}>
              <MDTypography variant="body3" color="text">Role:</MDTypography>
              </MDBox>
              
            <RadioGroup
              aria-label="role"
              name="role"
              defaultValue = 'user'
              value={role}
              onChange={(e)=>{setRole(e.target.value)}}
              row
            >
              <Radio value="user" size="small"/>
              <MDBox pb={1} pt={1}>
              <MDTypography color="text">User</MDTypography>
              </MDBox>
              <Radio value="manager" size="small"/>
              <MDBox pb={1} pt={1}>
              <MDTypography color="text">Manager</MDTypography>
              </MDBox>
            </RadioGroup>
            </div>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={submitHandle}>
                Create User
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
