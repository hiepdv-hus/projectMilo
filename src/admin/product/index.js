import React, { useState, useEffect } from 'react';
import './index.css';

const Admin = () => {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [kg, setKg] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    if (title.trim() !== '' && description.trim() !== '') {
      const newItem = {
        id: Date.now(), // Tự sinh ID
        title,
        price,
        description,
        kg,
        category,
        date,
        image,
      };
      setItems([...items, newItem]);
      resetForm();
      setIsModalOpen(false); // Đóng modal sau khi thêm item
    } else {
      alert("Yêu cầu nhập tên và mô tả đầy đủ!");
    }
  };

  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setPrice(item.price);
    setDescription(item.description);
    setKg(item.kg);
    setCategory(item.category);
    setDate(item.date);
    setImage(item.image);
    setEditIndex(item.id);  // Lưu lại ID của item đang chỉnh sửa
    setIsModalOpen(true);    // Mở modal
    // document.getElementById("crudModalLabel").innerText = "Edit Item";  // Đổi tiêu đề của modal
  };

  const saveItem = () => {
    if (title.trim() !== '' && description.trim() !== '') {
      const newItem = {
        id: editIndex ? editIndex : Date.now(),  // Nếu có edit, dùng ID của item cần sửa, nếu không dùng ID mới
        title,
        price,
        description,
        kg,
        category,
        date,
        image,
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
      setTitle('');
      setPrice('');
      setDescription('');
      setKg('');
      setCategory('');
      setDate('');
      setImage(null);
      setEditIndex(null);  // Reset index để không còn ở chế độ chỉnh sửa
      setIsModalOpen(false);  // Đóng modal
      document.getElementById("crudModalLabel").innerText = "Add Item";  // Đổi lại tiêu đề modal
    } else {
      alert("Yêu cầu nhập tên và mô tả đầy đủ!");
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

  const resetForm = () => {
    setTitle('');
    setPrice('');
    setDescription('');
    setKg('');
    setCategory('');
    setDate('');
    setImage(null);
  };

  return (
    <div className="container crud-app">
      <div className="row">
        <div className="col">
          <h1 className="text-center mb-4">Danh sách sản phẩm</h1>
          <div className='text-end'>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsModalOpen(true)} // Mở modal khi nhấn nút "Add Item"
            >
              Thêm sản phẩm
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Giá</th>
                <th>Khối lượng</th>
                <th>Thể loại</th>
                <th>Mô tả</th>
                <th>Ngày</th>
                <th>Ảnh</th>
                <th>Hoạt động</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.price}</td>
                  <td>{item.kg}</td>
                  <td>{item.category}</td>
                  <td>{item.description}</td>
                  <td>{item.date}</td>
                  <td>
                    {item.image && (
                      <img src={item.image} alt="Item" className="item-image" />
                    )}
                  </td>
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
                    <label htmlFor="title" className="form-label">Tên</label>
                    <input
                      type="text"
                      id="title"
                      className="form-control"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="title" className="form-label">Giá tiền</label>
                    <input
                      type="text"
                      id="price"
                      className="form-control"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="kg" className="form-label">Khối lượng</label>
                    <input
                      type="text"
                      id="kg"
                      className="form-control"
                      value={kg}
                      onChange={(e) => setKg(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">Thể loại</label>
                    <input
                      type="text"
                      id="category"
                      className="form-control"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Mô tả</label>
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
