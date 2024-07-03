import './App.css';
import Header from './component/Header';
import Footer from './component/Footer';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <Header/>
      <main>  
        <Outlet/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
