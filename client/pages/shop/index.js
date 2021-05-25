//NPM
import React, { useState, useContext } from 'react';
import Head from 'next/head';

//CSS
import styles from '../../styles/Shop.module.css';

//Project files
import ProductItem from '../../components/product/ProductItem';
import { getData } from '../../utils/fetchData';
import { DataContext } from '../../store/GlobalState';

function Shop(props) {
	const [products, setProducts] = useState(props.products);
	const [isChecked, setIsChecked] = useState(false);

	const { state, dispatch } = useContext(DataContext);
	const { auth } = state;

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
		dispatch({type: 'ADD_MODAL', payload: deleteArr});
	};

	return (
		<>
			<Head>
				<title>Shop</title>
			</Head>

			<div className='max-w-7xl min-h-screen mx-auto px-2 sm:px-6 lg:px-8'>
				<div className='grid grid-cols-4'>
					{auth.user && auth.user.role === 'admin' && (
						<div className='absolute'>
							<input
								type='checkbox'
								checked={isChecked}
								onChange={handleCheckAll}
							/>
							<button onClick={handleDeleteAll}>
								DELETE ALL
							</button>
						</div>
					)}
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
			</div>
		</>
	);
}

export async function getServerSideProps() {
	const res = await getData('product');
	return {
		props: {
			products: res.products,
			result: res.result,
		},
	};
}

export default Shop;
