import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Course from '../../components/product/ProductItem';
import Link from 'next/link';

import { getData } from '../../utils/fetchData';

const courseOverview = (props) => {
	const [courses, setCourses] = useState(props.courses);

	useEffect(() => {
		setCourses(props.courses);
	}, [props.courses]);

	console.log(courses);

	return (
		<div className='max-w-7xl h-screen mx-auto px-2 sm:px-6 lg:px-8'>
			{courses.length === 0 ? (
				<h2>No products</h2>
			) : (
				courses.map((course) => (
					<Link href={`course/${course._id}`}>
						<h1>{course.title}</h1>
					</Link>
				))
			)}
		</div>
	);
};

export default courseOverview;

export async function getServerSideProps() {
	const res = await getData('course');
	// console.log(res)
	return {
		props: {
			courses: res.courses,
			result: res.result,
		},
	};
}
