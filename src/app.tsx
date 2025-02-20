import { Outlet } from 'react-router';
import { Sidebar } from './components/sidebar';

function App() {
  return (
    <div className="w-full min-h-screen flex">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default App;
