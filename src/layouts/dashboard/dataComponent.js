import GaugeComponent from 'react-gauge-component'
// import { Line } from 'rc-progress';
import config from 'config';
import { useState, useEffect } from 'react';

// Data Component is the graph, the bar and the title of the Information
const DataComponent = ({data})=>{

    const [max, setMax] = useState('')
    const [sensorValue, setSensorValue] = useState('')
    const [todaySensorValue, setTodaySensorValue] = useState('')

    useEffect(()=>{
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
            
    
        } catch{
            alert('FrontEnd Error')
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
    },[])


    return(
        <div style={{width:280}}>
        <div className='p-2 shadow rounded m-2'>
            
            <GaugeComponent
            className='d-flex'
            value={(sensorValue.count/max)*100}
            type="semicircle"
            arc={{
                nbSubArcs: 3,
                colorArray: ['#5BE12C', '#F5CD19', '#EA4228'],
                width: 0.2,
                padding: 0.0001
              }}
            labels={{
                valueLabel:{
                    formatTextValue:(e)=> `${e} %`,
                    style:{fontSize:35,fill:'rgb(47 40 45)',textShadow:'none'}
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
                type:'arrow',
                width:15,
                }}
            
            />
            
            <div className='px-3 pt-2'>
                <div className="input-group mb-1" >
                    <span className="input-group-text px-1" style={{width:'50%'}}>Max Value:</span>
                    <span className="input-group-text px-1" style={{width:'50%'}}>{max}</span>                   
                </div>
                <div className="input-group mb-1">
                    <span className="input-group-text px-1" style={{width:'50%'}}>Today's Count</span>
                    <span className="input-group-text px-1" style={{width:'50%'}}>{todaySensorValue}</span>
                </div>
                <div className="input-group mb-1" >
                    <span className="input-group-text px-1" style={{width:'50%'}}>Total Count</span>
                    <span className="input-group-text px-1" style={{width:'50%'}}>{sensorValue.count}</span>
                </div>
                <div className="input-group">
                    <span className="input-group-text px-1" style={{width:'30%'}}>Dev_Id</span>
                    <span className="input-group-text px-1" style={{width:'70%'}}>{data.device_id}</span>
                </div>
            </div>
            
        </div>
        </div>
    )
}

export default DataComponent;