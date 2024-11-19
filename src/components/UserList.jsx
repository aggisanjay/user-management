import React from 'react';

const UserList = ({ users, onDelete, onEdit, currentPage, totalPages, onPageChange }) => {
  return (
    <div className="user-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name.split(' ')[0]}</td>
              <td>{user.name.split(' ')[1]}</td>
              <td>{user.email}</td>
              <td>{user.company.name}</td>
              <td>
                <button className="edit" onClick={() => onEdit(user)}>Edit</button>
                <button className="delete" onClick={() => onDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
  <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
    Previous
  </button>
  <span>Page {currentPage} of {totalPages}</span>
  <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
    Next
  </button>
</div>

    </div>
  );
};

export default UserList;