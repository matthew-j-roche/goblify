import React, { useEffect, useState } from 'react'
import { useAuth } from '../Contexts/AuthContext';
import { Bar, Chart } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

function WorblinEtalData() {
    const {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    } = useAuth();
    console.log(authUser);
    console.log(isLoggedIn);

    const [chartDestroyed, setChartDestroyed] = useState(false);

    // function handlePieClick() {
        // setChartDestroyed(true);
    // }

    function handleTimeClick() {
        setChartDestroyed(true);
    }
    
    const [worblinHistory, setWorblinHistory] = useState([]);

    useEffect(() => {
        // Fetch user's Worblin history when the component mounts
        fetchUserWorblinHistory();
    }, []);
    
    const fetchUserWorblinHistory = async () => {
        try {
        const response = await fetch("/user-worblins");
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
    const scoreCounts = [15, 20, 10, 10, 20, 0];
    scores.forEach((score) => {
        if (score >= 0 && score <= 5) {
        scoreCounts[score]++;
        }
    });
    
    // Worblin User data
    const chartData = {
        labels: ['0', '1', '2', '3', '4', '5'],
        datasets: [
        {
            label: 'Score Distribution',
            data: scoreCounts,
            backgroundColor: '#ffb558',
        },
        ],
    };
    
    const chartOptions = {
        scales: {
        x: {
            type: 'category', 
            labels: ['1', '2', '3', '4', '5', '6'],
            color: '#ffb558',
            offset: true,
        },
        y: {
            beginAtZero: true,
            max: Math.max(...scoreCounts) + 1,
        },
        },
    };

    const averageUserWorblinScore = (scores.reduce((total, score) => total + score, 0) / scores.length).toFixed(1);
    
    return (
        <div className='agDiv1SubUser'>
            <div className="buttonDiv">
                {/* <button className='worblinButton' onClick={handlePieClick}>Pie</button> */}
                <button className='worblinButton'onClick={handleTimeClick}>Time</button>
            </div>
            <h2 className="userGameHistEt">Worblin History</h2>
            <p className="averageEt">Average user Worblin score: {averageUserWorblinScore}</p>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
}

export default WorblinEtalData;