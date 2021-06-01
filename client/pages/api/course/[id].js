import dbConnect from '../../../utils/dbConnect'
import Courses from '../../../models/courseModel'

dbConnect()

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getCourse(req, res)
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