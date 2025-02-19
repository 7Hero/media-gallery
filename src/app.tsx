import { Sidebar } from './components/sidebar';
import { useMediaStore } from './stores/media';
import { useUIStore } from './stores/ui';

function App() {
  const { activeFolderId, setActiveFolder } = useUIStore();
  const activeFolder = useMediaStore((state) => state.folders[activeFolderId]);
  const files = useMediaStore((state) => state.files);

  return (
    <div className="w-full min-h-screen flex">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div>
          0 selected
        </div>
        {/* Media Grid */}
        <div className='flex items-center justify-center flex-1'>
          <div>
            {activeFolder.fileIds.map((fileId) =>
              (<div key={fileId}>{files[fileId].filename}</div>)
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
