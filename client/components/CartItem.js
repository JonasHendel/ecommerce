import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import Link from 'next/link';
import { Trash } from 'phosphor-react';
import { decrease, increase, deleteItem } from '../store/Actions';


const CartItem = ({ item, dispatch, cart }) => {

  // const {state, dispatch} = useContext(DataContext)

  const handleDelete = (id) => {
  }

	return (
		<>
			<tr>
				<td>
					<img style={{ width: 100 }} src={item.images[0].url}></img>
				</td>
				<td>
					<h5>
						<Link href={`shop/product/${item._id}`}>
							<a>{item.title}</a>
						</Link>
					</h5>

					<h6>NOK {item.quantity * item.price}</h6>
					{item.inStock > 0 ? (
						<p>In Stock: {item.inStock}</p>
					) : (
						<p>Not in stock</p>
					)}
				</td>
				<td>
					<button
						className='submit-btn'
						onClick={() => dispatch(decrease(cart, item._id))}
            disabled={item.quantity === 1 ? true : false}
					>
						-
					</button>
					<span>{item.quantity}</span>
					<button
						className='submit-btn'
						onClick={() => dispatch(increase(cart, item._id))}
            disabled={item.quantity === item.inStock ? true : false}
					>
						+
					</button>
				</td>
				<td>
					<Trash size={30} color='red' onClick={handleDelete} />
				</td>
			</tr>
		</>
	);
};

export default CartItem;
