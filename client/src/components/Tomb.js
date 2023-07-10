import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  const k = "A kraken's tentacles, strong and vast, /Wrap around a sea serpent, holding fast. /In the depths they reside, their love untold,/ Monstrous devotion, a tale of old."

  console.log(authUser);
  console.log(isLoggedIn);

  useEffect(() => {
    fetch('/gobjokes')
        .then(res => res.json())
        .then(json => {
            const todayGobJoke = json.find(g => g.id === today)
            console.log(todayGobJoke)
            setQ(todayGobJoke.q)
            setA(todayGobJoke.a)
        })
    }, [])

    useEffect(() => {
      fetch('/worblins')
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
            <div class="box1a">???</div>
            <div class="box1b">Goblify</div>  
            <div class="box1c">?????</div>
          </div>
        </div>
        <div class="box2">Welcome back, {authUser.first_name}...
        <details className='details'>
             <summary>
               <em>{"Kraken"}</em>
             </summary>
             <em>{k}</em>
           </details>
          {/* <GobJoke /> */}
        </div>
      </div>  
      <div class="mainColumns">
        <div class="mainColumn1">
          <div class="gridDiv">
            <div class="grid2">
              <button class="box3">
                <Link to="./worblin">Today's Worblin: {title}</Link>
              </button>
              <button class="box6">
                <Link to="./cobxam">How big is your brain? Find out with today's Cobxam</Link>  
              </button>
              <button class="box7">
                <Link to="./draculanalytics">How've you been doing? Find out with Count Draculanalytics</Link>
              </button>  
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