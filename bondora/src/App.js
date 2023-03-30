import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import  Dashboard from './components/Dashboard';
import SignIn from './components/SignIn';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
