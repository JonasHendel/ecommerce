import dbConnect from '../../../utils/dbConnect';
import Courses from '../../../models/courseModel';
import auth from '../../../middleware/auth';

dbConnect();

export default async (req, res) => {
	switch (req.method) {
		case 'GET':
			await getCourses(req, res);
			break;
		case 'POST':
			await createCourse(req, res);
			break;
	}
};

const getCourses = async (req, res) => {
	try {
    
		const courses = await Courses.find({checked: false});


		res.json({
			status: 'success',
			result: courses.length,
			courses,
		});
	} catch (err) {
		return res.status(500).json({ err: err.message });
	}
};


const createCourse = async (req, res) => {
	try {
		const result = await auth(req, res);
		if (result.role !== 'admin')
			return res.status(400).json({ err: 'Authentication is not valid' });

		const {
			title,
      date,
      time,
			price,
			spots,
			description,
			content,
			category,
			images,
		} = req.body;

		if (
			!title ||
      !date ||
      !time ||
			!price ||
			!spots ||
			!description ||
			!content ||
			category === 'all' ||
			images.length === 0
		)
			return res.status(400).json({ err: 'Please add all the fields.' });

    const product = await Courses.findOne({title})
    if(product) return res.status(400).json({err: 'This course already exists'})

		const newCourse = new Courses({
			title,
      date,
      time,
			price,
			spots,
			description,
			content,
			category,
			images,
		});

    await newCourse.save()

    res.json({msg: 'Success! Course was created'})
	} catch (err) {
		return res.status(500).json({ err: err.message });
	}
};