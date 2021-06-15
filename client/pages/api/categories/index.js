import dbConnect from '../../../utils/dbConnect'
import Categories from '../../../models/categoriesModel'
import auth from '../../../middleware/auth'

dbConnect()

export default async (req, res) => {
  switch(req.method){
    case 'POST':
      await createCategory(req, res)
      break;
    case 'GET':
      await getCategories(req, res)
      break;
  }
}

const createCategory = async (req, res) => {
  try {
    const result = await auth(req, res)
    if(result.role !== 'admin'){
      return res.status(400).json({err: "Authentication is not valid."})
    }
    const {name} = req.body

    const category = await Categories.findOne({name})
    if(category){
      return res.status(400).json({err: "This category already exists"})
    }

    if(!name){
      return res.status(400).json({err: "Name can not be left blank."})
    }
    const newCategory = new Categories({name})

    await newCategory.save()

    res.json({
      msg: 'Success! Created a new category',
      newCategory
    })
  } catch (err) {
    res.status(500).json({err: err.message})
  }
} 

const getCategories = async (req, res) => {
  try {
    const categories = await Categories.find({checked: false})

    res.json({
      categories
    })
  } catch (err) {
    res.status(500).json({err: err.message})
  }
} 