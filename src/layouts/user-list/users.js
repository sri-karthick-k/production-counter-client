import { useState, useEffect } from 'react';
import config from 'config';
import DataComponent from './dataComponent';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';


const Users = () => {

    const [users, setUsers] = useState([])
    const uid = localStorage.getItem("uid");
    const [loading, setLoading] = useState(true)

    // data
    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(`${config.server.hostname}:${config.server.port}${config.apiKeys.getUserOfSupervisor}`, {
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
                    setUsers(data)
                    setLoading(false)
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
                        <TableCell style={{ width: '30%' }}><b>User name</b></TableCell>
                        <TableCell align="right" style={{ width: '30%' }}><b>Email</b></TableCell>
                        <TableCell align="right" style={{ width: '20%' }}><b>Mobile</b></TableCell>
                    </TableRow>
                </TableBody>
                <TableBody>
                    {
                        loading ? (
                            <TableRow>
                                <TableCell colSpan={6}>Loading...</TableCell> 
                            </TableRow>
                        ) : users.length <= 0 ? (
                            <TableRow>
                                <TableCell colSpan={6}>No users available/added</TableCell>
                            </TableRow>
                        ) : (
                            users.map((user, index) => (
                                <DataComponent data={user} key={user.uid} />
                            ))
                        )
                    }

                </TableBody>
            </Table>
        </TableContainer>
    )
}


export default Users;