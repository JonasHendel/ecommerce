import dbConnect from '../../../utils/dbConnect'
import Events from '../../../models/eventModel'
import auth from '../../../middleware/auth';
import { Router } from 'next/router';


dbConnect()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getEvent(req, res)
      break;
      case 'PUT':
        await updateEvent(req, res);
        break;
      case 'DELETE':
        await deleteEvent(req, res);
        break;
  }
} 

const getEvent = async (req, res) => {
  try {
    const {id} = req.query

    const event = await Events.findById(id)

    if(!event){
      return res.status(400).json({err: 'This event does not exist'})
    } 
  
    res.json({event})
  } catch (err) {
    res.status(500).json({err: err.message}) 
  }
}

const updateEvent = async (req, res) => {
	try {
		const result = await auth(req, res);
		if (result.role !== 'admin')
			return res.status(400).json({ err: 'Authentication is not valid' });

		const { id } = req.query;
		const {
			title,
			description,
			content,
			images,
		} = req.body;


		if (
			!title ||
			!description ||
			!content ||
			images.length === 0
		)
			return res.statys(400).json({ err: 'Please add all the fields.' });

		await Events.findOneAndUpdate(
			{ _id: id },
			{
				title,
				description,
				content,
				images,
			}
		);

		res.json({ msg: 'Success! Event was updated' });
	} catch (err) {
		return res.status(500).json({ err: err.message });
	}
};

const deleteEvent = async (req, res) => {
	try {
		const result = await auth(req, res);
		if (result.role !== 'admin') {
			return res.status(400).json({ err: 'Authentication is not valid' });
		}
		const { id } = req.query;

    const event = await Events.findById(id)
    
		await Events.findByIdAndUpdate((id), {
      checked: !event.checked
    });
    

		res.json({ msg: 'Success! Product was deleted.'});
	} catch (err) {
		return res.status(500).json({ err: res.error });
	}
};
