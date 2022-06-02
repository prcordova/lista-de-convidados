import React, { useEffect, useState } from 'react';

import './styles.css'
import { Card } from '../../components/Card'

export function Home() {

  const [studentName, setStudentName] = useState('Default');
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({name: '', avatar:''})

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleDateString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'

      })
    }

    setStudents(prevState => [...prevState, newStudent]);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.github.com/users/prcordova');
      const data = await response.json();
      console.log( data.name)
      setUser({
        id:  data.id,
        name: data.name,
        avatar: data.avatar_url
      });
    }
    fetchData()
  
    
  }, [students])

  
  return (
    <div className="container">
      <header>
        <h1>Lista de presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="foto de perfil" />
        </div>
      </header>


      <input type="text"
        placeholder="Digite o nome"
        onChange={e => setStudentName(e.target.value)} />

      <button type="button"
        onClick={handleAddStudent}
      >Adicionar</button>

      {
        students.map(student => (

          <Card
            key={student.time}
            name={student.name}
            time={student.time} />
        ))
      }


    </div>

  )
}