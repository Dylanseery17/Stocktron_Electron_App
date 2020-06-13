import React from 'react'
import {Line} from 'react-chartjs-2';

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Stock price',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: '#9b4dca',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: '#9b4dca',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#9b4dca',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
};
const options={
    legend: {
        display: false,
    },
}
  
const Chart = () => {
    
    // Get a date object for the current time
    var d = new Date();

    // Set it to one month ago
    d.setMonth(d.getMonth() - 1);

    // Zero the hours
    d.setHours(0, 0, 0);

    // Zero the milliseconds
    d.setMilliseconds(0);

    // Get the time value in milliseconds and convert to seconds
    console.log(d/1000|0);
    var d = new Date();
    console.log(d/1000|0);

    return (
        <div style={{marginTop:'50px'}}>
            <h3>Chart</h3>
            <Line
            height='125'
            data={data}
            options={options}
            />
        </div>
    )
}

export default Chart
