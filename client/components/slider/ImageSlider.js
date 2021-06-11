import { ArrowCircleLeft, ArrowCircleRight } from 'phosphor-react';
import React, { useState } from 'react';
import { useEffect } from 'react/cjs/react.development';
import { SliderData } from './SliderData';

const ImageSlider = ({ slides }) => {
	const length = slides.length;
	const [current, setCurrent] = useState(0);

  console.log(slides)

	const nextSlide = () => {
		setCurrent(current === length - 1 ? 0 : current + 1);
	};

	const prevSlide = () => {
		setCurrent(current === 0 ? length - 1 : current - 1);
	};

	if (!Array.isArray(slides) || slides.length <= 0) {
		return null;
	}
  slides.map(slide=> {
    if(slide.hasOwnProperty('url')) console.log('url')

  })

	return (
		<section className='slider'>
			<ArrowCircleLeft className='left-arrow' onClick={prevSlide} />
			<ArrowCircleRight className='right-arrow' onClick={nextSlide} />
			{slides.map((slide, index) => {
				return (
					<div
						className={index === current ? 'slide active' : 'slide'}
						key={index}>
						{index === current && slide.hasOwnProperty('url') && <img
								src={slide.url}
								alt='travel image'
								className='image'
							/>
						}
            {index === current && slide.hasOwnProperty('image') && <img
								src={slide.image}
								alt='travel image'
								className='image'
							/>
						}
					</div>
				);
			})}
		</section>
	);
};

export default ImageSlider;
