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

	const handleSubmit = async (e) => {
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

		return dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
	};

	return (
		<>
			<Head>
				<title>Product manager</title>
			</Head>
			<div className='max-w-7xl h-screen mx-auto px-2 sm:px-6 lg:px-8'>
				Product
				<form className="flex justify-between"onSubmit={handleSubmit}>
        <div cassName='flex flex-col'>
          <div className="flex">
          <label className="font-bold mr-2" htmlFor="title">Title:</label>
            <input
              className=''
              type='text'
              name='title'
              value={title}
              placeholder='Title'
              onChange={handleChange}
            />
          </div>
          <div className="flex">
          <label className="font-bold mr-2" htmlFor="title">Price:</label>
            <input
              className=''
              type='number'
              name='price'
              value={price}
              placeholder='Price'
              onChange={handleChange}
            />
          </div>
          <div className="flex">
          <label className="font-bold mr-2" htmlFor="title">In stock:</label>
            <input
              className=''
              type='number'
              name='inStock'
              value={inStock}
              placeholder='Items in stock'
              onChange={handleChange}
            />
          </div>
          <div className="flex">
          <label className="font-bold mr-2" htmlFor="title">Description:</label>
            <input
              className=''
              type='text'
              name='description'
              value={description}
              placeholder='Description'
              onChange={handleChange}
            />
          </div>
          <div className="flex">
          <label className="font-bold mr-2" htmlFor="title">Content:</label>
            <input
              className=''
              type='text'
              name='content'
              value={content}
              placeholder='Content'
              onChange={handleChange}
            />
          </div>
          <div className="flex">
          <label className="font-bold mr-2" htmlFor="title">Category:</label>
            <div>
              <select
                name='category'
                id='category'
                value={category}
                onChange={handleChange}>
                <option value='All'>Categories</option>
                {categories.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
					<button type='submit'>{onEdit ? 'Update Product' : 'Create Product'}</button>
				</form>
			</div>
		</>
	);
};

export default ProductManager;
