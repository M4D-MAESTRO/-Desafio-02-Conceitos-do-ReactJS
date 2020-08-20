import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(repositorie => {
        setRepositories(repositorie.data)
      })
  }, []);

  async function handleAddRepository() {
    const repositorie = {
      title: "Teste",
      url: "http://",
      techs: "React"
    }

    const response = await api.post('repositories', repositorie)
    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    const { status } = await api.delete(`repositories/${id}`)
    
    if (status === 204) {
      const newRepositorie = repositories.filter(repo => repo.id !== id)
      setRepositories(newRepositorie)
    }else{
      console.log(`Falha - ${status}`)
    }
  }
  /* Luís Henrique de C. Corrêa */
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => {
          return (
            <>
              <li key={repo.id}>{repo.title}</li>
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
          </button>
            </>)
        })}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
