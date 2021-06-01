import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import CourseItem from '../../components/CourseItem'
import Link from 'next/link';

import { getData } from '../../utils/fetchData';

const courseOverview = (props) => {
	const [courses, setCourses] = useState(props.courses);

	useEffect(() => {
		setCourses(props.courses);
	}, [props.courses]);


	return (
		<div className='max-w-7xl min-h-screen mx-auto px-2 sm:px-6 lg:px-8'>
    <div className='grid grid-cols-2'>
			{courses.length === 0 ? (
				<h2>No products</h2>
			) : (
				courses.map((course) => (
					<Link href={`course/${course._id}`}>
						<CourseItem course={course}/>
					</Link>
				))
			)}
    </div>
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
