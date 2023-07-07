import './App.css';
import Footer from './component/Footer';
import Navbar from './component/Navbar';
import { BrowserRouter, Routes,Route } from 'react-router-dom';
import SignUp from './component/SignUp';
import PrivateComponent from './component/PrivateComponent';
import Login from './component/Login';
import AddProduct from './component/AddProduct';
import ProductList from './component/ProductList';
import UpdateProduct from './component/UpdateProduct';

function App() {
  return (<>
  <BrowserRouter>
  <Navbar/>    
  <Routes>
    <Route element={<PrivateComponent/>}>
    <Route path='/product' element={<ProductList/>}/>
    <Route path='/add' element={<AddProduct/>}/>
    <Route path='/update/:id' element={<UpdateProduct/>}/>
    <Route path='/logout' element={<h1>logout</h1>}/>
    <Route path='/profile' element={<h1>profile</h1>}/>
    </Route>
    <Route path='/signup' element={<SignUp/>}/>
    <Route path='/login' element={<Login/>}/>
     </Routes>
  </BrowserRouter>
    
    
    <Footer/>
    </>
  );
}

export default App;
