import React from 'react';
import { Link } from 'react-router-dom';
// import dungeonWallImage from '../assets/dungeonWall.png';
import pazuzuTransparentImage from "../assets/pazuzuTransparent.png"


function Terror() {
  return (
    <div className='bodyDiv'>
        <div className="grid1">
            <div className="box1">
                <div className="box1box">
                    <div className="box1a"><h1></h1></div>
                    <div className="box1b">Goblify</div>  
                    <div className="box1c"><h1></h1></div>
                </div>
            </div>
            <div className='box2'>P L E A S E  S T O P !!</div>
        </div>  
        <div className="accountGrid">
            <div className="agDiv1">
              <div className='agDiv1Sub'>
                <h1 className="terror4041">404 - Page Not Found</h1>
                <h2 className="terror4042">The page you are looking for does not exist.</h2>
                < Link to="/tomb" className="terrorTombLink">
                    <div className='goBackDiv'>Go Back!</div>
                </Link>
              </div>
            </div>
            <div className="agDiv2"><div className="agDiv2Sub">
              {/* <img src={pazuzuTransparentImage} className='accPaz3'/>   */}
              {/* <img src={pazuzuTransparentImage} className='accPaz2'/>   */}
              <img src={pazuzuTransparentImage} className='accPaz1'/>  
            </div></div>
        </div>
    </div>
  )
};
                                
export default Terror;