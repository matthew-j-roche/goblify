import React from 'react';
import { Link, useParams } from 'react-router-dom';
import dungeonWallImage from '../assets/dungeonWall.png';
import pazuzuTransparentImage from "../assets/pazuzuTransparent.png"


const About = () => {
  const { id } = useParams();

  return (
    <div className='bodyDiv'>
        <div className="grid1">
            <div className="box1">
                <div className="box1box">
                    <div className="box1aAbout"><h1>box1a</h1></div>
                    <div className="box1b">About</div>  
                    <div className="box1c"><h1>box1c</h1></div>
                </div>
            </div>
          <div className='box2'>Goblify</div>
      </div>  
        <div className="accountGrid">
          <div className="agDiv1">
            <div className="aboutContainer">
              <div className="aboutText1">
                <p>Halloween, with its origins dating back thousands of years, has always captivated people with its mystical and eerie ambiance. Rooted in ancient Celtic traditions, Halloween was initially celebrated as the festival of Samhain, marking the end of the harvest season and the beginning of winter. It was believed that on this night, the boundary between the living and the spirit world became blurred, allowing spirits and supernatural beings to roam freely. To ward off these otherworldly entities, people would dress in costumes and light bonfires, merging the realms of the living and the dead. Over time, Halloween evolved into a festive occasion celebrated worldwide, filled with playful frights, imaginative costumes, and community gatherings.</p>
                <p>In the midst of the challenges and uncertainties faced by the world today, there is a growing need for moments of escapism, enchantment, and connection. This is where a Halloween app named "Goblify" would find its significance. Goblify could serve as a digital portal, transporting individuals into a realm of virtual Halloween experiences and festivities. Through interactive games, virtual costume parties, eerie soundscapes, and augmented reality encounters with mythical creatures, Goblify could provide an immersive and entertaining escape from reality. It would allow people to engage in Halloween traditions and celebrations irrespective of physical limitations or geographical boundaries. In a world seeking solace, joy, and a sense of togetherness, Goblify could be the enchanting companion that brings the spirit of Halloween to life, offering a much-needed respite and a shared experience that transcends distances.</p>
              </div>
            </div>
          </div>
            <div className="agDiv2"><div className="agDiv2Sub">
            <img src={pazuzuTransparentImage} className='accPaz1'/>  
            <img src={pazuzuTransparentImage} className='accPaz2'/>  
          </div></div>            
        </div>
    </div>
  );
};                                

export default About;