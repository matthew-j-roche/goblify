import React, { useEffect, useState } from 'react';
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import pazuzuTransparentImage from "../assets/pazuzuTransparent4.png";
import { Bar, Chart } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto'
import WorblinEtalData from "./WorblinEtalData";
import GobxamEtalData from "./GobxamEtalData";



function DraculanalyticsII() {
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
    navigate('/draculanalytics');
  }

  return (
    <div className='bodyDiv'>
      <div className="grid1">
        <div class="box1">
          <div class="box1box"><div className="box1b2">Count Draculanalytics</div></div>
        </div>
        <div className='box2'>
          <details className='details'>
            <summary>
              <em>Why does The Count keep track of your scores?</em>
            </summary>
            <em>Remember my friend, that knowledge is stronger than memory, and we should not trust the weaker.</em>
          </details>
        </div>
      </div>  
      <div className="accountGrid">
        {/* <div className="agDiv1Et"> */}
        <div className="agDiv1">
          <div className='agDiv1SubCol'>
            <div className="dracButtonDiv">
              <button className="dracButtonEt">them</button>
              <button className="dracButton" onClick={handleClick}>{authUser.last_name}</button>
            </div>
            <WorblinEtalData />
            <GobxamEtalData />
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

export default DraculanalyticsII;