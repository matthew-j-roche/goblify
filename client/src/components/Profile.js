import React from 'react';
import pazuzuTransparentImage from "../assets/pazuzuTransparent.png"



function Profile() {
    return (
        <div className='bodyDiv'>
            <div className="grid1">
                <div className="box1">
                    <div className="box1box">
                        <div className="box1a"><h1>box1a</h1></div>
                        <div className="box1b">Profile</div>  
                        <div className="box1c"><h1>box1c</h1></div>
                    </div>
                </div>
                <div className='box2'>Goblify</div>
            </div>  
            <div className="accountGrid">
                <div className="agDiv1"><div className='agDiv1Sub'>
                <div className='accountForm'>ocdcsacs</div>
                </div></div>
                <div className="agDiv2"><div className="agDiv2Sub">
                <img src={pazuzuTransparentImage} className='accPaz1'/>  
                <img src={pazuzuTransparentImage} className='accPaz2'/>  
                </div></div>
            </div>
        </div>
    )
}

export default Profile;