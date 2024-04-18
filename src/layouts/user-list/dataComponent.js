import { TableCell, TableRow } from '@mui/material';

const DataComponent = ({ data }) => {

    return (
        <>
            <TableRow sx={{
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    cursor: 'pointer',
                },
            }}

            onClick={() => {
                console.log('Row clicked', data.uid);
              }}
            >
                <TableCell component="th" scope="row">
                    {data.name}
                </TableCell>
                <TableCell align="right">{data.email}</TableCell>
                <TableCell align="right">{data.mobile}</TableCell>
            </TableRow>
        </>

    )
}

export default DataComponent;
