import { useEffect, useState } from 'react'
import WorblinGame from './Worblin/WorblinGame'
import './worblin.css'

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
            <div class="bodyDiv">
                <div class="grid1">
                    <div class="box1">
                        <div class="box1box">
                            <div class="box1a"><h1></h1></div>
                            <div class="box1b">Worblin</div>  
                            <div class="box1c"></div>
                        </div>
                    </div>
                    <div class="box2Worblin">today's puzzle: { title }</div>
                </div>  
                <div className="worbMain">
                    {solution && <WorblinGame solution={solution} />}
                </div>
            </div>
        )
        }

export default Worblin;
