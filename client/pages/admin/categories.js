import Head from 'next/head';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../store/GlobalState';
import { updateItem } from '../../store/Actions';
import { postData, putData } from '../../utils/fetchData';
import { NotePencil, Trash } from 'phosphor-react';

const Categories = () => {
	const [name, setName] = useState('');
	const { state, dispatch } = useContext(DataContext);
	const { categories, auth } = state;

	const [id, setId] = useState();

  useEffect(()=>{
    if(name.length === 0) setId('')
  },[name])

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

  if (!auth.user) {
		return null;
	} else if (auth.user) {
		if (auth.user.role !== 'admin') {
			return null;
		}
	}
	return (
			<div>
				<Head>
					<title>Categories</title>
				</Head>
				<div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 min-h-screen flex justify-center">

				<div className='h-96 px-10 mt-20 shadow-even rounded-xl flex flex-col justify-between'>
        <div className="flex flex-col justify-start">
					<input
            className="border-4 border-black border-md rounded-md p-2 mt-6 mb-4"
            placeholder="Category name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
          <div className="flex flex-col items-center">
					{categories.map((category) => (
						<div className="w-full flex justify-center items-center" key={category._id} >
								<h1 className="w-4/6 text-md font-bold">{category.name}</h1>
                <div className="2/6 flex items-center">
								<NotePencil
                className="cursor-pointer text-xl"
                weight="bold"
									onClick={() => editCategory(category)}
								/>
								<Trash
                weight="bold"
                className="text-red-600 cursor-pointer text-xl"
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
					<button className="h-12 bg-gray-900 text-white rounded-lg mb-6" onClick={createCategory}>
						{id ? 'Update category' : 'Create category'}
					</button>
				</div>
       </div>
      </div>
	);
};

export default Categories;
