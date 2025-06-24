import { useNavigate } from 'react-router-dom';

import '../App.css'
import ImageCylinder from '../Components/ImageCylinder';

const AboutPage = () => {

    const navigate = useNavigate();

    const handleToGo = () => {
        navigate('/about3'); // Navigate to the '/about' route
    };

    return (
        <>
            <h1 className='text-center' onClick={handleToGo}>MONEY</h1>
            <div className='grid-container' style={{ '--minmax': '1000px' }}>
                <div style={{ border: '1px solid green', top: '100px' }} className='grid-item'>
                    <ImageCylinder />
                </div>
            </div>
        </>
    )
}

export default AboutPage;