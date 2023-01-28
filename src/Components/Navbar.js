import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import "../App.css"

const Navbar = () => {

  const navigate = useNavigate();
  const totalItems = useSelector(state => state.cart.cartItems)
  const [user, loading, error] = useAuthState(auth);

  const signOutClick = () => {
    auth.signOut();
    navigate('/login');
  }

  return (

    <div>
      <nav className="navbar navbar-expand-lg navbar navbar-dark bg-dark">
        <div className="container-fluid ">
          <a className="navbar-brand" href="/home">
            UY Supply Stores
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarSupportedContent">

            <ul className="navbar-nav me-auto mb-2 mb-lg-0">

              <li className="nav-item ">
                <a className="nav-link " aria-current="page" href="login">
                  Login
                </a>
              </li>

              <li className="nav-item ">
                <a className="nav-link " aria-current="page" href="about">
                  AboutUs
                </a>
              </li>

              <li className="nav-item ">
                <a className="nav-link " aria-current="page" href="product">
                  List a Product
                </a>
              </li>

              <li className="nav-item1 " style={{ display: 'flex' }}>
                <a className="nav-link " aria-current="page">
                  {user?.email}
                </a>
                <NavLink to='/cart1' className="nav-link" >
                  <img src="./images/cart.png" alt="cart" />
                  <p>{totalItems.length}</p>
                </NavLink>
                <a className="nav-link " aria-current="page" href="cart1">
                  <img src="./images/favourite.png" alt="cart" />
                </a>
                <button onClick={() => {
                  localStorage.clear()
                  signOutClick()
                }} className="btn123">Signout</button>
              </li>
            </ul>
          </div>
        </div>
      </nav >
    </div >

  );
};

export default Navbar;
