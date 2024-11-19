import React, { useState, useEffect } from 'react';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import axios from 'axios';
import './styles/styles.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // For editing a user
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);
  const [error, setError] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
    } catch (err) {
      setError('Failed to fetch users. Please try again later.');
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', newUser);
      setUsers([...users, { ...newUser, id: response.data.id || users.length + 1 }]);
      setIsAdding(false);
    } catch (err) {
      setError('Failed to add user.');
    }
  };

  const handleEditUser = async (updatedUser) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedUser.id}`, updatedUser);
      setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
      setSelectedUser(null);
    } catch (err) {
      setError('Failed to update user.');
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      setError('Failed to delete user.');
    }
  };

  const totalPages = Math.ceil(users.length / usersPerPage);
  const currentUsers = users.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

  return (
    <div className="app">
      <h1>User Management</h1>
      {error && <p className="error">{error}</p>}

      <button
        onClick={() => {
          setIsAdding(!isAdding);
          setSelectedUser(null);
        }}
        className="add-user-btn"
      >
        {isAdding ? 'Cancel Add User' : 'Add User'}
      </button>

      <UserList
        users={currentUsers}
        onDelete={handleDeleteUser}
        onEdit={(user) => {
          setSelectedUser(user);
          setIsAdding(false);
        }}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />

      {(isAdding || selectedUser) && (
        <UserForm
          user={selectedUser}
          onSave={selectedUser ? handleEditUser : handleAddUser}
          onCancel={() => {
            setIsAdding(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
