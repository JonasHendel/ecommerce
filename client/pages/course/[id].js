import Head from 'next/head'
import {getData} from '../../utils/fetchData'
import {useState} from 'react'

const Course = (props) =>{
  const [course] = useState(props.course)
    return (
      <>
      <Head>
        <title>{course.title}</title>
      </Head>
      div className='max-w-7xl h-screen mx-auto sm:px-6 lg:px-8 flex justify-center'>
				<div className='flex justify-evenly mt-20 items-center w-4/5 h-1/2 shadow-even rounded-2xl'>
					<div className='flex flex-col h-5/6 justify-center'>
						<img
							className='w-96 mb-2'
							src={course.images[tab].url}
						/>
						<div className='flex'>
							{course.images.map((img, index) => (
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
					<div className='w-96 h-5/6 flex flex-col justify-evenly'>
						<h1 className='capitalize font-bold text-2xl'>
							{course.title}
						</h1>
						<div className={styles.detailcourse}>
							<p className='font-semibold'>
								NOK: {course.price}
							</p>
							{course.inStock !== 0 ? (
								<p className='font-semibold text-green-500'>
									In stock: {course.inStock}
								</p>
							) : (
								<p className='font-semibold text-red-600'>
									Not in stock
								</p>
							)}
						</div>
						<p>{course.description}</p>
						<p>{course.content}</p>
						<div className='flex justify-between'>
            {addedToCart ? <motion.button
								animate={{ scale: [0.9, 1.1, 1.0] }}
                transition={{duration: 0.2}}
								className='h-12 w-60 bg-green-500 text-white rounded-lg'
								onClick={() => {
									dispatch(addToCart(course, cart));
								}}
							>
								<div className='flex items-center justify-center'>
									<ShoppingCart size={20} className='mr-2' />
									In cart
								</div>
							</motion.button> : <motion.button
								whileTap={{ scale: 0.9 }}
								className='h-12 w-60 bg-gray-900 text-white rounded-lg'
								onClick={() => {
									dispatch(addToCart(course, cart));
								}}
							>
								<div className='flex items-center justify-center'>
									<ShoppingCart size={20} className='mr-2' />
									Add to cart
								</div>
							</motion.button> }
								<button className='cancel-btn' onClick={()=>{router.back()}}>
									Return
								</button>
						</div>
					</div>
				</div>
      </>
    )
}

export async function getServerSideProps({ params: { id } }) {
	const res = await getData(`course/${id}`);

	return {
		props: { course: res.course },
	};
}

export default Course;