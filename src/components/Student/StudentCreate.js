import React, { useState } from 'react'
import { useForm } from '../../hooks/useForm'
import "./Form.css"

const initialForm = {
    nombre:"",
    apellido:"",
    edad:"",

}
const validationForm = (form) => {
    let errors = {}
    let regexName = /^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    let regexAge = /^\d{1,3}$/;
    
    if(!form.nombre.trim()) {
        errors.nombre = "El campo 'Nombre' es requerido";
    } else if (!regexName.test(form.nombre.trim())) {
        errors.nombre = "El campo 'Nombre' solo acepta letras y espacios en blanco";
    }

    if(!form.apellido.trim()) {
        errors.apellido = "El campo 'Apellido' es requerido";
    } else if (!regexName.test(form.apellido.trim())) {
        errors.apellido = "El campo 'Apellido' solo acepta letras y espacios en blanco";
    }

    if(!form.edad.trim()) {
        errors.edad = "El campo 'Edad' es requerido";
    } else if (!regexAge.test(form.edad.trim())) {
        errors.edad = "El campo 'Edad' solo acepta números enteros";
    }
   
    return errors;
};


export default function StudentCreate({ addForm, closeModal }) {
  const {form, errors, loading, response, handleChange, handleBlur, handleSubmit, setForm} 
    = useForm(initialForm, validationForm, addForm, closeModal);
  
      

    return (
    <div>
      <h2>Registrar estudiante</h2>
      <br></br>
      <form onSubmit={handleSubmit}> 
        
        <div className='input-container'>
            <i className="fa fa-user icon"></i>
            <input type='text' id="nombre" 
                name='nombre' value={form.nombre}
                onChange={handleChange} required
                placeholder='Nombre'
                onBlur={handleBlur}/>
        </div>    
        {errors.nombre && <p className="errorP">{errors.nombre}</p>}
        <br></br>


        <div className='input-container'>
            <i className="fa fa-address-card icon"></i>
            <input type='text' id="apellido" 
                name='apellido' value={form.apellido}
                onChange={handleChange} required
                placeholder='Apellido'
                onBlur={handleBlur}/>
        </div>
        {errors.apellido && <p className="errorP">{errors.apellido}</p>}
        <br></br>

        <div className='input-container'>
            <i className="fa fa-exchange  icon"></i>        
            <input type='text' id="edad" 
                 name='edad' value={form.edad}
                onChange={handleChange} required
                placeholder='Edad'
                onBlur={handleBlur}/>
        </div>
        {errors.edad && <p className="errorP">{errors.edad}</p>}
        <br></br>

        <input type='submit'/>

      </form>
    </div>
  )
}
