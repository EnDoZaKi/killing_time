import { useNavigate } from 'react-router-dom';

import '../App.css'
import '../styles/circle.css'
import IMG1 from '../img/IMG.jpg'
import IMG2 from '../img/IMG2.jpg'
const AboutPage = () => {

    const navigate = useNavigate();

    const handleToGo = () => {
        navigate('/'); // Navigate to the '/about' route
    };

    return (
        <>
            <h1 className='text-center' onClick={handleToGo}>MONEY</h1>
            <div className='grid-container' style={{ '--minmax': '900px' }}>
                <div className='container grid-item'>
                    <div id='frames'>
                        <div className='stripe'>
                            <div className='s'></div>
                            <div className='s1'></div>
                            <div className='s2'></div>
                            <div className='s3'></div>
                            <div className='s4'></div>
                            <div className='s5'></div>
                            <div className='s6'></div>
                            <div className='s7'></div>
                            <div className='s8'></div>
                            <div className='s9'></div>
                            <div className='s10'></div>
                            <div className='s11'></div>
                        </div>
                        <div className='strip'>
                            <div className='s12'></div>
                            <div className='s13'></div>
                            <div className='s14'></div>
                            <div className='s15'></div>
                            <div className='s16'></div>
                            <div className='s17'></div>
                            <div className='s18'></div>
                            <div className='s19'></div>
                            <div className='s20'></div>
                            <div className='s21'></div>
                            <div className='s22'></div>
                            <div className='s23'></div>
                        </div>
                    </div>
                </div>
                <div className='grid-item' style={{ textAlign: "right", marginRight: "175px" }}>
                    <img src={IMG1} alt='' style={{ height: "auto", width: "35%" }} /><br/>
                    <img src={IMG2} alt='' style={{ height: "auto", width: "35%" }} />
                </div>
            </div>
        </>
    )
}

export default AboutPage;