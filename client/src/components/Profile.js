import React from 'react';
import pazuzuTransparentImage from "../assets/pazuzuTransparent.png"



function Profile() {
    return (
        <div>
            <h1>Profile</h1>
            <div>
                <img src={pazuzuTransparentImage} className="tombPaz1" alt="Pazuzu's gotta secret!" />
            </div>
        </div>
    )
}

export default Profile;