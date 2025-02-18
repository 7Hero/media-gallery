import { Sidebar } from './components/sidebar';
import { useMediaStore } from './stores/media';
import { useUIStore } from './stores/ui';

function App() {
  const activeFolderId = useUIStore((state) => state.activeFolderId);
  const activeFolder = useMediaStore((state) => state.folders[activeFolderId]);
  const files = useMediaStore((state) => state.files);

  return (
    <div className="w-full min-h-screen flex">
      <Sidebar />
      <main className="flex-1">
        <div>
          {activeFolder.fileIds.map((fileId) => {
            return files[fileId].filename;
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
