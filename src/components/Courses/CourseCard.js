import React from 'react'
import "./FormCourse.css"

const CourseCard = ({el, onEdit, onDelete}) => {
  let {id, icono, nombreCurso, aula} = el
  return (
    <div className='card'>
      <div className='icon-card-2'>
        <i className={`fa ${icono} fa-5x`}></i>

      </div>

      <h2>{nombreCurso}</h2>
      <h4 className='aula-space'>Aula: {aula}</h4>
      <br></br>

      <div className='container-top'>
      <button className='delete-card' onClick={() => onDelete(el)}>Eliminar</button>
      <button className='edit-card' onClick={() => onEdit(el)}>Editar</button>
      </div>
      
 
    </div>
  )
}

export default CourseCard
