import Link from 'next/link'

const Course = ({content}) => {
  console.log(content)
  return (
    <div className="">
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <Link href={`course/${content._id}`} >
        <a>View</a>
      </Link>
   </div>
  )
}


export default Course

