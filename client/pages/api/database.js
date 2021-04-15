import dbConnnect from '../../utils/dbConnect'

dbConnnect();

export default async (req, res) => {
  res.json({ test: 'test'})
}