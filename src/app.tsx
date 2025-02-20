import { Outlet } from 'react-router';
import { Sidebar } from './components/sidebar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="w-full min-h-screen flex">
        <Sidebar />
        <Outlet />
      </div>
    </DndProvider>
  );
}

export default App;
