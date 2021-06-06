import dbConnect from '../../../utils/dbConnect'
import Courses from '../../../models/courseModel'
import auth from '../../../middleware/auth';
import { Router } from 'next/router';


dbConnect()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getCourse(req, res)
      break;
      case 'PUT':
        await updateCourse(req, res);
        break;
      case 'DELETE':
        await deleteCourse(req, res);
        break;
  }
} 

const getCourse = async (req, res) => {
  try {
    const {id} = req.query

    const course = await Courses.findById(id)

    if(!course){
      return res.status(400).json({err: 'This course does not exist'})
    } 
    
    res.json({course})
  } catch (err) {
    res.status(500).json({err: err.message}) 
  }
}

const updateCourse = async (req, res) => {
	try {
		const result = await auth(req, res);
		if (result.role !== 'admin')
			return res.status(400).json({ err: 'Authentication is not valid' });

		const { id } = req.query;
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
			return res.statys(400).json({ err: 'Please add all the fields.' });

		await Courses.findOneAndUpdate(
			{ _id: id },
			{
				title,
        date,
        time,
				price,
				spots,
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

const deleteCourse = async (req, res) => {
	try {
		const result = await auth(req, res);
    console.log(result)
		if (result.role !== 'admin') {
			return res.status(400).json({ err: 'Authentication is not valid' });
		}
		const { id } = req.query;
    
		await Courses.findByIdAndDelete(id);

		res.json({ msg: 'Success! Product was deleted.'});
	} catch (err) {
		return res.status(500).json({ err: res.error });
	}
};
