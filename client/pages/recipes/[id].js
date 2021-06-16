import Head from 'next/head';
import { getData } from '../../utils/fetchData';
import { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';
import { loadStripe } from '@stripe/stripe-js';
import { Clock } from 'phosphor-react';
import { addCourse } from '../../store/Actions';
import ImageSlider from '../../components/slider/ImageSlider';

import { DataContext } from '../../store/GlobalState';
import { postData } from '../../utils/fetchData';

const Course = (props) => {
	const router = useRouter();

	const { state, dispatch } = useContext(DataContext);

	const { auth } = state;

	const { user } = auth;

	const initialState = {
		...props.recipe,
	};

	const [tab, setTab] = useState(0);
	const [recipe, setRecipe] = useState(initialState);

	const isActive = (index) => {
		if (tab == index) return 'h-12 mr-2 border-2 border-black ';
		return 'h-12 mr-2';
	};

	const { ingredients, equipment } = recipe;

	return (
		<>
			<Head>
				<title>{recipe.title}</title>
			</Head>
			<div className='max-w-7xl min-h-screen mx-auto sm:px-6 lg:px-8 '>
				<div className='w-full h-850 flex flex-col justify-evenly mt-20 items-center shadow-even rounded-2xl'>
					<div className='w-4/5 flex justify-between items-center'>
						<div className='w-96 h-full flex flex-col justify-evenly'>
							<h1 className='capitalize font-bold text-2xl'>
								{recipe.title}
							</h1>
							<div className='flex mt-3 justify-between'>
								<p className='font-bold'>
									Prosjoner: {recipe.servings}
								</p>
								<p className='font-bold flex items-center'>
									<Clock weight='bold' className='mr-1' />{' '}
									{recipe.time}
								</p>
							</div>
							<div>
								<p className='mt-3'>{recipe.description}</p>
							</div>
							<div className='mt-3'>
								<h2 className='font-bold'>Ingredients:</h2>
								{ingredients.map((ingredient) => (
									<p>{ingredient}</p>
								))}
							</div>
							<div className='mt-3'>
								<h2 className='font-bold'>Equipment:</h2>
								{equipment.map((tool) => (
									<p>{tool}</p>
								))}
								{}
							</div>
						</div>
						<div className='flex flex-col justify-center'>
							<ImageSlider slides={recipe.images} />
						</div>
					</div>
					<div className='w-4/5'>
						<p className='font-semibold text-lg text-gray-600'>
							{recipe.content}
						</p>
					</div>
				</div>
			</div>
		</>
	);
};

export async function getServerSideProps({ params: { id } }) {
	const res = await getData(`recipe/${id}`);

	return {
		props: { recipe: res.recipe },
	};
}

export default Course;
