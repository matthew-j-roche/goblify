import { useEffect, useState } from 'react'
import WorblinGame from './Worblin/WorblinGame'
import './worblin.css'
import pazuzuTransparentImage from "../assets/pazuzuTransparent3.png"
import { useAuth } from '../Contexts/AuthContext';

function Worblin() {
    const {
        authUser,
        setAuthUser,
        isLoggedIn,
        setIsLoggedIn
    } = useAuth()
    console.log(authUser);
    console.log(isLoggedIn);

    const cc = "A chupacabra's hunger, fierce and wild Softens for a sasquatch gentle and mild. In the depths of the forest, their love blooms, Monstrous hearts entwined, defying all dooms.";

    const [solution, setSolution] = useState(null)
    const [title, setTitle] = useState(null)
    // today = date.today().day
    const today = new Date().getDate()
  
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
        <div className='bodyDivxyz' style={{ width: '100%' }}>
            <div className="grid1xyz"style={{ width: '100%' }}>
                <div className="box1xyz"style={{ width: '100%' }}>
                    <div className="box1box" style={{ width: '100%' }}>

                        <div className="box1b">Worblin</div>  
                        <div className="box1c"><h1></h1></div>
                    </div>
                </div>
                <div className='box2'>
                <details className='details'>
                    <summary>
                        <em>Ha ha ha</em>
                    </summary>
                    <em>{cc}</em>
                    </details>    
                <div class="box2Worblin" style={{ width: '100%' }}>today's puzzle: { title }</div></div>
            </div>  
            <div className="accountGrid" style={{ width: '100%' }}>
                <div className="agDiv1"><div className='agDiv1Sub' style={{ width: '100%' }}>
                    <div className="worbMain" style={{ width: '100%' }}>
                        {solution && <WorblinGame solution={solution} />}
                    </div>
                </div></div>
                <div className="agDiv2" ><div className="agDiv2Sub" >
                {/* <img src={pazuzuTransparentImage} className='accPaz1'/>   */}
                <img src={pazuzuTransparentImage} className='accPaz2'/>  
                <img src={pazuzuTransparentImage} className='accPaz2'/>  
                </div></div>
            </div>
        </div>
    )
}

export default Worblin;
