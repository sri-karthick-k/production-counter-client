import { useState } from "react";
// @mui material components
import Card from "@mui/material/Card";
import config from "config";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";


// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";



function AddDevice() {
  let [name, setName] = useState('')
  let [max, setMax] = useState(0)
  let [devid, setDevid] = useState('')
  let [error, setError] = useState('');

  const macAddressRegex = /^[0-9A-F]{2}:[0-9A-F]{2}:[0-9A-F]{2}:[0-9A-F]{2}:[0-9A-F]{2}:[0-9A-F]{2}$/i;


  const handleDeviceIdChange = (event) => {
    const { value } = event.target;
    setDevid(value);
    setError('');
  };


  const handleSubmit = () => {
    if (!macAddressRegex.test(devid)) {
      setError('Please enter a valid MAC address before submitting.');
      return;
    }
    const handleForm = async () => {
      try {
        let adminid = localStorage.getItem('uid')
        if (!adminid) {
          window.location.href = "/login"
        } else {
          let dataToSend = {
            device_id: devid,
            name: name,
            uid: adminid,
            max_value: max
          }

          const response = await fetch(`${config.server.hostname}:${config.server.port}${config.apiKeys.addDevice}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
          });


          if (response.status === 200) {
            alert('Added')
            setDevid('')
            setMax(0)
            setName('')
          }
        }
      } catch {
        alert('Some Error From Front End')
      }
    }
    handleForm()
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card variant='outlined' style={{ minWidth: '320px', marginTop: '30px' }}>
          <MDBox variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="success" mx={2} mt={3} p={3} mb={1} textAlign="center">
            <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
              Add New Device
            </MDTypography>
          </MDBox>
          <MDBox pt={4} pb={3} px={3}>
            <MDBox component="form" role="form">
              <MDBox mb={2}>
                <MDInput type="text" label="Name" variant="standard" fullWidth value={name} onChange={(e) => setName(e.target.value)} 
                inputProps={{ maxLength: 20 }}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput type="text" label="Target" variant="standard" fullWidth value={max} onChange={(e) => {
                  const re = /^[0-9\b]+$/;
                  if (e.target.value === '' || re.test(e.target.value)) {
                    setMax(e.target.value);
                  }
                }} 
                inputProps={{ maxLength: 4 }}
                />
              </MDBox>
              <MDBox mb={2}>
                <MDInput type="text" label="Device Id (Mac Id)" variant="standard" fullWidth value={devid} onChange={handleDeviceIdChange} inputProps={{ maxLength: 17 }} />
                {error && <MDTypography variant="caption" color="error">{error}</MDTypography>}
              </MDBox>
              <MDBox mt={4} mb={1}>
                <MDButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
                  Add Device
                </MDButton>
              </MDBox>
            </MDBox>
          </MDBox>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default AddDevice;
