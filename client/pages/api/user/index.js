import auth from '../../../middleware/auth';
import Users from '../../../models/userModel';
import dbConnect from '../../../utils/dbConnect'

dbConnect()

export default async (req, res) => {
	switch (req.method) {
		case 'PATCH':
			await changeName(req, res);
			break;
	}
};

const changeName = async (req, res) => {
	try {

    const result = await auth(req, res)
		const { name } = req.body;

		const newUser = await Users.findOneAndUpdate(
			{ _id: result.id },
			{ name }
		);


		res.json({
			msg: 'Successfull update',
			user: {
				name,
				avatar: newUser.avatar,
				email: newUser.email,
				role: newUser.role,
			},
		});
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
};
