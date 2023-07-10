import React, { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Chart } from 'chart.js/auto';

function WorblinUserTimeline() {
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
    
    // Extract the scores and dates from the worblin history
    const scores = worblinHistory.map((worblin) => worblin.score);
    const dates = worblinHistory.map((worblin) => worblin.date);
    
    useEffect(() => {
        renderTimelineChart();
    }, [worblinHistory]);
    
    const renderTimelineChart = () => {
        const ctx = document.getElementById('worbTimelineChart').getContext('2d');
    
        new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates.map((date, index) => `2023-06-${worblinHistory[index].id}`),
            datasets: [
            {
                label: 'Score Timeline',
                data: scores,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.4)',
                fill: true,
            },
            ],
        },
        options: {
            scales: {
            x: {
                type: 'time',
                time: {
                unit: 'day',
                displayFormats: {
                    day: 'MMM D',
                },
                },
            },
            y: {
                beginAtZero: true,
                max: 100,
            },
            },
        },
        });
    };
    
    return (
        <div className="agDiv1SubUser">
            <div className="buttonDiv">
                <button className='worblinButton' onClick={handleBarClick}>Bar</button>
                {/* <button className='worblinButton'onClick={handleTimeClick}>Time</button> */}
            </div>
        <h2>Worblin History</h2>
        <canvas id="worbTimelineChart" width="400" height="200"></canvas>
        </div>
    );
}

export default WorblinUserTimeline;
