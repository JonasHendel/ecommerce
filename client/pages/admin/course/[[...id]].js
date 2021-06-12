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
		date: Date,
		time: '',
		price: Number,
		spots: Number,
		description: '',
		content: '',
	};

	const [course, setCourse] = useState(initialState);

	const { title, date, time, price, spots, description, content} =
		course;

	// const dated = new Date(course.date).toISOString().slice(0, 10)
	const [images, setImages] = useState([]);
	const [onEdit, setOnEdit] = useState(false);
	const [tab, setTab] = useState(0);

	const { state, dispatch } = useContext(DataContext);
	const { auth } = state;

	const { id } = router.query;

	useEffect(() => {
		if (id) {
			setOnEdit(true);
			getData(`course/${id}`).then((res) => {
				setCourse(res.course);
				setImages(res.course.images);
			});
		} else {
			setOnEdit(false);
			setCourse(initialState);
			// setImages([]);
		}
	}, [id]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCourse({ ...course, [name]: value });
	};

	const handleUpload = (e) => {
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
		if (tab == index) return 'h-12 mr-4 border-4 border-black ';
		return 'h-12 mr-4';
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
			!date ||
			!price ||
			!spots ||
			!description ||
			!content ||
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
				`course/${id}`,
				{ ...course, images: [...imgOldURL, ...media] },
				auth.token
			);

			if (res.err)
				return dispatch({
					type: 'NOTIFY',
					payload: { error: res.err },
				});
		} else {
			res = await postData(
				'course',
				{ ...course, images: [...imgOldURL, ...media] },
				auth.token
			);

			if (res.err)
				return dispatch({
					type: 'NOTIFY',
					payload: { error: res.err },
				});
		}

		router.push('/course');
		return dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
	};

	if (!auth.user) {
		return null;
	} else if (auth.user) {
		if (auth.user.role !== 'admin') {
			return null;
		}
	}

	return (
		<>
			<Head>
				<title>Course manager</title>
			</Head>
			<div className='max-w-7xl h-screen mx-auto px-2 sm:px-6 lg:px-8'>
				<form
					className='flex flex-col justify-between shadow-even rounded-2xl p-20 mt-20'
					onSubmit={handleSubmit}>
					<div className='flex justify-around'>
						<div className='flex flex-col'>
							<h1 className='font-bold text-2xl'>Course</h1>
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
									Date:
								</label>
								<input
									className='border-4 border-black border-md rounded-md p-2'
									type='date'
									name='date'
									value={date}
									placeholder='Date'
									onChange={handleChange}
								/>
							</div>
							<div className='flex flex-col'>
								<label
									className='font-bold mr-2'
									htmlFor='title'>
									Time:
								</label>
								<input
									className='border-4 border-black border-md rounded-md p-2'
									type='time'
									name='time'
									value={time}
									placeholder='Date'
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
									Spots:
								</label>
								<input
									className='border-4 border-black border-md rounded-md p-2'
									type='number'
									name='spots'
									value={spots}
									placeholder='Spots in available'
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
						</div>
						<section className='flex flex-col justify-evenly'>
							<input
								type='file'
								onChange={handleUpload}
								multiple
								accept='image/*'
							/>
							<div className='h-4/6'>
								{images.length > 0 && (
									<div>
										<img
											className='h-60 w-96 mb-2 object-cover'
											src={
												images[tab].url
													? images[tab].url
													: URL.createObjectURL(
															images[tab]
													  )
											}
										/>
										<div className='flex'>
											{images.map((img, index) => (
												<div>
													<img
														className={isActive(
															index
														)}
														key={index}
														src={
															img.url
																? img.url
																: URL.createObjectURL(
																		img
																  )
														}
														alt={img}
														onClick={() => {
															setTab(index);
														}}
													/>
													<span
														className='relative px-2 py-1 bg-red-500 bottom-14 right-2 ml-15 rounded-full text-white text-xs cursor-pointer'
														onClick={() =>
															deleteImage(index)
														}>
														x
													</span>
												</div>
											))}
										</div>
									</div>
								)}
							</div>
						</section>
					</div>
					<div className='flex justify-end'>
						<button
							className='w-36 h-12 rounded-lg bg-gray-900 text-white '
							type='submit'>
							{onEdit ? 'Update Course' : 'Create Course'}
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export default ProductManager;
