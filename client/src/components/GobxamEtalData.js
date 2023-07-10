import React, { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Bar, Chart } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'

function GobxamEtalData() {
    const {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    } = useAuth();
    console.log(authUser);
    console.log(isLoggedIn);

    const [chartDestroyed, setChartDestroyed] = useState(false);
        function handlePieClick() {
            setChartDestroyed(true);
        }
        function handleTimeClick() {
            setChartDestroyed(true);
    }

    const [gobxamHistory, setGobxamHistory] = useState([]);
    
    useEffect(() => {
        fetchUserGobxamHistory();
    }, []);
    const fetchUserGobxamHistory = async () => {
        try {
        const response = await fetch("/user-gobxams");
        if (response.ok) {
            const userGobxams = await response.json();
            console.log(userGobxams);
            setGobxamHistory(userGobxams);
        } else {
            console.error('Failed to fetch user Gobxam history');
        }
        } catch (error) {
        console.error('Error fetching user Gobxam history:', error);
        }
    };
    // Extract the scores from the gobxam history
    const scores = gobxamHistory.map((gobxam) => gobxam.score);
    // Count the occurrences of each score
    const scoreCounts = [0, 0, 0, 0, 0];
    gobxamHistory.forEach((gobxam) => {
        const score = gobxam.score;
        if (score >= 0 && score <= 20) {
            scoreCounts[score / 5]++;
        }
    });

    // Gobxam User data
    const chartData = {
    labels: ['0', '5', '10', '15', '20'],
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
        labels: ['0', '5', '10', '15', '20'],
        color: 'black',
        offset: true,
        },
        y: {
        beginAtZero: true,
        max: 35,
        },
    },
    };

    const averageUserGobxamScore = (scores.reduce((total, score) => total + score, 0) / scores.length).toFixed(2);


    return (
        <div className='agDiv1SubUserEt'>
            <div className="buttonDiv">
                <button className='worblinButton' onClick={handlePieClick}>Pie</button>
                <button className='worblinButton' onClick={handleTimeClick}>Time</button>
            </div>
            <h2 className='userGameHistEt'>Gobxam History</h2>
            <p className="averageEt">Average user Gobxam score: {averageUserGobxamScore}</p>
            <Bar data={chartData} options={chartOptions} />
        </div>
    )

}

export default GobxamEtalData;