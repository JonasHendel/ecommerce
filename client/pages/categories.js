import Head from 'next/head';
import { useContext, useState } from 'react';
import { DataContext } from '../store/GlobalState';
import { updateItem } from '../store/Actions';
import { postData, putData } from '../utils/fetchData';
import { NotePencil, Trash } from 'phosphor-react';

const Categories = () => {
	const [name, setName] = useState('');
	const { state, dispatch } = useContext(DataContext);
	const { categories, auth } = state;

	const [id, setId] = useState();

	const createCategory = async () => {
		if (auth.user.role !== 'admin')
			return dispatch({
				type: 'NOTIFY',
				payload: { error: 'Authentication is not valid' },
			});
		if (!name)
			return dispatch({
				type: 'NOTIFY',
				payload: { error: 'Name can not be left blank' },
			});

		dispatch({ type: 'NOTIFY', payload: { loading: true } });

		let res;

		if (id) {
			res = await putData(`categories/${id}`, { name }, auth.token);
			if (res.err)
				return dispatch({
					type: 'NOTIFY',
					payload: { error: res.err },
				});
			dispatch(
				updateItem(categories, id, res.category, 'ADD_CATEGORIES')
			);
		} else {
			res = await postData('categories', { name }, auth.token);
			if (res.err)
				return dispatch({
					type: 'NOTIFY',
					payload: { error: res.err },
				});
			dispatch({
				type: 'ADD_CATEGORIES',
				payload: [...categories, res.newCategory],
			});
		}

		setId('');
		setName('');
		return dispatch({ type: 'NOTIFY', payload: { success: res.msg } });
	};

	const editCategory = (category) => {
		setId(category._id);
		setName(category.name);
	};

	return (
		<>
			<div>
				<Head>
					<title>Categories</title>
				</Head>
				<div>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<button onClick={createCategory}>
						{id ? 'Update category' : 'Create category'}
					</button>
					{categories.map((category) => (
						<div key={category._id}>
							<div className='flex items-center'>
								<h1>{category.name}</h1>
								<NotePencil
									onClick={() => editCategory(category)}
								/>
								<Trash
									onClick={() =>
										dispatch({
											type: 'ADD_MODAL',
											payload: [
												{
													data: categories,
													id: category._id,
													title: category.name,
													type: 'ADD_CATEGORIES',
												},
											],
										})
									}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Categories;
