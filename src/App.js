
import './App.css';
import { Routes,Route } from 'react-router-dom';
import Reg from './components/Reg';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './components/Home';
import DisplayUser from './components/DisplayUser';
import Todo from './components/Todo';
function App() {
  return (
    <>
    <Routes>
      <Route path='reg' element={<Reg/>}></Route>
      <Route path='home' element={<Home/>}></Route>
      <Route path='user' element={<DisplayUser/>}></Route>
      <Route path='todo' element={<Todo/>}></Route>
    </Routes>
    <ToastContainer/>
    </>
  );
}

export default App;
