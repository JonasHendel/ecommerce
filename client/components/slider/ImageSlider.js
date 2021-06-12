import { ArrowCircleLeft, ArrowCircleRight } from 'phosphor-react';
import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { SliderData } from './SliderData';
import styles from '../../styles/Slider.module.css'

const ImageSlider = ({ slides }) => {
	const length = slides.length;
	const [current, setCurrent] = useState(0);

	const nextSlide = () => {
		setCurrent(current === length - 1 ? 0 : current + 1);
	};

	const prevSlide = () => {
		setCurrent(current === 0 ? length - 1 : current - 1);
	};

	if (!Array.isArray(slides) || slides.length <= 0) {
		return null;
	}

	return (
		<section className={styles.slider}>
			<ArrowCircleLeft className={styles.leftArrow} onClick={prevSlide} />
			<ArrowCircleRight className={styles.rightArrow} onClick={nextSlide} />
			{slides.map((slide, index) => {
				return (
					<div
						className={index === current ? 'slide active' : 'slide'}
						key={index}>
            className="md"
						{index === current && (
							<img
								src={slide.url}
								alt='travel image'
								className={styles.image}
							/>
						)}
					</div>
				);
			})}
		</section>
	);
};

export default ImageSlider;
