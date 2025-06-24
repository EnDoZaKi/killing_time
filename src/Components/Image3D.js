import '../styles/flipper.css'

const Image3D = ({ src, src2 }) => {
    return (
        <div className="image-container">
            <div className='flipper'>
                <div className='face'>
                    <img src={src} alt="spinning" />
                </div>
                <div className='face back'>
                    <img src={src2} alt="spinning2" />
                </div>
            </div>
        </div>
    )
}

export default Image3D;