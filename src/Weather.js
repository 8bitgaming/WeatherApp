import React, { Component } from 'react';
import MatDataGrid from './MatDataGrid';
import Button from '@material-ui/core/button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';



export default class Weather extends Component {
    
    
    constructor(props) {
        super(props);
        this.state = {
            rows: [],
            loading: false,
            system: 'british'
        }
    }
    
        setTempMeasure = (event) => {
        this.setState({system: event.target.getAttribute('value')})
    }

    onClick = async() => {
        this.setState({
            loading: true,
            })
        const {system} = this.state
        const result = await fetch(`https://www.7timer.info/bin/civillight.php?lon=113.2&lat=23.1&ac=0&unit=${system}&output=json&tzshift=0`)
        const json = await result.json()
        const rows = json.dataseries
        rows.forEach((row) => {
            row.max = row.temp2m.max
            row.min = row.temp2m.min
        })
        //convert windspeed numbers to human readable. Future - change to switch?
        rows.forEach((row) => {
            let stringVal = row.wind10m_max
            if (stringVal === 1) {
                stringVal = '<1 mph (calm)' 
            }else if (stringVal === 2) {
                stringVal = '1-8 mph (light)'
            }else if (stringVal === 3) {
                stringVal = '8-18 mph (moderate)'
            }else if (stringVal === 4) {
                stringVal = '18-24 mph (brisk)'
            }else if (stringVal === 5) {
                stringVal = '24-38 mph (strong)'
            }else if (stringVal === 6) {
                stringVal = '38-55 mph (gale)'
            }else if (stringVal === 7) {
                stringVal = '55-73 mph (storm)'
            }else if (stringVal === 8) {
                stringVal = '>73 mph (hurricane)'
            }
            row.wind10m_max = stringVal
        })
        this.setState({
            loading: false,
            rows: rows,
        })
    }


//     rows.forEach((row) => {
//         let stringVal =
//         if (row.wind10m_max === 1) {
//             row.wind10m_max = '<1 mph (calm)' 
//         }else if (row.wind10m_max === 2) {
//             row.wind10m_max = '1-8 mph (light)'
//         }else if (row.wind10m_max === 3) {
//             row.wind10m_max = '8-18 mph (moderate)'
//         }else if (row.wind10m_max === 4) {
//             row.wind10m_max = '18-24 mph (brisk)'
//         }else if (row.wind10m_max === 5) {
//             row.wind10m_max = '24-38 mph (strong)'
//         }else if (row.wind10m_max === 6) {
//             row.wind10m_max = '38-55 mph (gale)'
//         }else if (row.wind10m_max === 7) {
//             row.wind10m_max = '55-73 mph (storm)'
//         }else if (row.wind10m_max === 8) {
//             row.wind10m_max = '>73 mph (hurricane)'
//         }
//     })
//     this.setState({
//         loading: false,
//         rows: rows,
//     })
// }

    render(){ 
        
        const {loading, rows, system} = this.state
        return (
            <>
            <Button variant='contained' color ="primary" onClick={this.onClick}>Get Forecast</Button>
            <ToggleButtonGroup
                value={system}
                exclusive
                onChange={this.setTempMeasure}
                aria-label="temperature system"
                color='primary'
                size='small'
                >
                    <ToggleButton value="british" aria-label="Fahrenheit">℉</ToggleButton>
                    <ToggleButton value="celsius" aria-label="Celsius">℃</ToggleButton>
            </ToggleButtonGroup>
            <MatDataGrid rows={rows} loading={loading}/>
            </>
            )
    }
}

