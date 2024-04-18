import { useState, useEffect } from 'react';
import config from 'config';
import DataComponent from './dataComponent';
import Loader from 'components/Loading/Loading';

const Devices = () => {

    const [devices, setDevices] = useState([]);
    const uid = localStorage.getItem("uid");
    const [loading, setLoading] = useState(true)

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
                    setLoading(false)
                }
                if (response.status === 500) {
                    // alert(data['error'])
                }
                if (response.status === 200) {
                    setDevices(data)
                    setLoading(false)
                }
            } catch {
                alert('FrontEnd Error')
            }

        }
        getData()
    }, [uid])



    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
            {
                loading
                    ?
                    (<Loader />) :

                    devices.length <= 0 ? (<h1>No device found</h1>) : (
                        <>
                            {devices.map((val, id) => {
                                return <DataComponent data={val} key={id} />
                            })}
                        </>
                    )
            }
        </div>
    )
}


export default Devices