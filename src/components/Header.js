import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      {' '}
      <h1>Welcome to my online wardrobe!</h1>
      {/* <nav>
        <ul>
          <li>
            <Link to='/about'>About</Link>
          </li>
          <li>
            <Link to='/'>Main Page Wardrobe</Link>
          </li>
        </ul>
      </nav> */}
      <nav className='navbar d-flex justify-content-center bg-light'>
        <Link className='navbar-brand mb-0 h1' aria-current='page' to='/'>
          My Wardrobe
        </Link>
        <Link className='navbar-brand mb-0 h1' to='/about'>
          About
        </Link>
        <Link className='navbar-brand mb-0 h1' to='/new-item'>
          Create New Item
        </Link>
        <Link className='navbar-brand mb-0 h1' to='/signup'>
          Sign Up
        </Link>
      </nav>
    </header>
  );
};

export default Header;
