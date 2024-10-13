// frontend/src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const Dashboard = () => {
  const [healthData, setHealthData] = useState([]);

  useEffect(() => {
    // Fetch health data from backend API
    axios.get('/api/health-data')
      .then(response => setHealthData(response.data))
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (healthData.length > 0) {
      // Setup a chart with user health data
      const ctx = document.getElementById('healthChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: healthData.map(data => data.date),
          datasets: [{
            label: 'Heart Rate',
            data: healthData.map(data => data.heartRate),
            borderColor: 'rgba(75, 192, 192, 1)',
            fill: false
          }]
        },
        options: {
          scales: {
            x: { type: 'time', time: { unit: 'day' } },
            y: { beginAtZero: true }
          }
        }
      });
    }
  }, [healthData]);

  return (
    <div>
      <h1>Health Dashboard</h1>
      <canvas id="healthChart" width="400" height="200"></canvas>
    </div>
  );
};

export default Dashboard;
