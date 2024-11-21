import React, { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';

// Các component cần hiển thị
import Product from "./product"
import User from "./user"
import Order from "./order"

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeComponent, setActiveComponent] = useState('product'); // state để xác định component đang hiển thị

  const renderComponent = () => {
    switch (activeComponent) {
      case 'product':
        return <Product />;
      case 'user':
        return <User />;
      case 'order':
        return <Order />;
      default:
        return <Product />;
    }
  };

  return (
    <div className="admin-container">
      <div className="sidebar">
        <ul>
          <li>
            <img width={50} src='https://www.nestlemilo.com.vn/sites/default/files/header/media/desktop/milo-logo-header.png'/>
          </li>
          <li onClick={() => setActiveComponent('product')}>Sản phẩm</li>
          <li onClick={() => setActiveComponent('user')}>Tài khoản</li>
          <li onClick={() => setActiveComponent('order')}>Đơn hàng</li>
        </ul>
      </div>
      <div className="content">
      <button
        className='btn btn-danger'
        onClick={() => navigate('/')}
      >
        {'<<<<'} Trang Chủ
      </button>
        {renderComponent()}
      </div>
    </div>
  );
};

export default AdminPanel;
