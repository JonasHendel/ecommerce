const ProductItem = ({product}) => {

  const { title, description, inStock, price, images} = product

  console.log(images)
  return(
    <>
    <div>
      <img src={images[0].url}/>
      <h1>{title}</h1>
      <h4>{description}</h4>
      <h4>{price}</h4>
      <h5>{inStock}</h5>
    </div>
    </>
  )
}

export default ProductItem