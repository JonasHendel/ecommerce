import ImageSlider from '../components/slider/ImageSlider';
import { SliderData } from '../components/slider/SliderData';
import {useState} from 'react'
import { useEffect } from 'react/cjs/react.development';

const Mail = () => {

  const [state, setState] = useState()

  console.log(state)

  const myArr = []

  if(state) console.log(state.split(", "))

	return (
    <>
    <input  className="border-4 border-gray-900"value={state} onChange={e=>setState(e.target.value)}/>
    <h1>{state}</h1>
    </>
  )
};

export default Mail;
