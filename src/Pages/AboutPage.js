import { useNavigate } from 'react-router-dom';

import '../App.css'
import money from '../img/IMG.jpg'

const AboutPage = () => {

    const navigate = useNavigate();

    const handleToGo = () => {
        navigate('/'); // Navigate to the '/about' route
    };

    const Grid = ({ children, cols = 12 }) => (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: '10px' }}>
            {children}
        </div>
    );

    const GridItem = ({ children, colSpan = 1 }) => (
        <div style={{ gridColumn: `span ${colSpan}` }}>{children}</div>
    );

    return (
        <div>
            <h1 className='text-center' onClick={handleToGo}>MONEY</h1>

            <Grid cols={2}>
                <GridItem>
                    <img className='money-img' src={money} alt='MONEY' />
                </GridItem>
                <GridItem>
                    <p className='text-info'>
                        MONEY<br />
                        MONEY<br />
                        MONEY<br />
                        MONEY<br />
                        MONEY<br />
                        MONEY<br />
                        MONEY<br />
                    </p>
                </GridItem>
            </Grid>
        </div>
    )
}

export default AboutPage;