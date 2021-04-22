// NPM
import Head from 'next/head';
import { useState, useContext } from 'react';
import Link from 'next/link';

// CSS
import styles from '../../../styles/Product.module.css';

// Project files
import { getData } from '../../../utils/fetchData';
import { DataContext } from '../../../store/GlobalState'
import { addToCart } from '../../../store/Actions'

const DetailProduct = (props) => {

	const cx = (...classNames) => classNames.join(' ');
 
	const [product] = useState(props.product);
	const [tab, setTab] = useState(0);

  const { state, dispatch } = useContext(DataContext)
  const { cart } = state

  const isActive = (index) => {
    if(tab == index) return cx(styles.imgPreview, styles.active)
    return styles.imgPreview
  }

	return (
		<>
			<Head>
				<title>{product.title}</title>
			</Head>
			<div className={styles.container}>
				<div className={styles.productCard}>
					<div className={styles.images}>
						<img
							className={styles.img}
							src={product.images[tab].url}
						/>
						<div className={styles.imgPreviewDiv} >
							{product.images.map((img, index) => (
								<img
                  className={isActive(index)}
									key={index}
									src={img.url}
									alt={img.url}
									onClick={() => {
										setTab(index);
									}}
								/>
							))}
						</div>
					</div>
					<div className={styles.text}>
						<h1>{product.title}</h1>
						<div className={styles.detailProduct}>
							<p>NOK: {product.price}</p>
							<p>In Stock: {product.inStock}</p>
						</div>
						<p>{product.description}</p>
						<p>{product.content}</p>
						<div className={styles.buttonDiv}>
							<button className='submit-btn' onClick={()=> dispatch(addToCart(product, cart))}>Add to cart</button>
							<Link href='/shop'>
								<button className='cancel-btn'>
									Return to shop
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export async function getServerSideProps({ params: { id } }) {
	const res = await getData(`product/${id}`);

	return {
		props: { product: res.product },
	};
}

export default DetailProduct;
