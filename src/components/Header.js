import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      {' '}
      <h1>Welcome to my online wardrobe!</h1>
      <nav className='navbar d-flex justify-content-center bg-light'>
        <ul className='nav border-bottom'>
          <li className='nav-item'>
            <Link className='navbar-brand mb-0 h1' aria-current='page' to='/'>
              My Wardrobe
            </Link>
          </li>
          <li>
            <Link className='navbar-brand mb-0 h2' to='/about'>
              About
            </Link>
          </li>
          <li>
            <Link className='navbar-brand mb-0 h2' to='/new-item'>
              Create New Item
            </Link>
          </li>
          <li>
            <Link className='navbar-brand mb-0 h2 login' to='/login'>
              Login
            </Link>
          </li>
          <li>
            <Link className='navbar-brand mb-0 h2' to='/signup'>
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
