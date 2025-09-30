import './App.css';
import './Components/NavBar/NavBar.jsx';
import { NavBar } from './Components/NavBar/NavBar.jsx';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {Shop} from './Pages/Shop.jsx';
import { ShopCategory } from './Pages/ShopCategory.jsx';
import {Product} from './Pages/Product';
import {Cart} from './Pages/Cart.jsx';
import {LoginSignup} from './Pages/LoginSignup.jsx';
import { Footer } from './Components/Footer/Footer.jsx';




function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Shop/>} />
          <Route path='/mens' element={<ShopCategory category="men"/>} />
          <Route path='/womens' element={<ShopCategory category="women"/>} />
          <Route path='/kids' element={<ShopCategory category="kid"/>} />
          <Route path='/product' element={<Product/>}>
              <Route path=':productId' element={<Product/>}/>
          </Route>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<LoginSignup/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
