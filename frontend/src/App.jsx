import { useState, useEffect, createContext } from 'react';
import axios from 'axios';

import './App.css';

// Criar um contexto para compartilhar os dados dos usuários
const UserContext = createContext();

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users }}>
      <div>
        <h1>Lista de Usuários</h1>
        <ul>
          {users.map(user => (
            <li key={user._id}>{user.name} - {user.email}</li>
          ))}
        </ul>
      </div>
    </UserContext.Provider>
  );
}

export default App;