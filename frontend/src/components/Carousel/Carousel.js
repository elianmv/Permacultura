import Carousel from 'react-bootstrap/Carousel';
import carousel01 from '../../assets/images/carousel01.png';
import carousel02 from '../../assets/images/carousel02.png';
import carousel03 from '../../assets/images/carousel03.png';
import './Carousel.css';


export function Carousel1() {
return (
        <>
        <Carousel>
        <Carousel.Item>
            <img
                className="d-block"
                src={carousel01}
                alt="First slide" />

        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block"
                src={carousel02}
                alt="Second slide" />

        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block"
                src={carousel03}
                alt="Third slide" />

        </Carousel.Item>
        </Carousel>
        </>
    );
}