import React, { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import pazuzuTransparentImage from "../assets/pazuzuTransparent2.png";
import { Bar, Chart } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import WorblinUserData from "./WorblinUserData";
import GobxamUserData from "./GobxamUserData";
import { useNavigate } from 'react-router-dom';
import Dracquote from './Dracquote';



function Draculanalytics() {
  const {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn
  } = useAuth();
  console.log(authUser);
  console.log(isLoggedIn);
  const navigate = useNavigate();
  const [chartDestroyed, setChartDestroyed] = useState(false);

  function handleClick() {
    setChartDestroyed(true);
    navigate('/draculanalyticsII');
  }

  return (
    <div className='bodyDiv'>
      <div className="grid1">
        <div class="box1">
          <div class="box1box"><div className="box1b2">Count Draculanalytics</div></div>
        </div>
        <div className='box2'>
          <Dracquote />
        </div>
      </div>  
      <div className="accountGrid">
        <div className="agDiv1">
          <div className='agDiv1SubCol'>
          <div className="dracButtonDiv">
            <button className="dracButtonEt" >{authUser.first_name}</button>
            <button className="dracButton" onClick={handleClick}>Them</button>
            </div>
            <WorblinUserData />
            <GobxamUserData />
          </div>
        </div>
        <div className="agDiv2">
          <div className="agDiv2Sub">
            <img src={pazuzuTransparentImage} className='accPaz4'/>  
            <img src={pazuzuTransparentImage} className='accPaz4'/>  
          </div>
        </div>
      </div>
    </div>
  );
}

export default Draculanalytics;