import dbConnect from '../../../utils/dbConnect'
import Categories from '../../../models/categoriesModel'
import Products from '../../../models/productModel'
import Courses from '../../../models/courseModel'
import auth from '../../../middleware/auth'

dbConnect()

export default async (req, res) => {
  switch(req.method){
    case 'PUT':
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
    if(result.role != 'admin'){
      res.status(400).json({err: 'Authentication is not valid.'})
    }
  
    const {id} = req.query

    const {name} = req.body
  
    const newCategory = await Categories.findOneAndUpdate({_id: id}, {name})
    res.json({
      msg: 'Success! Category was updated',
      category: {
        ...newCategory._doc,
        name
      }
    })
  } catch (err) {
    res.status(500).json({err: err.message})
  }
}
const deleteCategory = async (req, res) => {
  try {
    const result = await auth(req, res)
    if(result.role != 'admin'){
      res.status(400).json({err: 'Authentication is not valid.'})
    }
  
    const {id} = req.query
  
    await Categories.findByIdAndDelete({_id: id})

    const products = await Products.findOne({category: id})
    if(products) return res.status(400).json({err: 'Please delete all prducts with a this category'})

    res.json({msg: 'Success! Category was deleted'})
  } catch (err) {
    res.status(500).json({err: err.message})
  }
}
