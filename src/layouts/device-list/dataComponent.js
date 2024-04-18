import config from 'config';
import { useState, useEffect } from 'react';
import { TableCell, TableRow, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const DataComponent = ({ data }) => {


    const [max, setMax] = useState('')
    const [deviceManager, setDeviceManager] = useState('');

    useEffect(() => {
        const updateVal = () => {
            // max value -----------------
            const getMaxValue = async (device_id) => {
                try {
                    const response = await fetch(`${config.server.hostname}:${config.server.port}${config.apiKeys.getMax}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'device_id': device_id
                        }
                    });

                    const data1 = await response.json();
                    console.log(data1)
                    if (response.status === 200) {
                        setMax(data1.max_value)
                    } else if (response.status === 404) {
                        // alert(data1['error'])
                        setMax(0)
                    } else {
                        // alert(data1['error'])
                        setMax(0)
                    }


                } catch (e) {
                    console.error(e)
                }
            }
            getMaxValue(data.device_id)

            const getDeviceManager = async (device_id) => {
                try {
                    const response = await fetch(`${config.server.hostname}:${config.server.port}${config.apiKeys.deviceManager}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            'device_id': device_id
                        }
                    });

                    const deviceManagerName = await response.json();
                    console.log(deviceManagerName)
                    if (response.status === 200) {
                        setDeviceManager(deviceManagerName)
                    } else if (response.status === 404) {
                        setDeviceManager('??')
                    } else {
                        setDeviceManager('')
                    }

                } catch (e) {
                    console.log(e);
                }
            }
            getDeviceManager(data.device_id)
        }
        updateVal();
    }, [data.device_id])

    const handleDelete = (deviceId) => {
        console.log(`Delete device with ID: ${deviceId}`);
    };


    return (
        <>
            <TableRow>
                <TableCell component="th" scope="row">
                    {data.name}
                </TableCell>
                <TableCell align="right">{data.device_id}</TableCell>
                <TableCell align="right">{max}</TableCell>
                <TableCell align="right">{deviceManager}</TableCell>
                <TableCell align="right">
                    <IconButton onClick={() => handleDelete(data.device_id)}>
                        <DeleteIcon color="error"/>
                    </IconButton>
                </TableCell>
            </TableRow>
        </>

    )
}

export default DataComponent;
