import React, { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { Chart } from 'chart.js/auto';
import moment from 'moment';

function GobxamUserTimeline() {
    const {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    } = useAuth();
    console.log(authUser);
    console.log(isLoggedIn);
    const [gobxamHistory, setGobxamHistory] = useState([]);

    useEffect(() => {
        fetchUserGobxamHistory();
    }, []);

    const fetchUserGobxamHistory = async () => {
        try {
        const response = await fetch(`/user-gobxams/${authUser.id}`);
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

  // Extract the scores and dates from the gobxam history
    const scores = gobxamHistory.map((gobxam) => gobxam.score);
    const dates = gobxamHistory.map((gobxam) => gobxam.gobxam_day_of_month);
    
    useEffect(() => {
        renderTimelineChart();
    }, [gobxamHistory]);
    
    const renderTimelineChart = () => {
        const ctx = document.getElementById('gobTimelineChart').getContext('2d');
    
        new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates.map((date) => `2023-06-${date.gobxam.day_of_month}`),
            datasets: [
            {
                label: 'Score Timeline',
                data: scores,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.4)',
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
                max: 20,
            },
            },
        },
        });
    };
    
    return (
        <div className="agDiv1SubUser">
            <h2>Gobxam History</h2>
            <canvas id="gobTimelineChart" width="400" height="200"></canvas>
        </div>
    );
}

export default GobxamUserTimeline;