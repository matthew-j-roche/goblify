import { useEffect, useState } from 'react'
import WorblinGame from './Worblin/WorblinGame'
import './worblin.css'
import pazuzuTransparentImage from "../assets/pazuzuTransparent.png"

function Worblin() {
    const [solution, setSolution] = useState(null)
    const [title, setTitle] = useState(null)
    // today = date.today().day
    const today = new Date().getDate()
  
    useEffect(() => {
        fetch('http://localhost:4000/worblins')
            .then(res => res.json())
            .then(json => {
            // random int between 0 & 14
                const todayWorblin = json.find(w => w.id === today)
                console.log(todayWorblin)
                setSolution(todayWorblin.word)
                setTitle(todayWorblin.title)
            })
        }, [])

    return (
        <div className='bodyDiv'>
            <div className="grid1">
                <div className="box1">
                    <div className="box1box">
                        <div className="box1a"><h1>box1a</h1></div>
                        <div className="box1b">Worblin</div>  
                        <div className="box1c"><h1>box1c</h1></div>
                    </div>
                </div>
                <div className='box2'><div class="box2Worblin">today's puzzle: { title }</div></div>
            </div>  
            <div className="accountGrid">
                <div className="agDiv1"><div className='agDiv1Sub'>
                    <div className="worbMain">
                        {solution && <WorblinGame solution={solution} />}
                    </div>
                </div></div>
                <div className="agDiv2"><div className="agDiv2Sub">
                <img src={pazuzuTransparentImage} className='accPaz1'/>  
                <img src={pazuzuTransparentImage} className='accPaz2'/>  
                </div></div>
            </div>
        </div>
    )
}

export default Worblin;
