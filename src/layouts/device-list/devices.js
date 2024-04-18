import { useState, useEffect } from 'react';
import config from 'config';
import DataComponent from './dataComponent';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';


const Devices = () => {

    const [devices, setDevices] = useState([]);
    const uid = localStorage.getItem("uid");

    // data
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`${config.server.hostname}:${config.server.port}${config.apiKeys.getDevices}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'user_id': uid
                    }
                });

                const data = await response.json();

                if (response.status === 401) {
                    // alert(data['error'])
                }
                if (response.status === 500) {
                    // alert(data['error'])
                }
                if (response.status === 200) {
                    setDevices(data)
                }
            } catch {
                alert('FrontEnd Error')
            }

        }
        getData()
    }, [uid])



    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650, tableLayout: 'fixed' }} aria-label="device table">
                <TableBody>
                    <TableRow>
                        <TableCell style={{ width: '30%' }}><b>Device name</b></TableCell>
                        <TableCell align="right" style={{ width: '30%' }}><b>Device ID</b></TableCell>
                        <TableCell align="right" style={{ width: '20%' }}><b>Target</b></TableCell>
                        <TableCell align="right" style={{ width: '20%' }}><b>Device Manager</b></TableCell>
                        <TableCell align="right" style={{ width: '20%' }}><b>Delete</b></TableCell>
                    </TableRow>
                </TableBody>
                <TableBody>
                    {devices.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={2}>Loading...</TableCell>
                        </TableRow>
                    ) : (
                        devices.map((device, index) => (
                            <DataComponent data={device} key={device.device_id} />
                        ))
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}


export default Devices