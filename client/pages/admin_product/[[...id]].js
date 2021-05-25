import Head from 'next/head';
import { useState, useContext } from 'react';
import { DataContext } from '../../store/GlobalState';
import { postData } from '../../utils/fetchData';
import { imageUpload } from '../../utils/imageUpload';
import {useRouter} from 'next/router'

const ProductManager = () => {
  const router = useRouter()
  
	const initialState = {
		product_id: '',
		title: '',
		price: 0,
		inStock: 0,
		description: 0,
		content: '',
		category: '',
	};

	const [product, setProduct] = useState(initialState);
	const {
		product_id,
		title,
		price,
		inStock,
		description,
		content,
		category,
	} = product;

	const [images, setImages] = useState([]);

	const { state, dispatch } = useContext(DataContext);
	const { categories, auth } = state;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setProduct({ ...product, [name]: value });
	};

	const handleUpload = (e) => {
		dispatch({ type: 'NOTIFY', payload: {} });
		let newImages = [];
		let num = 0;
		let err = '';
		const files = [...e.target.files];

		if (files.length === 0)
			return dispatch({
				type: 'NOTIFY',
				payload: { error: 'No files chosen.' },
			});
		files.forEach((file) => {
			if (file.size > 1024 * 1024)
				return (err = 'Image is to large. The max image size is 1mb');
			if (file.type !== 'image/jpeg' && file.type !== 'image/png')
				return (err = 'Image format has to be jpeg or png');

			num += 1;

			if (num <= 5) newImages.push(file);
			return newImages;
		});
		if (err) dispatch({ type: 'NOTIFY', payload: { error: err } });
		const imgCount = images.length;
		console.log(imgCount);
		if (imgCount + newImages.legnth > 5)
			return dispatch({
				type: 'NOTIFY',
				payload: { error: 'Select up to 5 images.' },
			});
		setImages([...images, ...newImages]);
	};

	const deleteImage = (index) => {
		const newArr = [...images];
		newArr.splice(index, 1);
		setImages(newArr);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (auth.user.role !== 'admin')
			return dispatch({
				type: 'NOTIFY',
				payload: { error: 'Authentication is not valid.' },
			});

		if (
			!product_id ||
			!title ||
			!price ||
			!inStock ||
			!description ||
			!content ||
			category === 'all' ||
			images.length === 0
		)
			return res
				.status(400)
				.json({ error: 'Please add all the fields.' });

		dispatch({ type: 'NOFITY', payload: { laoding: true } });
		let media = [];
		let imgNewURL = images.filter((img) => !img.url);
		const imgOldURL = images.filter((img) => img.url);

		if (imgNewURL.length > 0) media = await imageUpload(imgNewURL);

		const res = await postData(
			'product',
			{ ...product, images: [...imgOldURL, ...media] },
			auth.token
		);

		if (res.err)
			return dispatch({ type: 'NOTIFY', payload: { error: res.err } });

		return dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
	};

	console.log(category);

	return (
		<>
			<Head>
				<title>Product manager</title>
			</Head>
			<div className='max-w-7xl h-screen mx-auto px-2 sm:px-6 lg:px-8'>
				Product
				<form onSubmit={handleSubmit}>
					<input
						className=''
						type='text'
						name='product_id'
						value={product_id}
						placeholder='Product ID'
						onChange={handleChange}
					/>
					<input
						className=''
						type='text'
						name='title'
						value={title}
						placeholder='Title'
						onChange={handleChange}
					/>
					<input
						className=''
						type='text'
						name='price'
						value={price}
						placeholder='Price'
						onChange={handleChange}
					/>
					<input
						className=''
						type='text'
						name='inStock'
						value={inStock}
						placeholder='Items in stock'
						onChange={handleChange}
					/>
					<input
						className=''
						type='text'
						name='description'
						value={description}
						placeholder='Description'
						onChange={handleChange}
					/>
					<input
						className=''
						type='text'
						name='content'
						value={content}
						placeholder='Content'
						onChange={handleChange}
					/>
					<div>
						<select
							name='category'
							id='category'
							value={category}
							onChange={handleChange}>
							<option value='All'>All products</option>
							{categories.map((item) => (
								<option key={item._id} value={item._id}>
									{item.name}
								</option>
							))}
						</select>
					</div>
					<div>
						<input
							type='file'
							onChange={handleUpload}
							multiple
							accept='image/*'
						/>
						<div>
							{images.map((img, index) => (
								<div key={index}>
									<img
										src={
											img.url
												? img.url
												: URL.createObjectURL(img)
										}
										alt=''
									/>
									<span
										onClick={() => {
											deleteImage(index);
										}}>
										X
									</span>
								</div>
							))}
						</div>
					</div>
					<button type='submit'>Create Product</button>
				</form>
			</div>
		</>
	);
};

export default ProductManager;
