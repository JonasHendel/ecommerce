import dbConnect from '../../../utils/dbConnect'
import Categories from '../../../models/categoriesModel'
import auth from '../../../middleware/auth'

dbConnect()

export default async (req, res) => {
  switch(req.method){
    case 'POST':
      await updateCategory(req, res)
      break;
    case 'DELETE':
      await deleteCategory(req, res)
      break;
  }
}

const updateCategory = async (req, res) => {
  try {
    const result = await auth(req, res)
    if(result.user.role != 'admin'){
      res.status(400).json({err: 'Authentication is not valid.'})
    }
  
    const {id} = req.query

    const {name} = req.body
  
    await Categories.findOneAndUpdate({_id: id}, {name})
    res.json({msg: 'Success! Category was updated'})
  } catch (err) {
    res.status(500).json({err: err.message})
  }
}
const updateCategory = async (req, res) => {
  try {
    const result = await auth(req, res)
    if(result.user.role != 'admin'){
      res.status(400).json({err: 'Authentication is not valid.'})
    }
  
    const {id} = req.query

    const {name} = req.body
  
    await Categories.findOneAndDelete({_id: id})
    res.json({msg: 'Success! Category was deleted'})
  } catch (err) {
    res.status(500).json({err: err.message})
  }
}