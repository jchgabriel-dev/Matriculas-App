import React from 'react'
import "./HomeForm.css"


const HomeSection = ({number, text, icon}) => {
  return (
    <div className='column '>
      <div  className={`card-counter ${text}`}>
      <i className={`fa ${icon} fa-4x`}></i>
      <br></br>
      <br></br>

      <p>{text}</p>
      <p>{number} +</p>
      </div>
      
    </div>
  )
}

export default HomeSection
