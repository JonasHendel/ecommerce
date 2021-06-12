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
							<th className='text-left'>Date</th>
							<th className='text-left'>Total</th>
              {title !== 'tickets' && 
							  <th className=''>Delivered</th>
              }
							<th className='text-left'>Action</th>
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
              {title !== 'tickets' && 
								<td className='flex justify-center h-14 items-center'>
									{order.delivered ? (
										<CheckCircle className=' text-xl text-green-500' />
									) : (
										<XCircle className='text-xl text-red-600' />
									)}
								</td>
              }
								<td>
                {title === 'tickets' ?
									<Link href={`/admin/tickets/ticket/${order._id}`}>
										<a className='underline'>Details</a>
									</Link> : <Link href={`/admin/order/${order._id}`}>
										<a className='underline'>Details</a>
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