import '../styles/cylinder.css'

import IMG1 from '../img/IMG.jpg'
import IMG2 from '../img/IMG2.jpg'
import IMG3 from '../img/IMG3.jpg'

const ImageCylinder = () => {
    return (
        <div className="scene">
            <div className="cylinder">
                <div className="cylinder-face face1">
                    <img src={IMG1} alt="1" />
                </div>
                <div className="cylinder-face face2">
                    <img src={IMG2} alt="2" />
                </div>
                <div className="cylinder-face face3">
                    <img src={IMG3} alt="3" />
                </div>
            </div>
        </div>
    )
}

export default ImageCylinder;