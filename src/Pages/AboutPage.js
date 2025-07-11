import { useNavigate } from 'react-router-dom';

import '../App.css'
import money from '../img/IMG.jpg'
import money2 from '../img/IMG2.jpg'
import Image3D from '../Components/Image3D';

const AboutPage = () => {

    const navigate = useNavigate();

    const handleToGo = () => {
        navigate('/about2'); // Navigate to the '/about' route
    };

    return (
        <>
            <h1 className='text-center' onClick={handleToGo}>MONEY</h1>
            <div className='grid-container' style={{ '--minmax': '900px' }}>
                <div className='grid-item' style={{border: "1px solid yellow"}}>
                    <Image3D src={money} src2={money2} />
                </div>
                <div className='grid-item' style={{ textAlign: "center", position: "relative" }}>
                    <p style={{textShadow: "5px 5px 4px black", fontSize: "25px"}}>
                        MONEY<br />
                        MONEY<br />
                        MONEY<br />
                        MONEY<br />
                        MONEY<br />
                        MONEY<br />
                        MONEY<br />
                    </p>
                </div>
            </div>
        </>
    )
}

export default AboutPage;