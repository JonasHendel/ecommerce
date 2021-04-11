import React, { useState } from 'react'

const Kontakt = () => {
  const [contactInfo, setContactInfo] = useState({
    namel: "",
    email: "",
    content: ""
  })
  return (
    <>
      <div className="Containter">
        <form >
          <input value={contactInfo.namel} onChange={(e)=>{setContactInfo({...contactInfo, namel:e.target.value})}}/>
        </form>
        <h1>{contactInfo.namel}</h1>
      </div>
    </>
  ) 
}

export default Kontakt