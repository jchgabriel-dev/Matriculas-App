import React, { useEffect } from 'react'
import DataTable from "react-data-table-component"
import { useState } from 'react'
import Modal from './Modal'
import { useModal } from '../hooks/useModal'
import StudentCreate from './Student/StudentCreate'
import { studentsData } from './StudentsData'
import StudentEdit from './Student/StudentEdit'


export default function Students() {

    const customStyles = {
        

          tableWrapper: {
            style: {
              overflow: 'hidden',
              height: 'auto',
            },
          },
          responsiveWrapper: {
            style: {
              overflowY: 'auto',
              height: '100%',
            },
          },

        rows: {
            style: {
                border: '2px solid #ddd',
                '&:hover': {
                backgroundColor: '#f5f5f5',
            },
            },
        },
        headCells: {
            style: {
                className: 'custom-table',
                paddingLeft: '12px',
                paddingRight: '8px',
                fontSize: "15px",
                color: "#fff",
                backgroundColor: "#1C2535"
            },
        },
        cells: {
            style: {
                fontSize: "15px",                
                paddingLeft: '20px', 
                paddingRight: '8px',
            },
        },
        pagination: {
            style: {
              backgroundColor: '#2a3950', // Color de fondo de la paginación
              color: '#fff', // Color del texto de la paginación
            },
        },
    };
    
    const columns = [
        { name: "Nombre",
            selector: row => (
                <div>
                    <i className="fas fa-user ml-2"></i>
                    <span className='name-container'>{row.nombre}</span>
                </div>
            ),
            sortable: true
         },
         { name: "Apellido",
            selector: row => row.apellido,
            sortable: true
         },

        { name: "Edad",
            selector: row => row.edad,
            sortable: true
         },
        
         {
            name: "Acciones",
            cell: row => (
                <div>
            <button className='editButton' onClick={() => openModalEditCombo(row)}>Editar <i className='fas fa-pencil '></i></button>
            <button className='deleteButton'  onClick={() => handleDelete(row)}>Borrar <i className='fas fa-trash'></i></button> 
            </div>
            ),
            ignoreRowClick: true,
            
        },
    ]
    
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setRecords(studentsData );
            setLoading(false);
        }, 500);
        return () => clearTimeout(timeout);
    }, [])

    const handleChange = (e) => {
        const filteredRecords =  studentsData.filter(record => {
            return record.nombre.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setRecords(filteredRecords)
    }

    function Loader() {
        return (
            <div>
                <h2>Cargando <i className="fa fa-spinner fa-spin fa-1x fa-fw"></i></h2>
            </div>
        )
    }


    const [isOpenModal, openModal, closeModal] = useModal(false)
    const [isOpenModalEdit, openModalEdit, closeModalEdit] = useModal(false)
    const [selectedStudent, setSelectedStudent] = useState(null);

    const openModalEditCombo = (student) => {
        setSelectedStudent(student);
        openModalEdit();

    };

    const addForm = (newStudent) => {
        newStudent.id = Date.now();
        setRecords([...records, newStudent]);
        studentsData.push(newStudent);
    };

    const editForm = (updatedStudent) => {
        const updatedRecords = records.map((student) => 
            student.id === updatedStudent.id ? updatedStudent : student
        );
        setRecords(updatedRecords);

        const index = studentsData.findIndex((student) => student.id === updatedStudent.id);
        if (index !== -1) {
            studentsData[index] = updatedStudent;
        }
    };

    const handleDelete = (studentToDelete) => {
        if (window.confirm(`¿Estás seguro de eliminar a ${studentToDelete.nombre} ${studentToDelete.apellido}?`)) {
            const updatedRecords = records.filter(student => student.id !== studentToDelete.id);
            setRecords(updatedRecords);
    
            const index = studentsData.findIndex(student => student.id === studentToDelete.id);
            if (index !== -1) {
                studentsData.splice(index, 1);
            }
        }
    };
    
    
    const paginationComponentOptions = {
        rowsPerPageText: 'Filas por página:',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
      };
  
    return (
    
    <div className='container-main'>
        <div className='container-top'>
            <input type="text"
                onChange={handleChange}
                placeholder='Buscar nombre'
                className='input-search'>
                    
            </input>
            
            <button onClick={openModal} className='addButton'>
                Agregar <i className='fas fa-plus '></i>
            </button> 
        </div>
        

        <Modal  isOpen={isOpenModal} closeModal={closeModal}>
            <StudentCreate addForm={addForm} closeModal={closeModal}/>                            
        </Modal>
        <Modal isOpen={isOpenModalEdit} closeModal={closeModalEdit}>
            <StudentEdit student={selectedStudent} editForm={editForm} closeModal={closeModalEdit}/>
        </Modal>


      <DataTable
      title={<div className='title-port'><i className='fas fa-address-book'></i> Datos de los estudiantes</div>}
      pagination
      paginationPerPage={10}
      columns={columns}
      data={records}
      progressPending={loading}            
      progressComponent={<Loader/>}
      customStyles={customStyles}
      paginationComponentOptions={paginationComponentOptions}
      noDataComponent="No hay registros para mostrar"
      >        

      </DataTable>
    </div>
  )
}
