import dbConnect from '../../../utils/dbConnect';
import Products from '../../../models/productModel';
import auth from '../../../middleware/auth';

dbConnect();

export default async (req, res) => {
	switch (req.method) {
		case 'GET':
			await getProduct(req, res);
			break;
		case 'PUT':
			await updateProduct(req, res);
			break;
		case 'DELETE':
			await deleteProduct(req, res);
			break;
	}
};

const getProduct = async (req, res) => {
	try {
		const { id } = req.query;
		const product = await Products.findById(id);
		if (!product) {
			return res
				.status(400)
				.json({ err: 'This product does not exist.' });
		}

		res.json({ product });
	} catch (err) {
		return res.status(500).json({ err: err.message });
	}
};

const updateProduct = async (req, res) => {
	try {
		const result = await auth(req, res);
		if (result.role !== 'admin')
			return res.status(400).json({ err: 'Authentication is not valid' });

		const { id } = req.query;
		const {
			title,
			price,
			inStock,
			description,
			content,
			category,
			images,
		} = req.body;

		if (
			!title ||
			!price ||
			!inStock ||
			!description ||
			!content ||
			category === 'all' ||
			images.length === 0
		)
			return res.statys(400).json({ err: 'Please add all the fields.' });

		await Products.findOneAndUpdate(
			{ _id: id },
			{
				title: title.toLowerCase(),
				price,
				inStock,
				description,
				content,
				category,
				images,
			}
		);

		res.json({ msg: 'Success! Product was updated' });
	} catch (err) {
		return res.status(500).json({ err: err.message });
	}
};

const deleteProduct = async (req, res) => {
	try {
		const result = await auth(req, res);
    console.log(result)
		if (result.role !== 'admin') {
			return res.status(400).json({ err: 'Authentication is not valid' });
		}
		const { id } = req.query;


    const product = await Products.findById(id)
    
		await Products.findByIdAndUpdate((id), {
      checked: !product.checked
    });

		res.json({ msg: 'Success! Product was deleted.'});
	} catch (err) {
		return res.status(500).json({ err: res.error });
	}
};
