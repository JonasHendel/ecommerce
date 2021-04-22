//NPM
import Link from 'next/link'
import { useContext } from 'react'
//CSS
import styles from '../../styles/Shop.module.css'
// Project files
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'

const ProductItem = ({product}) => {
  const cx = (...classNames) => classNames.join(' ')
  const { state, dispatch } = useContext(DataContext)

  const { cart } = state

  const userLink = () => {
    return (
      <>
        <div className={styles.buttonDiv}>
          <Link href={`shop/product/${product._id}`}>
            <button className={cx("submit-btn", styles.button)}>View</button>
          </Link>
          <button className={cx("submit-btn", styles.button)} onClick={() => dispatch(addToCart(product, cart))}>Add to cart</button>
        </div>
      </>
    )
  }

  const { title, description, inStock, price, images} = product

  return(
    <>
    <div className={styles.productCard}>
    <div className={styles.imageDiv}>
      <img className={styles.image} src={images[0].url}/>
    </div>
      <div className={styles.text}>
        <div className={styles.details}>
          <p>NOK {price}0.00</p>
          {inStock !== 0 ? <p style={{color: 'green'}}>In stock: {inStock}</p> : <p style={{color: 'red'}}>Not in stock</p>}

        </div>
        <h1 title={title}>{title}</h1>
        <p className={styles.description} title={description}>{description}</p>
        {userLink()}
      </div>
    </div>
    </>
  )
}

export default ProductItem