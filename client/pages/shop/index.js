//NPM
import React, { useState, useContext, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

//CSS
import styles from '../../styles/Shop.module.css';

//Project files
import ProductItem from '../../components/product/ProductItem';
import {ProductFilter} from '../../components/Filter';
import { getData } from '../../utils/fetchData';
import { DataContext } from '../../store/GlobalState';
import filterSearch from '../../utils/filterSearch';
import Loading from '../../components/Loading'

function Shop(props) {
	const [products, setProducts] = useState(props.products);
	const [isChecked, setIsChecked] = useState(false);
	const [page, setPage] = useState(1);

	const { state, dispatch } = useContext(DataContext);
	const { auth } = state;

	const router = useRouter();

	useEffect(() => {
		setProducts(props.products);
	}, [props.products]);

	useEffect(() => {
		if (Object.keys(router.query).length === 0) {
			setPage(1);
		}
	}, []);

	const handleCheck = (id) => {
		products.forEach((product) => {
			if (product._id == id) product.checked = !product.checked;
		});
		setProducts([...products]);
	};

	const handleCheckAll = () => {
		products.forEach((product) => {
			product.checked = !isChecked;
		});
		setProducts([...products]);
		setIsChecked(!isChecked);
	};

	const handleDeleteAll = () => {
		let deleteArr = [];
		products.forEach((product) => {
			if (product.checked) {
				deleteArr.push({
					data: '',
					id: product._id,
					title: 'Delete all selected products?',
					type: 'DELETE_PRODUCT',
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
				<title>Nettbutikk</title>
			</Head>

			<div className='max-w-7xl min-h-screen mx-auto px-2 sm:px-6 lg:px-8'>
				<ProductFilter state={state} />

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
						{products.length === 0 ? (
							<h2>No products</h2>
						) : (
							products.map((product) => (
								<ProductItem
									key={product._id}
									product={product}
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
	const category = query.category || 'all';
	const sort = query.sort || '';
	const search = query.search || 'all';

	const res = await getData(
		`product?limit=${
			page * 8
		}&category=${category}&sort=${sort}&title=${search}`
	);
	return {
		props: {
			products: res.products,
			result: res.result,
		},
	};
}

export default Shop;
