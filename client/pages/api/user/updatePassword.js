import dbConnect from '../../../utils/dbConnect'
import Users from '../../../models/userModel'
import auth from '../../../middleware/auth'
import bcrypt from 'bcrypt'

export default async (req, res) => {
  switch(req.method){
    case 'PATCH':
      await updatePassword(req, res)
      break;
  }
}

const updatePassword = async (req, res)  => {
  try {
    const result = await auth(req, res)

    const {password} = req.body
    const passwordHash = await bcrypt.hash(password, 12)
    await Users.findOneAndUpdate({_id: result.id}, {password: passwordHash})

    res.json({msg: "Success! Password was updated"})
  } catch (err)  {
    res.status(500).json({err: err.message})
  }
} 