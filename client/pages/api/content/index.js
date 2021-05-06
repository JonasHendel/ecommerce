import dbConnect from '../../../utils/dbConnect'

import Content from '../../../models/contentModel'

dbConnect()

export default async (req, res) => {
  switch(req.method){
    case 'GET':
      await getContent(req, res)
      break;
  }
} 

const getContent = async (req, res) => {
  try {
    const content = await Content.find()


    res.json({
      status: 'success',
      content
    })
  }catch (err) {
    return res.status(500).json({ err: err.message})
  }
}