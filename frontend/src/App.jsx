import { useEffect, useRef, useState } from 'react';
import SearchBar from './components/SearchBar';
import StatusFilter from './components/StatusFilter';
import TaskTable from './components/TaskTable';
import { useTasks } from './hooks/useTasks';

export default function App() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('');
  const [page, setPage] = useState(1);
  const searchInputRef = useRef(null);

  const { tasks, total, loading, error, retry } = useTasks(query, status, page, 10);
  const platform = navigator.userAgentData?.platform || navigator.platform || '';
  const shortcutLabel = /mac|ios|iphone|ipad|ipod/i.test(platform) ? '⌘ K' : 'Ctrl K';

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === 'k' && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        searchInputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const totalPages = Math.ceil(total / 10);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Tracker</h1>
        <p className="subtitle">Internal task management</p>
      </header>

      <div className="controls">
        <SearchBar
          value={query}
          suggestions={tasks}
          inputRef={searchInputRef}
          shortcutLabel={shortcutLabel}
          onChange={(value) => { setQuery(value); setPage(1); }}
        />
        <StatusFilter value={status} onChange={(value) => { setStatus(value); setPage(1); }} />
      </div>

      <TaskTable tasks={tasks} loading={loading} error={error} onRetry={retry} />

      {totalPages > 1 && (
        <div className="pagination">
          <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
            Next
          </button>
        </div>
      )}
    </div>
  );
}
