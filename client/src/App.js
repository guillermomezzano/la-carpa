
import './App.css';
import { Route,Routes,BrowserRouter } from'react-router-dom';
import FormIngresarArtista from "./views/FormIngresarArtista";
import DetalleArtista from "./views/DetalleArtista";
import AgregarDicsiplina from "./views/AgregarDicsiplina";
import Login from "./views/Login";
import Home from "./views/Home" ;
import Search from "./views/Search" ;
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route path='/ingresar/artista' element={<FormIngresarArtista/>} />
          <Route path='/detalle/:id' element={<DetalleArtista/>}/>
          <Route path='/update/:id' element={<FormIngresarArtista/>}/>
          <Route path='/ingresar/disciplina/:id' element={<AgregarDicsiplina/>} />
          <Route path='/search' element={<Search/>} />
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
