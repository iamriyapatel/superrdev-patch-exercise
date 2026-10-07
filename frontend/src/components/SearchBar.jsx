export default function SearchBar({ value, onChange, suggestions, inputRef, shortcutLabel }) {
  const matchingTitle = value
    ? suggestions.find((task) => task.title.toLowerCase().startsWith(value.toLowerCase()))?.title
    : null;
  const completion = matchingTitle && matchingTitle.length > value.length
    ? matchingTitle
    : null;

  function handleKeyDown(event) {
    const input = inputRef.current;
    const cursorAtEnd = input?.selectionStart === value.length
      && input?.selectionEnd === value.length;

    if (completion && cursorAtEnd && (event.key === 'Tab' || event.key === 'ArrowRight')) {
      event.preventDefault();
      onChange(completion);
    }
  }

  return (
    <div className="search-control">
      {completion && (
        <span className="autocomplete-ghost" aria-hidden="true">
          <span className="autocomplete-prefix">{value}</span>
          {completion.slice(value.length)}
        </span>
      )}
      <input
        ref={inputRef}
        type="text"
        className="search-input"
        placeholder="Search tasks..."
        aria-label="Search tasks"
        aria-autocomplete="inline"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <span className="shortcut-hint" aria-hidden="true">{shortcutLabel}</span>
    </div>
  );
}
