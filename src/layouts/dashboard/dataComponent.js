import GaugeComponent from 'react-gauge-component'
// import { Line } from 'rc-progress';
import config from 'config';
import { useState, useEffect } from 'react';
import { Line } from 'rc-progress';
import MDBox from 'components/MDBox';
import MDTypography from 'components/MDTypography';
import MDBadge from 'components/MDBadge';
// Data Component is the graph, the bar and the title of the Information
const DataComponent = ({data})=>{

    
    const [name,setName] = useState(data.name)
    const [max, setMax] = useState('')
    const [sensorValue, setSensorValue] = useState('')
    const [todaySensorValue, setTodaySensorValue] = useState('')

    useEffect(()=>{
        const updateVal = ()=>{
            // max value -----------------
            const getMaxValue = async (device_id)=>{
                try{
                    const response = await fetch(`${config.server.hostname}:${config.server.port}${config.apiKeys.getMax}`, {
                        method: 'GET',
                        headers: {
                        'Content-Type': 'application/json',
                        'device_id': device_id
                        }
                    });
            
                    const data1 = await response.json();
                    if(response.status===200){
                        setMax(data1.max_value)
                    } else if(response.status===404){
                        // alert(data1['error'])
                        setMax(0)
                    } else{
                        // alert(data1['error'])
                        setMax(0)
                    }
                    
            
                } catch(e){
                    console.error(e)
                }
            }
            getMaxValue(data.device_id)
            // ---------------------------
            // get sensor value -----------
            const getSensorValue = async (device_id)=>{
                try{
                    const response = await fetch(`${config.server.hostname}:${config.server.port}${config.apiKeys.getSensorValue}`, {
                        method: 'GET',
                        headers: {
                        'Content-Type': 'application/json',
                        'device_id': device_id
                        }
                    });
            
                    const data2 = await response.json();
                    
                    if(response.status===200){
                        setSensorValue(data2['device_id'])
                    } else if(response.status===404){
                        // alert(data2['error'])
                        setSensorValue(0)
                    } else{
                        // alert(data2['error'])
                        setSensorValue(0)
                    }
            
                } catch{
                    alert('FrontEnd Error')
                }
            }
            getSensorValue(data.device_id)
            // -------------
            // Today Sensor Value -----------
            const todaySensorValue = async (device_id)=>{
                try{
                    const response = await fetch(`${config.server.hostname}:${config.server.port}${config.apiKeys.getCurrentDaySensorValue}`, {
                        method: 'GET',
                        headers: {
                        'Content-Type': 'application/json',
                        'device_id': device_id
                        }
                    });
            
                    const data3 = await response.json();
                    // console.log(data3)
                    if(response.status===200){
                        setTodaySensorValue(data3['currentDayValue'])
                    } else if(response.status===404){
                        setTodaySensorValue(0)
                    } else{
                        setTodaySensorValue(0)
                    }
            
                } catch{
                    alert('FrontEnd Error')
                }
            }
            todaySensorValue(data.device_id)
        }

        setInterval(updateVal, 2000);
    },[])
    
    const handleName = ()=>{
        
        let changeName = prompt('Enter New Name')
        if(changeName){
            const putData = async ()=>{
                try{
                    const response = await fetch(`${config.server.hostname}:${config.server.port}${config.apiKeys.deviceName}`, {
                        method: 'PUT',
                        headers: {
                        'Content-Type': 'application/json',
                        'device_id': data.device_id,
                        'new_name': changeName
                        }
                    });

                    console.log(data.device_id)
            
                    if (response.status===200){
                        setName(changeName)
                    } else{
                        alert('Something Went Wrong')
                    }
                } catch{
                    alert('FrontEnd Error')
                }
            }
            putData()
        }            
    }

    const handleTarget = ()=>{
        const putData = async ()=>{
            let targetVal = prompt('Enter New Target')
            if(targetVal){
                if(!isNaN(Number(targetVal))) {
                    try{
                        const response = await fetch(`${config.server.hostname}:${config.server.port}${config.apiKeys.getMax}`, {
                            method: 'PUT',
                            headers: {
                            'Content-Type': 'application/json',
                            'device_id': data.device_id,
                            'max_value': Number(targetVal)
                            }
                        });
                
                        if (response.status===200){
                            setMax(Number(targetVal))
                        } else{
                            // alert('Something Went Wrong')
                        }
                    } catch{
                        alert('FrontEnd Error')
                    }
                } else {
                    alert('Must Be A Number !')
                }
            }
        }
        putData()
    }


    return(
        <div style={{width:280}}>
        <div style = {{padding: '0.5rem',
            boxShadow: '0 0.25rem 0.5rem rgba(0, 0, 0, 0.3)',
            borderRadius: '0.375rem',
            margin: '0.5rem',}}>
                <MDBox 
                variant="gradient"
                bgColor="primary"
                borderRadius="lg"
                coloredShadow="primary"
                py={1}
                mb={1}
                textAlign="center"
                >
                    <MDTypography color='white' textTransform='capitalize'>{name}</MDTypography>
                </MDBox>
            
            <GaugeComponent
            type="semicircle"
            value={sensorValue.count?((sensorValue.count/max)*100):(0)}
            arc={{
                nbSubArcs: 3,
                colorArray: ['#5BE12C', '#F5CD19', '#EA4228'],
                width: 0.2,
                padding: 0.0001
              }}
            labels={{
                valueLabel:{
                    formatTextValue:(e)=> ``,
            },
                tickLabels: {
                type: 'outer',
                ticks: [{value:50}],
                defaultTickValueConfig:{
                    formatTextValue: (value) => `${value}`,
                },
                }
            }}
            pointer={{
                type:'needle',
                width:15,
                }}
            />
            <MDTypography>
                Total Progress: {`${sensorValue.count?(Math.round((sensorValue.count/max)*1000))/10:(0)} %`}
            </MDTypography>
            <div style={{position:'relative'}}>
                <Line 
                percent={(sensorValue.count/max)*100}
                strokeWidth={8}
                trailWidth={8}
                trailColor={'#aaaaaa'}
                strokeColor={'#DF2869'}
                />
                <div style={{position:'absolute',top: '50%',left: '50%',transform: 'translate(-50%, -58%)'}}>
                <MDTypography fontWeight='bold'>{sensorValue.count}/{max}</MDTypography>
                </div>
            </div>
            <MDBox>
                <MDTypography>
                    Today's count: {todaySensorValue}
                </MDTypography>
                <MDTypography>
                    Target: {max}
                </MDTypography>
                <MDTypography variant='body2'>
                    Mac Address: {data.device_id}
                </MDTypography>
            </MDBox>
            <MDBox>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr'}}>
                <div style={{cursor: 'pointer'}} onClick={handleName}><MDBadge badgeContent="Change Name" size="md" container color='warning'/></div>
                <div style={{cursor: 'pointer'}} onClick={handleTarget}><MDBadge badgeContent="Change Target" size="md" container /></div>
                </div>
            </MDBox>
        </div>
        </div>
    )
}

export default DataComponent;