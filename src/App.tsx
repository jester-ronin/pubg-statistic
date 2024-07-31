import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthorizationPage from './components/AuthorizationPage/AuthorizationPage';
import PlayerStatistic from './components/PlayerStatistic/PlayerStatistic';



const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthorizationPage />} />
        <Route path="/player/:playerName" element={<PlayerStatistic />} />
      </Routes>
    </Router>
  );
}

export default App;
