import dbConnect from '../../../utils/dbConnect';
import Recipes from '../../../models/recipeModel';
import auth from '../../../middleware/auth';

dbConnect();

export default async (req, res) => {
	switch (req.method) {
		case 'GET':
			await getRecipe(req, res);
			break;
		case 'PUT':
			await updateRecipe(req, res);
			break;
		case 'DELETE':
			await deleteRecipe(req, res);
			break;
	}
};

const getRecipe = async (req, res) => {
	try {
		const { id } = req.query;
		const recipe = await Recipes.findById(id);
		if (!recipe) {
			return res
				.status(400)
				.json({ err: 'This product does not exist.' });
		}

		res.json({ recipe });
	} catch (err) {
		return res.status(500).json({ err: err.message });
	}
};

const updateRecipe = async (req, res) => {
	try {
		const result = await auth(req, res);
		if (result.role !== 'admin')
			return res.status(400).json({ err: 'Authentication is not valid' });

		const { id } = req.query;
		const {
			title,
			ingredients,
			equipment,
      description,
      content,
			images,
      time,
      servings,
		} = req.body;

		if (
			!title ||
			!ingredients ||
			!equipment ||
			!description ||
			!content ||
			!time ||
			!servings ||
			images.length === 0
		)
			return res.statys(400).json({ err: 'Please add all the fields.' });

		await Recipes.findOneAndUpdate(
			{ _id: id },
			{
				title: title.toLowerCase(),
        ingredients,
        equipment,
				description,
				images,
        content,
        time,
        servings,
			}
		);

		res.json({ msg: 'Success! Recipe was updated' });
	} catch (err) {
		return res.status(500).json({ err: err.message });
	}
};

const deleteRecipe = async (req, res) => {
	try {
		const result = await auth(req, res);
		if (result.role !== 'admin') {
			return res.status(400).json({ err: 'Authentication is not valid' });
		}
		const { id } = req.query;
    
		await Recipes.findByIdAndDelete(id);

		res.json({ msg: 'Success! Recipe was deleted.'});
	} catch (err) {
		return res.status(500).json({ err: res.error });
	}
};
