import React, { useState, useEffect } from 'react';
import GobJoke from './GobJoke';
import './index.css';
import pazuzuTransparentImage from "../assets/pazuzuTransparent.png"
import { useAuth } from '../Contexts/AuthContext';


function Tomb() {
  const [solution, setSolution] = useState(null)
  const [title, setTitle] = useState(null)
  const [q, setQ] = useState(null)
  const [a, setA] = useState(null)
  const {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn
  } = useAuth()

  const today = new Date().getDate()

  console.log(authUser);
  console.log(isLoggedIn);

  useEffect(() => {
    fetch('http://localhost:4000/gobjokes')
        .then(res => res.json())
        .then(json => {
            const todayGobJoke = json.find(g => g.id === today)
            console.log(todayGobJoke)
            setQ(todayGobJoke.q)
            setA(todayGobJoke.a)
        })
    }, [])

    useEffect(() => {
      fetch('http://localhost:4000/worblins')
          .then(res => res.json())
          .then(json => {
              const todayWorblin = json.find(w => w.id === today)
              console.log(todayWorblin)
              setSolution(todayWorblin.word)
              setTitle(todayWorblin.title)
          })
      }, [])

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
        <div class="box2">Welcome back, {authUser.first_name}...
        <details className='details'>
             <summary>
               <em>{q}</em>
             </summary>
             <em>{a}</em>
           </details>
          {/* <GobJoke /> */}
        </div>
      </div>  
      <div class="mainColumns">
        <div class="mainColumn1">
          <div class="gridDiv">
            <div class="grid2">
              <div class="box box3">Today's Worblin: {title}</div>  
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