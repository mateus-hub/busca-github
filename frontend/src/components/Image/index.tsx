import './styles.css';
import { Image } from 'types/image';

type Props = {
    image: Image;
}

const Avatar = ( {image} : Props) => {

    return (  
        <div className="img-container">
            <img src={image.avatar_url} alt="" />
        </div>

    );
}

export default Avatar;