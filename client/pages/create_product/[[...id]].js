import Head from 'next/head'
import {useState, useContext} from 'react'
import {DataContext} from '../../store/GlobalState'

const ProductManager= () => {
  const initialState = {
    product_id: "",
    title: "",
    price: 0,
    inStock: 0,
    description: 0,
    content: '',
    category: "",
  }

  const [product, setProduct] = useState(initialState)
  const {product_id, title, price, inStock, description, content, category} = product
  
  const {state, dispatch} = useContext(DataContext)
  const {categories} = state


  const handleChange = e => {
    const {name, value} = e.target
    setProduct({...product, [name]: value})
  }

  return (
    <>
    <Head>
      <title>Product manager</title>
    </Head>
       <div className="max-w-7xl h-screen mx-auto px-2 sm:px-6 lg:px-8">
       Create Product
       <form>
         <input className="" type="text" name="product_id" value={product_id} placeholder="Product ID" onChange={handleChange}/>
         <input className="" type="text" name="title" value={title} placeholder="Title" onChange={handleChange}/>
         <input className="" type="text" name="price" value={price} placeholder="Price" onChange={handleChange}/>
         <input className="" type="text" name="inStock" value={inStock} placeholder="Items in stock" onChange={handleChange}/>
         <input className="" type="text" name="description" value={description} placeholder="Description" onChange={handleChange}/>
         <input className="" type="text" name="content" value={content} placeholder="Content" onChange={handleChange}/>
         <input className="" type="text" name="category" value={category} placeholder="Content" onChange={handleChange}/>
         <div>
           <select>
             <option>All products</option>
             {
               categories.map((item)=>(
                 <option key={item._id} value={category}>
                   {item.name}
                 </option>
               ))
             }
           </select>
         </div>
       </form>
     </div>
    </>
  )
}

export default ProductManager