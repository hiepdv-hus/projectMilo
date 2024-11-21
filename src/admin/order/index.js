import React, { useState, useEffect } from 'react';
import './index.css';

const Admin = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái modal

  // Đọc dữ liệu từ localStorage khi component mount
  useEffect(() => {
    const storedItems = localStorage.getItem('products');
    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
    setIsInitialLoad(false);
  }, []);

  // Ghi dữ liệu vào localStorage khi items thay đổi
  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem('products', JSON.stringify(items));
    }
  }, [items, isInitialLoad]);

  const addItem = () => {
    if (title.trim() !== '' && description.trim() !== '' && date.trim() !== '') {
      const newItem = {
        title,
        description,
        date,
        image,
      };
      setItems([...items, newItem]);
      setTitle('');
      setDescription('');
      setDate('');
      setImage(null);
      setIsModalOpen(!isModalOpen);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container crud-app">
      <div className="row">
        <div className="col">
          <h1 className="text-center mb-4">CRUD App</h1>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#crudModal"
            onClick={() => setIsModalOpen(true)}
          >
            Add Item
          </button>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.description}</td>
                  <td>{item.date}</td>
                  <td>
                    {item.image && (
                      <img src={item.image} alt="Item" className="item-image" />
                    )}
                  </td>
                  <td>
                    <button type="button" className="btn btn-danger mx-2">
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
      <div
        className="modal fade"
        id="crudModal"
        tabIndex="-1"
        aria-labelledby="crudModalLabel"
        aria-hidden="true"
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
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setIsModalOpen(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea
                    id="description"
                    className="form-control"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="date" className="form-label">Date</label>
                  <input
                    type="date"
                    id="date"
                    className="form-control"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">Image</label>
                  <input
                    type="file"
                    id="image"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={addItem}
              >
                {editIndex === null ? 'Add Item' : 'Update Item'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
