import dbConnect from '../../../utils/dbConnect';
import Recipes from '../../../models/recipeModel';
import auth from '../../../middleware/auth';

dbConnect();

export default async (req, res) => {
	switch (req.method) {
		case 'GET':
			await getRecipes(req, res);
			break;
		case 'POST':
			await createRecipe(req, res);
			break;
	}
};

class APIfeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}
	filtering() {
		const queryObj = { ...this.queryString };

		const excludeFields = ['page', 'sort', 'limit'];
		excludeFields.forEach((el) => delete queryObj[el]);

		if (queryObj.title !== 'all')
			this.query.find({ title: { $regex: queryObj.title } });

		this.query.find();
		return this;
	}

	sorting() {
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort.split(',').join('');
			this.query = this.query.sort(sortBy);
		} else {
			this.query = this.query.sort('-createdAt');
		}

		return this;
	}

	paginating() {
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 6;
		const skip = (page - 1) * limit;
		this.query = this.query.skip(skip).limit(limit);
		return this;
	}
}

const getRecipes = async (req, res) => {
	try {
		const features = new APIfeatures(Recipes.find({checked: false}), req.query)
			.filtering()
			.sorting()
			.paginating();

		const recipes = await features.query;

		res.json({
			status: 'success',
			result: recipes.length,
			recipes,
		});
	} catch (err) {
		return res.status(500).json({ err: err.message });
	}
};

const createRecipe = async (req, res) => {
	try {
		const result = await auth(req, res);
		if (result.role !== 'admin')
			return res.status(400).json({ err: 'Authentication is not valid' });

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
			!ingredients||
			!equipment ||
			!description ||
			!content ||
			!time ||
			!servings ||
			images.length === 0
		)
			return res.status(400).json({ err: 'Please add all the fields.' });

		const recipe = await Recipes.findOne({ title });
		if (recipe)
			return res.status(400).json({ err: 'This recipe already exists' });

		const newRecipe = new Recipes({
			title: title.toLowerCase(),
			ingredients,
			equipment,
			description,
      content,
			images,
      time,
      servings,
		});

		await newRecipe.save();

		res.json({ msg: 'Success! Recipe was created' });
	} catch (err) {
		return res.status(500).json({ err: err.message });
	}
};
