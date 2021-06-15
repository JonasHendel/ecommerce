//NPM
import { useState } from 'react';
import { InstagramLogo, FacebookLogo, Phone, At } from 'phosphor-react';
import {motion} from 'framer-motion'
import Head from 'next/head'

import {aboutText} from '../public/about'

//Project Files
import { getData } from '../utils/fetchData';



const about = (/*props*/) => {
	// const [content, setContent] = useState(props.content);

	return (
		<>
    <Head>
      <title>About</title>¨
    </Head>
			<div className='flex flex-col items-center max-w-7xl min-h-screen mx-auto px-2 sm:px-6 lg:px-8 '>
				<div className='flex flex-col items-center mt-10 bg-white ca:shadow-even px-2 sm:px-20 py-5 rounded-2xl'>
					<div>
						<h1 className='text-4xl font-bold mb-9'>
							Hvem er jeg?
						</h1>
					</div>
					<div className='flex flex-col items-center mb-9 md:flex-row md:items-start'>
						<main className='w-10/12 md:w-3/5'>
							<p className='text-md'>{aboutText}</p>
						</main> 
						<div className='w-10/12 mt-9 flex flex-col justify-start md:ml-9 md:w-2/5 md:mt-2'>
							<div className='flex justify-center items-start'>
								<img
									className='w-10/12 h-auto'
									src='./logo.png'
								/>
							</div>
              <div className="flex justify-around h-60">
                <div className='flex flex-col justify-between mt-9'>
                  <div className='flex flex-col justify-center items-center'>
                <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.8}} className="bg-gray-800 text-white w-14 h-14 flex justify-center items-center rounded-full">
                    <At className="text-4xl"/>
                  </motion.div>
                    <p className='text-base ml-2'>
                      example@email.com
                    </p>
                  </div>
                  <div className='flex flex-col justify-center items-center'>
                <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.8}} className="bg-gray-800 text-white w-14 h-14 flex justify-center items-center rounded-full">
                    <Phone className="text-4xl" />
                    </motion.div>
                    <p className='text-base ml-2'>
                      +47 987 231 123
                    </p>
                  </div>
                </div>
							<div className='flex flex-col justify-between mt-9'>
								<div className='flex flex-col justify-center items-center'>
                <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.8}} className="bg-gray-800 text-white w-14 h-14 flex justify-center items-center rounded-full">
									<InstagramLogo className="text-4xl" />
                  </motion.div>
									<p className='text-base ml-2'>@instagram</p>
								</div>
								<div className='flex flex-col justify-center items-center'>
                <motion.div whileHover={{scale: 1.05}} whileTap={{scale: 0.8}} className="bg-gray-800 text-white w-14 h-14 flex justify-center items-center rounded-full">
									<FacebookLogo className="text-4xl" />
                  </motion.div>
									<p className='text-base ml-2'>@facebook</p>
								</div>
							</div>
              </div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

// export async function getServerSideProps() {
// 	const res = await getData('content');
// 	return {
// 		props: {
// 			status: res.status,
// 			content: res.content,
// 		},
// 	};
// }

export default about;
