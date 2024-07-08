import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import "./FormCourse.css"

const initialForm = {
    nombreCurso:"",
    aula:"0",

}
const validationForm = (form) => {
    let errors = {}
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    
    if(!form.nombreCurso.trim()) {
        errors.nombreCurso = "El campo 'Nombre' es requerido";
    } else if (!regexName.test(form.nombreCurso.trim())) {
        errors.nombreCurso = "El campo 'Nombre' solo acepta letras y espacios en blanco";
    }
    if(form.aula === "0") {
        errors.aula = "El campo 'Aula' es requerido";
    }           
    return errors;
};


export default function CourseCreate({ addForm, closeModal }) {
  const {form, errors, loading, response, handleChange, handleBlur, handleSubmit, setForm} 
    = useForm(initialForm, validationForm, addForm, closeModal);
  
      

    return (
    <div>
      <h2>Registrar curso</h2>
      <br></br>
      <form onSubmit={handleSubmit}> 
        
        <div className='input-container'>
            <i className="fa fa-book iconEdit"></i>
            <input type='text' id="nombreCurso" 
                name='nombreCurso' value={form.nombreCurso}
                onChange={handleChange} required
                placeholder='Nombre del curso'
                onBlur={handleBlur}/>
        </div>    
        {errors.nombreCurso && <p className="errorP">{errors.nombreCurso}</p>}
        <br></br>

        <div className='input-container'>
            <i className="fa fa-graduation-cap  iconEdit"></i>
            <select className={`select-class ${form.aula === "0" ? 'first-option' : ''}`} 
                id="aula" 
                name='aula' value={form.aula}
                onChange={handleChange} 
                onBlur={handleBlur}>

<option value="0">Selecciona una aula</option>
                <option value="A101">A101</option>
                <option value="B202">B202</option>
                <option value="C303">C303</option>
                <option value="D404">D404</option>
            </select>
        </div>    
        {errors.aula && <p className="errorP">{errors.aula}</p>}
        <br></br>
      

        

        <input type='submit'/>

      </form>
    </div>
  )
}
