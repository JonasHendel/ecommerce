import auth from '../../../middleware/auth';
import Users from '../../../models/userModel';
import dbConnect from '../../../utils/dbConnect'

dbConnect()

export default async (req, res) => {
	switch (req.method) {
		case 'PATCH':
			await changeName(req, res);
			break;
    case 'GET':
      await getUsers(req, res);
      break;
	}
};

const getUsers = async (req, res) => {
  try {
    const result = await auth(req, res)
		if(result.role !== 'admin') return res.status(400).json({err: 'Authentication is not valid'})

    const users = await Users.find({checked: false}).select('-password')
    res.json({users})
	} catch (err) {
		res.status(500).json({ err: err.message });
	}
}

const changeName = async (req, res) => {
	try {

    const result = await auth(req, res)
		const { name } = req.body;

		const newUser = await Users.findOneAndUpdate(
			{ _id: result.id },
			{ name }
		);


		res.json({
			msg: 'Success! Name was updated.',
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
