import './index.css';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';

function App() {
  return (
    <div style={{ backgroundColor: '#0b1d3a', minHeight: '100vh' }}>
      <Header />
      <Dashboard />
    </div>
  );
}

export default App;
