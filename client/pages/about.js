import { useState } from 'react';
import { getData } from '../utils/fetchData';

import { InstagramLogo, FacebookLogo, Phone, At } from 'phosphor-react';

import Image from 'next/image';

// TODO make responsive

// TODO add href to icons

const about = (props) => {
	const [content, setContent] = useState(props.content);

	return (
		<>
			<div className='flex flex-col items-center max-w-7xl min-h-screen mx-auto px-2 sm:px6 lg:px-8 '>
				<div className='flex flex-col items-center mt-9'>
					<div>
						<h1 className='text-4xl font-bold mb-9'>
							Hvem er jeg?
						</h1>
					</div>
					<div className='flex'>
						<div className='w-3/5'>
							<p className='text-lg'>{content[0].about}</p>
						</div>
						<div className=' ml-9 w-2/5 flex flex-col justify-evenly'>
							<div className='flex justify-center'>
								<img
									className='w-10/12'
									src='./francesco.png'
								/>
							</div>
              <div className="flex justify-around h-60">
                <div className='flex flex-col justify-between mt-9'>
                  <div className='flex flex-col justify-center items-center'>
                  <div className="bg-gray-200 w-14 h-14 flex justify-center items-center rounded-full">
                    <At className="text-4xl"/>
                  </div>
                    <p className='text-base ml-2'>
                      example@email.com
                    </p>
                  </div>
                  <div className='flex flex-col justify-center items-center'>
                  <div className="bg-gray-200 w-14 h-14 flex justify-center items-center rounded-full">
                    <Phone className="text-4xl" />
                    </div>
                    <p className='text-base ml-2'>
                      +47 987 231 123
                    </p>
                  </div>
                </div>
							<div className='flex flex-col justify-between mt-9'>
								<div className='flex flex-col justify-center items-center'>
                <div className="bg-gray-200 w-14 h-14 flex justify-center items-center rounded-full">
									<InstagramLogo className="text-4xl" />
                  </div>
									<p className='text-base ml-2'>@instagram</p>
								</div>
								<div className='flex flex-col justify-center items-center'>
                <div className="bg-gray-200 w-14 h-14 flex justify-center items-center rounded-full">
									<FacebookLogo className="text-4xl" />
                  </div>
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

export async function getServerSideProps() {
	const res = await getData('content');
	return {
		props: {
			status: res.status,
			content: res.content,
		},
	};
}

export default about;
