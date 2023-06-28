import React, { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import pazuzuTransparentImage from "../assets/pazuzuTransparent.png";
import { Bar, Chart } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

function Draculanalytics() {
  const {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn
  } = useAuth();
  console.log(authUser);
  console.log(isLoggedIn);

  const [worblinHistory, setWorblinHistory] = useState([]);

  useEffect(() => {
    // Fetch user's Worblin history when the component mounts
    fetchUserWorblinHistory();
  }, []);

  const fetchUserWorblinHistory = async () => {
    try {
      const response = await fetch(`/user-worblins/${authUser.id}`);
      if (response.ok) {
        const userWorblins = await response.json();
        console.log(userWorblins);
        setWorblinHistory(userWorblins);
      } else {
        console.error('Failed to fetch user Worblin history');
      }
    } catch (error) {
      console.error('Error fetching user Worblin history:', error);
    }
  };

  // Extract the scores from the worblin history
  const scores = worblinHistory.map((worblin) => worblin.guesses);

  // Count the occurrences of each score
  const scoreCounts = [0, 0, 0, 0, 0, 0];
  scores.forEach((score) => {
    if (score >= 0 && score <= 5) {
      scoreCounts[score]++;
    }
  });

  // Chart data
  const chartData = {
    labels: ['0', '1', '2', '3', '4', '5'],
    datasets: [
      {
        label: 'Score Distribution',
        data: scoreCounts,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Chart options
  const chartOptions = {
    scales: {
      x: {
        type: 'category', // Use "category" scale for x-axis
        labels: ['1', '2', '3', '4', '5', '6'],
        color: 'black',
        offset: true,
      },
      y: {
        beginAtZero: true,
        max: Math.max(...scoreCounts) + 1,
      },
    },
  };

  return (
    <div className='bodyDiv'>
      <div className="grid1">
        <div className='box2'>Count Draculanalytics says:</div>
      </div>  
      <div className="accountGrid">
        <div className="agDiv1">
          <div className='agDiv1Sub'>
            <div className='agDiv1SubUser'>
              <h2>Worblin History</h2>
              <Bar data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
        <div className="agDiv2">
          <div className="agDiv2Sub">
            <img src={pazuzuTransparentImage} className='accPaz4'/>  
          </div>
        </div>
      </div>
    </div>
  );
}

export default Draculanalytics;
