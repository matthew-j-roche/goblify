import React, { useState } from 'react';
import GobJoke from './GobJoke';
import './index.css';
import pazuzuTransparentImage from "../assets/pazuzuTransparent.png"


function Tomb() {

  return (
    <div class="bodyDiv">
      <div class="grid1">
        <div class="box1">
          <div class="box1box">
            <div class="box1a"><h1></h1></div>
            <div class="box1b">Goblify</div>  
            <div class="box1c">
            </div>
          </div>
        </div>
        <div class="box2">
        <details className='details'>
             <summary>
               <em>'Why don’t mummies take time off?'</em>
             </summary>
             <em>'They're afraid to unwind'</em>
           </details>
          {/* <GobJoke /> */}
        </div>
      </div>  
      <div class="mainColumns">
        <div class="mainColumn1">
          <div class="gridDiv">
            <div class="grid2">
              <div class="box box3">Worblin. 6/22: "Shhhh! Satan's Sleeping in the Next Room..."</div>  
              <div class="box box5">5</div>  
              <div class="box box6">Box 6</div>  
              <div class="box box7">Box 7</div>  
              <div class="box box8">8</div>  
              <div class="box box9">Box 9</div>  
              {/* <div class="box box10">Box 10</div>   */}
              {/* <div class="box box11">11</div>   */}
            </div>
          </div>
        </div>
        <div class="mainColumn2">
          <div class="mc2Div">
            <img src={pazuzuTransparentImage} className="tombPaz1" alt="Pazuzu's gotta secret!" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tomb;