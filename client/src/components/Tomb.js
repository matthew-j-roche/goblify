import React, { useState } from 'react';
import GobJoke from './GobJoke';
import './index.css';
import pazuzuTransparentImage from "../assets/pazuzuTransparent.png"


function Tomb({ username }) {

  return (
    <div className="bodyDiv">
      <div className="grid1">
        <div className="box1">
          <div className="box1box">
            <div className="box1a"><h1></h1></div>
            <div className="box1b">Goblify</div>  
            <div className="box1c">
            </div>
          </div>
        </div>
        <div className="box2">
          <GobJoke />
        </div>
      </div>  
      <div className="mainColumns">
        <div className="mainColumn1">
          <div className="gridDiv">
            <div className="grid2">
              <div className="box box3">Hello {username}</div>  
              <div className="box box5">5</div>  
              <div className="box box6">Box 6</div>  
              <div className="box box7">Box 7</div>  
              <div className="box box8">8</div>  
              <div className="box box9">Box 9</div>  
              {/* <div class="box box10">Box 10</div>   */}
              {/* <div class="box box11">11</div>   */}
            </div>
          </div>
        </div>
        <div className="mainColumn2">
          <div className="mc2Div">
            <img src={pazuzuTransparentImage} className="tombPaz1" alt="Pazuzu's gotta secret!" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tomb;