import React from 'react';
import { Link, useParams } from 'react-router-dom';
import dungeonWallImage from '../assets/dungeonWall.png';


const Terror = () => {
  const { id } = useParams();

  return (
    <div className="bodyDiv">
      <div className="grid1">
        <div className="box1">
          <div className="box1box">
            <div className="box1a"><h1>box1a</h1></div>
            <div className="box1b">Goblify</div>  
            <div className="box1c"><h1>box1c</h1></div>
          </div>
        </div>
      <div className="box2">Box 2</div>
    </div>  
    <div className="mainColumns">
      <div className="mainColumn1">
        <div className="gridDiv">
          <div className="grid2">
            <h1 className="terror4041">404 - Page Not Found</h1>
            <h2 className="terror4042">The page you are looking for does not exist.</h2>
            < Link to="/tomb" className="terrorTombLink">
                <div className='goBackDiv'>Go Back!</div>
            </Link>
          </div>
        </div>
      </div>
        <div className="mainColumn2">
          <div className="mc2Div">
            <img src="../assets/pazuzuTransparent.png" className="tombPaz1" alt="Pazuzuz's gotta secret!" />
          </div>
        </div>
      </div>
    </div>
  )
};
                                
export default Terror;