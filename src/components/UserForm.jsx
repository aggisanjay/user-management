import React, { useState, useEffect } from 'react';

const UserForm = ({ user, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
  });

  useEffect(() => {
    if (user) {
      const [firstName, lastName] = user.name.split(' ');
      setFormData({
        firstName: firstName || '',
        lastName: lastName || '',
        email: user.email || '',
        department: user.company.name || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: user?.id,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      company: { name: formData.department },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        placeholder="Last Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="text"
        name="department"
        value={formData.department}
        onChange={handleChange}
        placeholder="Department"
        required
      />
      <button type="submit">{user ? 'Save Changes' : 'Add User'}</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default UserForm;
