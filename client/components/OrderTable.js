import {XCircle, CheckCircle} from 'phosphor-react'
import Link from 'next/link'

const OrderTable = ({items, title}) => {
	return (
		<div className='mb-10'>
			<h1 className='text-3xl font-bold capitalize'>{title}</h1>
			<div className='overflow-y-scroll h-72'>
				<table className='w-full'>
					<thead className='sticky top-0 z-10 bg-white'>
						<tr className='font-bold uppercase '>
							<th className='text-left'>Id</th>
							<th className='text-left'>Dato</th>
							<th className='text-left'>Total</th>
              {title !== 'billetter' && 
							  <th className=''>Levert</th>
              }
							<th className='text-left'></th>
						</tr>
					</thead>
					<tbody className='divide-y divide-gray-200'>
						{items.map((order) => (
							<tr className='h-14' key={order._id}>
								<td>{order._id}</td>
								<td>
									{new Date(
										order.createdAt
									).toLocaleDateString()}
								</td>
								<td>NOK: {order.total / 100}</td>
              {title !== 'billetter' && 
								<td className='flex justify-center h-14 items-center'>
									{order.delivered ? (
										<CheckCircle className=' text-xl text-green-500' />
									) : (
										<XCircle className='text-xl text-red-600' />
									)}
								</td>
              }
								<td>
                {title === 'billetter' ?
									<Link href={`/details/ticket/${order._id}`}>
										<a className='underline'>Detalier</a>
									</Link> : <Link href={`/details/order/${order._id}`}>
										<a className='underline'>Detalier</a>
									</Link>

                }
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default OrderTable