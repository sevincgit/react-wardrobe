import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import Header from './components/Header';
import Container from './components/Container';
import CreateNewItemContainer from './components/CreateNewItemContainer';
import SignUp from './components/SignUp';

// let tshirt = {
//   title: 'T-shirt',
//   definition: 'A nice cotton T-shirt',
// };
// let socks = {
//   title: 'Socks',
//   definition: 'Socks for every day',
// };
// let shorts = {
//   title: 'Shorts',
//   definition: 'A pair of denim shorts',
// };

// const wardrobe = [tshirt, socks, shorts];

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/' element={<Container />} />
          <Route path='/about' element={<div>This is my about page Need to create a component for this!</div>} />
          <Route path='/new-item' element={<CreateNewItemContainer />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' element={<div>Pag not found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
