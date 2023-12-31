import React from 'react';
import { Link, useParams } from 'react-router-dom';
// import dungeonWallImage from '../assets/dungeonWall.png';
import pazuzuTransparentImage from "../assets/pazuzuTransparent.png"
import { useAuth } from '../Contexts/AuthContext';


function Terror() {
  const { id } = useParams();
  // const {
    // authUser,
    // setAuthUser,
    // isLoggedIn,
    // setIsLogged
  // } = useAuth()
  // console.log(authUser);
  // console.log(isLoggedIn);

  return (
    <div className='bodyDiv'>
        <div className="grid1">
            <div className="box1">
                <div className="box1box">
                    <div className="box1a"><h1></h1></div>
                    <div className="box1b">Goodblifye</div>  
                    <div className="box1c"><h1></h1></div>
                </div>
            </div>
            <div className='box2'>P L E A S E  S T O P !!  D O N " T G O ! </div>
        </div>  
        <div className="accountGrid">
            <div className="agDiv1"><div className='agDiv1Sub'>
              <h1 className="terror4041"></h1>
              <h2 className="terror4042"></h2>
              < Link to="/tomb" className="terrorTombLink">
                  <div className='goBackDiv'></div>
              </Link>
            </div></div>
            <div className="agDiv2"><div className="agDiv2Sub">
              <img src={pazuzuTransparentImage} className='accPaz1'/>  
              <img src={pazuzuTransparentImage} className='accPaz2'/>  
            </div></div>
        </div>
    </div>
  )
};
                                
export default Terror;