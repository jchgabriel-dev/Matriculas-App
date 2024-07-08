import React, { useState } from 'react'
import HomeSection from './HomeElements/HomeSection'
import { coursesData } from './CourseData'
import { studentsData } from './StudentsData'

export default function Home() {
  const [alerts, setAlerts] = useState([
    { id: 1, message: 'Evento: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', className: 'alert-success' },
    { id: 2, message: 'Urgente: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', className: 'alert-warning' },
    { id: 3, message: 'Alerta: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', className: 'alert-danger' },
    { id: 4, message: 'Informacion: Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', className: 'alert-info' },
    { id: 5, message: 'Urgente: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', className: 'alert-warning' },
    { id: 6, message: 'Alerta: Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.', className: 'alert-danger' },
    { id: 7, message: 'Evento: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', className: 'alert-success' },
    { id: 8, message: 'Evento: Lorem ipsum dolor sit amet, consectetur adipiscing elit.', className: 'alert-success' },

  ]);

  const courseLength = coursesData.length;
  const studentLength = studentsData.length;
  const closeAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  return (
    <div className='container-main'>
<div className='title-port-2'>
        <i className='fas fa-bookmark  fa-2x'></i>
        <h2>Inicio</h2>
      </div>      <br>
      </br>
      <div className='container-top '>
      <HomeSection icon="fa-user" text="Estudiantes" number={studentLength}>        
        </HomeSection>
  
        <HomeSection icon="fa-book" text="Cursos" number={courseLength}>          
        </HomeSection>
      </div>
      <br>
      </br>
      <div className='title-port-2'>
        <i className='fas fa-exclamation-circle fa-2x'></i>
        <h2>Alertas</h2>
      </div>
     <br></br>
     {alerts.length === 0 ? (
        <p>No hay registros para mostrar</p>
      ):(
        alerts.map(alert => (
          <div key={alert.id} className={`alert ${alert.className}`}>
            <span className="closebtn" onClick={() => closeAlert(alert.id)}>&times;</span>
            <strong>{alert.message}</strong>
          </div>
        )
      )
    
  )
}
      
</div>
  )
};
