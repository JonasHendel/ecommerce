import Head from 'next/head';
import { useState, useContext, useEffect } from 'react';
import { DataContext } from '../../../store/GlobalState';
import { postData, getData, putData } from '../../../utils/fetchData';
import { imageUpload } from '../../../utils/imageUpload';
import { useRouter } from 'next/router';

const ProductManager = () => {
	const router = useRouter();

	const initialState = {
		title: '',
		price: Number,
		inStock: Number,
		description: '',
		content: '',
		category: '',
	};

	const [product, setProduct] = useState(initialState);
	const { title, price, inStock, description, content, category } = product;

	const [images, setImages] = useState([]);
	const [onEdit, setOnEdit] = useState(false);
  const [tab, setTab] = useState(0)

	const { state, dispatch } = useContext(DataContext);
	const { categories, auth } = state;

	const { id } = router.query;


	useEffect(() => {
		if (id) {
			setOnEdit(true);
			getData(`product/${id}`).then((res) => {
				setProduct(res.product);
				setImages(res.product.images);
			});
		} else {
			setOnEdit(false);
			setProduct(initialState);
			setImages([]);
		}
	}, [id]);

	useEffect;

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

  const isActive = (index) => {
		if (tab == index) return 'h-12 mr-2 border-4 border-white ';
		return 'h-12 mr-2';
	};

	const handleSubmit = async (e) => {
    dispatch({ type: 'NOTIFY', payload: { loading: true } });
		e.preventDefault();
		if (auth.user.role !== 'admin')
			return dispatch({
				type: 'NOTIFY',
				payload: { error: 'Authentication is not valid.' },
			});

		if (
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

		let res;
		if (onEdit) {
			res = await putData(
				`product/${id}`,
				{ ...product, images: [...imgOldURL, ...media] },
				auth.token
			);

			if (res.err)
				return dispatch({
					type: 'NOTIFY',
					payload: { error: res.err },
				});
		} else {
			res = await postData(
				'product',
				{ ...product, images: [...imgOldURL, ...media] },
				auth.token
			);

			if (res.err)
				return dispatch({
					type: 'NOTIFY',
					payload: { error: res.err },
				});
		}

    router.push('/shop')
		return dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
	};

	return (
		<>
			<Head>
				<title>Product manager</title>
			</Head>
			<div className='max-w-7xl h-screen mx-auto px-2 sm:px-6 lg:px-8'>
				<form
					className='flex flex-col justify-between shadow-even rounded-2xl p-20 mt-20'
					onSubmit={handleSubmit}>
					<div className='flex justify-around'>
						<div className='flex flex-col'>
							<h1 className='font-bold text-2xl'>Product</h1>
							<div className='flex flex-col'>
								<label
									className='font-bold mr-2'
									htmlFor='title'>
									Title:
								</label>
								<input
									className='border-4 border-black border-md rounded-md p-2'
									type='text'
									name='title'
									value={title}
									placeholder='Title'
									onChange={handleChange}
								/>
							</div>
							<div className='flex flex-col'>
								<label
									className='font-bold mr-2'
									htmlFor='title'>
									Price:
								</label>
								<input
									className='border-4 border-black border-md rounded-md p-2'
									type='number'
									name='price'
									value={price}
									placeholder='Price'
									onChange={handleChange}
								/>
							</div>
							<div className='flex flex-col'>
								<label
									className='font-bold mr-2'
									htmlFor='title'>
									In stock:
								</label>
								<input
									className='border-4 border-black border-md rounded-md p-2'
									type='number'
									name='inStock'
									value={inStock}
									placeholder='Items in stock'
									onChange={handleChange}
								/>
							</div>
							<div className='flex flex-col'>
								<label
									className='font-bold mr-2'
									htmlFor='title'>
									Description:
								</label>
								<textarea
									className='border-4 border-black border-md rounded-md p-2'
									type='text'
									name='description'
									value={description}
									placeholder='Description'
									onChange={handleChange}
								/>
							</div>
							<div className='flex flex-col'>
								<label
									className='font-bold mr-2'
									htmlFor='title'>
									Content:
								</label>
								<textarea
									className='border-4 border-black border-md rounded-md p-2'
									type='text'
									name='content'
									value={content}
									placeholder='Content'
									onChange={handleChange}
								/>
							</div>
							<div className='flex flex-col'>
								<label
									className='font-bold mr-2'
									htmlFor='title'>
									Category:
								</label>
								<div>
									<select
										className='border-4 w-full border-black border-md rounded-md p-2'
										name='category'
										id='category'
										value={category}
										onChange={handleChange}>
										<option value='All'>Categories</option>
										{categories.map((item) => (
											<option
												key={item._id}
												value={item._id}>
												{item.name}
											</option>
										))}
									</select>
								</div>
							</div>
						</div>
						<section className="flex flex-col justify-evenly">
							<input
								type='file'
								onChange={handleUpload}
								multiple
								accept='image/*'
							/>
              <div className="h-4/6">

              { images.length !== 0 &&
              <div>
								<img
									className='h-60 w-96 mb-2 object-cover'
									src={images[tab].url ? images[tab].url : URL.createObjectURL(images[tab])}
								/>
								<div className='flex'>
									{images.map((img, index) => (
										<img
											className={isActive(index)}
											key={index}
											src={img.url ? img.url : URL.createObjectURL(img)}
											alt={img}
											onClick={() => {
												setTab(index);
											}}
										/>
									))}
								</div>
                </div>
              }
              </div>
						</section>
					</div>
					<div className='flex justify-end'>
						<button
							className='w-36 h-12 rounded-lg bg-gray-900 text-white '
							type='submit'>
							{onEdit ? 'Update Product' : 'Create Product'}
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default ProductManager;
