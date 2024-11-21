import React, { useState, useEffect } from 'react';
import './index.css';

const Page = () => {
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLogin, setShowLogin] = useState(true); // Toggle giữa Login và Register
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        confirmPassword: '',
    });
    const [loggedInUser, setLoggedInUser] = useState(null);

    const [cartItems, setCartItems] = React.useState([]);
    const [cartTotal, setCartTotal] = React.useState(0);
    const [isPopoverVisible, setPopoverVisible] = React.useState(false);

    const togglePopover = () => {
        setPopoverVisible(!isPopoverVisible);
    };
    



    useEffect(() => {
        const storedItems = localStorage.getItem('products');
        if (storedItems) {
          setItems(JSON.parse(storedItems));
          setLoggedInUser(storedItems)
        }
      }, []);

      const handleItemClick = (item) => {
        setSelectedItem(item);
        // Trigger Bootstrap modal
        const modal = new window.bootstrap.Modal(document.getElementById('productModal'));
        modal.show();
      };

      const handleAddToCart = (event, item) => {
        event.stopPropagation(); // Ngăn chặn sự kiện bong bóng
        setCartItems((prevItems) => {
            const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
            if (existingItem) {
                return prevItems.map((cartItem) =>
                    cartItem.id === item.id
                        ? { ...cartItem, quantity: cartItem.quantity + 1 }
                        : cartItem
                );
            }
            return [...prevItems, { ...item, quantity: 1 }];
        });
    
        setCartTotal((prevTotal) => prevTotal + item.price);
    };
    

    useEffect(() => {
        // Kiểm tra trạng thái đăng nhập từ localStorage
        const loggedInUser = localStorage.getItem('authenticatedUser');
        if (loggedInUser) {
        setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find((u) => u.username === username && u.password === password);

        if (user) {
        setLoggedInUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('authenticatedUser', JSON.stringify(user));
        const modal = window.bootstrap.Modal.getInstance(document.getElementById('authModal'));
        modal.hide(); // Ẩn modal sau khi đăng nhập thành công
        } else {
        setError('Tên đăng nhập hoặc mật khẩu không đúng.');
        }
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const { firstname, lastname, username, password, confirmPassword } = formData;

        if (password !== confirmPassword) {
        setError('Mật khẩu nhập lại không khớp.');
        return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const newUser = {
        id: Date.now(),
        firstname,
        lastname,
        username,
        password,
        };

        localStorage.setItem('users', JSON.stringify([...users, newUser]));
        setFormData({
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        confirmPassword: '',
        });
        setShowLogin(true); // Chuyển sang giao diện đăng nhập
        setError('');
    };
  return (
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <img width={50} src='https://www.nestlemilo.com.vn/sites/default/files/header/media/desktop/milo-logo-header.png'/>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                </ul>
                <form className="d-flex">
                    <div className="cart-icon" onClick={togglePopover}>
                        🛒
                        {cartItems.length > 0 && <span className="cart-count">{cartItems.length}</span>}
                    </div>

                    {!isAuthenticated ? (
                        <button
                        className="btn btn-outline-primary"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#authModal"
                        >
                        Đăng Nhập
                        </button>
                    ) : (
                        <div className='d-flex align-items-center'>
                            <span>
                                {loggedInUser.username}
                            </span>
                            <button
                            className="btn btn-outline-danger"
                            type="button"
                            onClick={() => {
                                setIsAuthenticated(false);
                                localStorage.removeItem('authenticatedUser');
                                setLoggedInUser(null);
                            }}
                            >
                            Đăng Xuất
                            </button>
                        </div>
                    )}
                    </form>
                </div>
            </div>
        </nav>

        <div class="container">
            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img className='w-100' src={'https://www.nestlemilo.com.vn/sites/default/files/2023-11/d-pha-milo-kieu-moi.png'} alt="Item" />
                    </div>
                    <div class="carousel-item">
                        <img className='w-100' src={'https://www.nestlemilo.com.vn/sites/default/files/2024-05/d-sua-lua-mach-milo-it-duong.jpg'} alt="Item" />
                    </div>
                    <div class="carousel-item">
                        <img className='w-100' src={'https://www.nestlemilo.com.vn/sites/default/files/2022-06/d-milo-e-academy_1.png'} alt="Item" />
                    </div>
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>

            <div class="block__title text-center mt-4 mb-4">
                <h2 class="title__wrap">
                    <span class="heading--outline">KHÁM PHÁ</span>
                    <span class="heading--filled">
                    <span class="title__inner-text">"GIA ĐÌNH" MILO</span>
                </span>
                </h2>
            </div>

            <div className="row">
                {items.length > 0 ? (
                    items.map((item, index) => (
                    <div className="col-md-3 mb-4 d-flex" key={index}>
                        <div className="product__banner"
                            onClick={() => handleItemClick(item)} >
                                <img
                                    src={item.image || 'https://via.placeholder.com/150'}
                                    className="card-img-top"
                                    alt={item.name || 'Item'}
                                />
                            <div className='product__tagline'>
                                Bữa sáng
                            </div>
                            <div className='py-1 px-2'>
                                <div class="product__category">{item.category}</div>
                                <div class="product__title">
                                    <h4 class="title">
                                        {item.title}
                                    </h4>
                                </div>
                                <div class="product__note">{item.kg}</div>
                                {/* <div class="product__desc">
                                    {item.description}
                                </div> */}
                            </div>
                            <div className='btn btn-secondary w-100 mt-3' onClick={(e) => {
                                handleAddToCart(e, item)}}>Thêm vào giỏ hàng</div>
                        </div>
                    </div>
                    ))
                ) : (
                    <p>Không có sản phẩm nào.</p>
                )}
            </div>

            <div class="block__title text-center mt-4 mb-4">
                <h2 class="title__wrap">
                    <span class="heading--outline">NĂNG LƯỢNG ĐỂ TRẺ LỚN KHÔN</span>
                    <span class="heading--filled">
                    <span class="title__inner-text">CÙNG THỂ THAO</span>
                </span>
                </h2>
            </div>
        </div>

        <footer>
            <div className='footer-top'>
                <div className='footer-container container'>
                    <div className='footer__logo--milo'>
                        <img width={'100'} src='https://www.nestlemilo.com.vn/sites/default/files/header/media/desktop/milo-logo-footer.png'></img>
                    </div>
                </div>
            </div>
        </footer>

        
        <div className={`cart-popover ${isPopoverVisible ? 'visible' : ''}`}>
            {cartItems.length > 0 ? (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.id} className="cart-item">
                            <img src={item.image} alt={item.name} width="50" />
                            <div>
                                <div>{item.name}</div>
                                <div>Số lượng: {item.quantity}</div>
                                <div>Giá: {item.price}₫</div>
                            </div>
                        </div>
                    ))}
                    <div className="cart-total">Tổng tiền: {cartTotal}₫</div>
                    <button className="btn btn-primary">Xác nhận mua hàng</button>
                </div>
            ) : (
                <p>Giỏ hàng rỗng</p>
            )}
        </div>

        {/* Bootstrap Modal */}
        <div
            className="modal fade"
            id="productModal"
            tabIndex="-1"
            aria-labelledby="productModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="productModalLabel">
                    {selectedItem?.title}
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
                </div>
                <div className="modal-body">
                <img
                    src={selectedItem?.image || 'https://via.placeholder.com/150'}
                    alt={selectedItem?.title}
                    className="img-fluid mb-3"
                />
                <p><strong>Thể loại:</strong> {selectedItem?.category}</p>
                <p><strong>Kg:</strong> {selectedItem?.kg}</p>
                <p><strong>Mô tả:</strong> {selectedItem?.description || 'Không có mô tả.'}</p>
                </div>
                <div className="modal-footer">
                <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                >
                    Đóng
                </button>
                </div>
            </div>
            </div>
        </div>

        {/* Modal Authentication */}
        <div
            className="modal fade"
            id="authModal"
            tabIndex="-1"
            aria-labelledby="authModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                <h5 className="modal-title" id="authModalLabel">
                    {showLogin ? 'Đăng Nhập' : 'Đăng Ký'}
                </h5>
                <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                ></button>
                </div>
                <div className="modal-body">
                {showLogin ? (
                    <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Tên đăng nhập"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                        type="password"
                        className="form-control"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit" className="btn btn-success w-100">
                        Đăng Nhập
                    </button>
                    <p
                        className="text-center mt-4"
                        style={{ cursor: 'pointer', color: 'green' }}
                        onClick={() => {
                        setShowLogin(false);
                        setError('');
                        }}
                    >
                        Chưa có tài khoản? Đăng Ký
                    </p>
                    </form>
                ) : (
                    <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Họ"
                        value={formData.lastname}
                        onChange={(e) =>
                            setFormData({ ...formData, lastname: e.target.value })
                        }
                        />
                    </div>
                    <div className="mb-3">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Tên"
                        value={formData.firstname}
                        onChange={(e) =>
                            setFormData({ ...formData, firstname: e.target.value })
                        }
                        />
                    </div>
                    <div className="mb-3">
                        <input
                        type="text"
                        className="form-control"
                        placeholder="Tên đăng nhập"
                        value={formData.username}
                        onChange={(e) =>
                            setFormData({ ...formData, username: e.target.value })
                        }
                        />
                    </div>
                    <div className="mb-3">
                        <input
                        type="password"
                        className="form-control"
                        placeholder="Mật khẩu"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })
                        }
                        />
                    </div>
                    <div className="mb-3">
                        <input
                        type="password"
                        className="form-control"
                        placeholder="Nhập lại mật khẩu"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                            setFormData({
                            ...formData,
                            confirmPassword: e.target.value,
                            })
                        }
                        />
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <button type="submit" className="btn btn-success w-100">
                        Đăng Ký
                    </button>
                    <p
                        className="text-center mt-4"
                        style={{ cursor: 'pointer', color: 'green' }}
                        onClick={() => {
                        setShowLogin(true);
                        setError('');
                        }}
                    >
                        Đã có tài khoản? Đăng Nhập
                    </p>
                    </form>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
