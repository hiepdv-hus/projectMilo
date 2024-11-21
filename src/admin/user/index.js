import React, { useState, useEffect } from 'react';
import './index.css';

const Admin = () => {
  const [items, setItems] = useState([]);
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Đọc dữ liệu từ localStorage khi component mount
  useEffect(() => {
    const storedItems = localStorage.getItem('users');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
    setIsInitialLoad(false);
  }, []);

  // Ghi dữ liệu vào localStorage khi items thay đổi
  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem('users', JSON.stringify(items));
    }
  }, [items, isInitialLoad]);

  const addItem = () => {
    if (username.trim() !== '' && password.trim() !== '') {
      const newItem = {
        id: Date.now(), // Tự sinh ID
        firstname,
        lastname,
        username,
        password
      };
      setItems([...items, newItem]);
      resetForm();
      setIsModalOpen(false); // Đóng modal sau khi thêm item
    } else {
      alert("Yêu cầu nhập tên và mật khẩu đầy đủ!");
    }
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const handleEdit = (item) => {
    setFirstName(item.firstname);
    setLastname(item.lastname);
    setUsername(item.username);
    setPassword(item.password);
    setEditIndex(item.id);  // Lưu lại ID của item đang chỉnh sửa
    setIsModalOpen(true);    // Mở modal
    // document.getElementById("crudModalLabel").innerText = "Edit Item";  // Đổi tiêu đề của modal
  };

  const saveItem = () => {
    if (username.trim() !== '' && password.trim() !== '') {
      const newItem = {
        id: editIndex ? editIndex : Date.now(),  // Nếu có edit, dùng ID của item cần sửa, nếu không dùng ID mới
        firstname,
        lastname,
        username,
        password
      };
  
      // Cập nhật danh sách items
      if (editIndex) {
        const updatedItems = items.map(item =>
          item.id === editIndex ? newItem : item
        );
        setItems(updatedItems);
      } else {
        setItems([...items, newItem]);
      }
  
      // Reset các giá trị sau khi lưu
      setFirstName('');
      setLastname('');
      setUsername();
      setPassword('');
      setEditIndex(null);  // Reset index để không còn ở chế độ chỉnh sửa
      setIsModalOpen(false);  // Đóng modal
      document.getElementById("crudModalLabel").innerText = "Add Item";  // Đổi lại tiêu đề modal
    } else {
      alert("Yêu cầu nhập tên và mô tả đầy đủ!");
    }
  };

  const resetForm = () => {
    setFirstName('');
    setLastname('');
    setUsername();
    setPassword('');
  };

  return (
    <div className="container crud-app">
      <div className="row">
        <div className="col">
          <h1 className="text-center mb-4">Danh sách tài khoản</h1>
          <div className='text-end'>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsModalOpen(true)} // Mở modal khi nhấn nút "Add Item"
            >
              Thêm tài khoản
            </button>
          </div>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Username</th>
                <th>Password</th>
                <th>Hoạt động</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.firstname}</td>
                  <td>{item.lastname}</td>
                  <td>{item.username}</td>
                  <td>{item.password}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-warning mx-2"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger mx-2"
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="modal fade show"
          id="crudModal"
          tabIndex="-1"
          aria-labelledby="crudModalLabel"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
              <h5 className="modal-title" id="crudModalLabel">
                {editIndex === null ? 'Add Item' : 'Edit Item'}
              </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setIsModalOpen(false)} // Đóng modal khi nhấn nút Close
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Firstname</label>
                    <input
                      type="text"
                      id="firstname"
                      className="form-control"
                      value={firstname}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="kg" className="form-label">Lastname</label>
                    <input
                      type="text"
                      id="lastname"
                      className="form-control"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">Username</label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">Password</label>
                    <input
                      type="text"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setIsModalOpen(false)} // Đóng modal khi nhấn nút Close
                >
                  Close
                </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveItem}  // Gọi hàm saveItem thay vì addItem
              >
                {editIndex ? 'Save Item' : 'Add Item'}
              </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
