
import React, { useEffect, useState } from 'react'
import { coursesData } from './CourseData'
import CourseCard from './Courses/CourseCard'
import { useModal } from '../hooks/useModal'
import Modal from './Modal'
import CourseCreate from './Courses/CourseCreate'
import CourseEdit from './Courses/CourseEdit'

export default function Courses() {
  
  // MODALS
  const [isOpenModal, openModal, closeModal] = useModal(false)
  const [isOpenModalEdit, openModalEdit, closeModalEdit] = useModal(false)


  // RECORDS
  const [records, setRecords] = useState([]);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
        setRecords(coursesData );
    }, 0);
    return () => clearTimeout(timeout);
}, [])

  const handleChange = (e) => {
    const filteredRecords =  coursesData.filter(record => {
        return record.nombreCurso.toLowerCase().includes(e.target.value.toLowerCase())
    })
    setRecords(filteredRecords)
  }

  // EDIT FUNCIONTS 
  const [selectedCourse, setSelectedCourse] = useState(null);

  const openModalEditCombo = (course) => {
    setSelectedCourse(course);
    openModalEdit();

  };

  //FUNCIONTS

  const addForm = (course) => {
    course.id = Date.now();
    course.icono = "fa-address-book"
    setRecords([...records, course]);
    coursesData.push(course);
  };

  
  const editForm = (updated) => {
    const updatedRecords = records.map((course) => 
      course.id === updated.id ? updated : course
    );
    setRecords(updatedRecords);

    const index = coursesData.findIndex((course) => course.id === updated.id);
    if (index !== -1) {
      coursesData[index] = updated;
    }
  };

  const handleDelete = (course) => {
    if (window.confirm(`¿Estás seguro de eliminar a ${course.nombreCurso} ?`)) {
        const updatedRecords = records.filter(student => student.id !== course.id);
        setRecords(updatedRecords);

        const index = coursesData.findIndex(student => student.id === course.id);
        if (index !== -1) {
          coursesData.splice(index, 1);
        }
    }
  };

  // RETURN 

  return (
    <div className='container-main'>
       <Modal  isOpen={isOpenModal} closeModal={closeModal}>
          <CourseCreate addForm={addForm} closeModal={closeModal}/>
        </Modal>
        <Modal isOpen={isOpenModalEdit} closeModal={closeModalEdit}>
          <CourseEdit course={selectedCourse} addForm={editForm} closeModal={closeModalEdit} />
        </Modal>

      <div className='container-top'>
            <input type="text"
                onChange={handleChange}
                placeholder='Buscar nombre'
                className='input-search'>
                    
            </input>
            
            <button onClick={openModal} className='addButton' >
                Agregar <i className='fas fa-plus '></i>
            </button> 
        </div>

      <div className='title-port-2'>
        <i className='fas fa-check-circle fa-2x'></i>
        <h2>Datos los cursos</h2>
      </div>
      

      <div className='div-courses'>
        {records.length === 0 ? (
          <p>No hay registros para mostrar</p>
        ):(
          records.map((el) => <CourseCard key={el.id} el={el} onDelete={handleDelete} onEdit={openModalEditCombo}/>)
        )}

      </div>


    </div>
  )
}
