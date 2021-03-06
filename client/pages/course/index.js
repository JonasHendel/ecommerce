import React from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import CourseItem from '../../components/CourseItem'
import { DataContext } from '../../store/GlobalState';
import Head from 'next/head'

import { getData } from '../../utils/fetchData';

const courseOverview = (props) => {
	const [courses, setCourses] = useState(props.courses);

	useEffect(() => {
		setCourses(props.courses);
	}, [props.courses]);


	return (
		<div className='max-w-7xl min-h-screen mx-auto px-2 sm:px-6 lg:px-8'>
    <Head>
      <title>Courses</title>
    </Head>
    <div className='flex flex-wrap justify-center sm:justify-start'>
			{courses.length === 0 ? (
					<div className='flex justify-center w-full'>
						<h1 className='mt-20 text-2xl font-bold'>
							Ingen produkter tilgjengelig
						</h1>
					</div>
			) : (
				courses.map((course) => (
						<CourseItem key={course._id} course={course}/>
				))
			)}
    </div>
		</div>
	);
};

export default courseOverview;

export async function getServerSideProps() {
	const res = await getData('course');
	return {
		props: {
			courses: res.courses,
			result: res.result,
		},
	};
}
