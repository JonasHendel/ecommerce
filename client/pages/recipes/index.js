//NPM
import React, { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

//CSS
import styles from '../../styles/Shop.module.css';

//Project files
import RecipeItem from '../../components/RecipeItem';
import {RecipeFilter} from '../../components/Filter';
import { getData } from '../../utils/fetchData';
import { DataContext } from '../../store/GlobalState';
import filterSearch from '../../utils/filterSearch';
import Loading from '../../components/Loading'

function Recipes(props) {
	const [recipes, setRecipes] = useState(props.recipes);
	const [isChecked, setIsChecked] = useState(false);
	const [page, setPage] = useState(1);

	const { state, dispatch } = useContext(DataContext);
	const { auth } = state;

	const router = useRouter();

	useEffect(() => {
		setRecipes(props.recipes);
	}, [props.recipes]);

	useEffect(() => {
		if (Object.keys(router.query).length === 0) {
			setPage(1);
		}
	}, []);

	const handleCheck = (id) => {
		recipes.forEach((product) => {
			if (product._id == id) product.checked = !product.checked;
		});
		setRecipes([...recipes]);
	};

	const handleCheckAll = () => {
		recipes.forEach((product) => {
			product.checked = !isChecked;
		});
		setRecipes([...recipes]);
		setIsChecked(!isChecked);
	};

	const handleDeleteAll = () => {
		let deleteArr = [];
		recipes.forEach((recipe) => {
			if (recipe.checked) {
				deleteArr.push({
					data: '',
					id: recipe._id,
					title: 'Delete all selected recipes?',
					type: 'DELETE_RECIPE',
				});
			}
		});
		dispatch({ type: 'ADD_MODAL', payload: deleteArr });
	};

	const handleLoadMore = () => {
		setPage(page + 1);
		filterSearch({ router, page: page + 1 });
	};

	return (
		<>
			<Head>
				<title>Shop</title>
			</Head>

			<div className='max-w-7xl min-h-screen mx-auto px-2 sm:px-6 lg:px-8'>
				<RecipeFilter state={state} />

				{auth.user && auth.user.role === 'admin' && (
					<div className='flex justify-end items-center mt-4'>
						<div className='flex items-center'>
							<label>Select All</label>
							<input
								className='w-6 h-6 ml-2 '
								type='checkbox'
								checked={isChecked}
								onChange={handleCheckAll}
							/>
						</div>
						<button
							className='w-28 h-12  bg-red-600 text-white rounded-lg ml-4'
							onClick={handleDeleteAll}>
							DELETE
						</button>
					</div>
				)}
					<div className='flex flex-wrap justify-evenly sm:justify-start'>
						{recipes.length === 0 ? (
					<div className='flex justify-center w-full'>
						<h1 className='mt-20 text-2xl font-bold'>
							Ingen oppskrifter tilgjengelig
						</h1>
					</div>
						) : (
							recipes.map((recipe) => (
								<RecipeItem
									key={recipe._id}
									recipe={recipe}
									handleCheck={handleCheck}
								/>
							))
						)}
					</div>
				<div className='w-full flex justify-center'>
					{props.result < page * 8 ? (
						''
					) : (
						<button
							className='w-36 h-12 border-4 border-gray-900  rounded-lg mb-5'
							onClick={handleLoadMore}>
							Load more
						</button>
					)}
				</div>
			</div>
		</>
	);
}

export async function getServerSideProps({ query }) {
	const page = query.page || 1;
	const sort = query.sort || '';
	const search = query.search || 'all';

	const res = await getData(
		`recipe?limit=${
			page * 8
		}&sort=${sort}&title=${search}`
	);
	return {
		props: {
			recipes: res.recipes,
			result: res.result,
		},
	};
}

export default Recipes;
