
import './Slider.css';
import './Slider@media.css';
import {useState} from "react";

const Slider = ({slides}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const goToNext = () => {
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);

    };
    const slideStylesWidthBackground = {
        backgroundImage: `url(${slides[currentIndex].url})`,
    };

    return (
            <div className={'containerStyles'}>
                <div className={'sliderStyles'}>
                    <div className={'arrows'}>
                        <div onClick={goToPrevious} className={'leftArrowStyles'}>❰</div>
                        <div onClick={goToNext} className={'rightArrowStyles'}>❱</div>
                    </div>
                    <div style={slideStylesWidthBackground} className={'slideStyles'}/>
                </div>
            </div>
    );
};

export default Slider;
