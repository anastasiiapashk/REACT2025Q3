import { useSelectedItemsStore } from '../store/selectedItemsStore';

const Flyout = () => {
  const selectedItems = useSelectedItemsStore((state) => state.selectedItems);
  const clearAll = useSelectedItemsStore((state) => state.clearAll);

  const handleDownload = () => {
    const headers = ['Name', 'Status', 'Species', 'Image URL', 'ID'];
    const rows = selectedItems.map((char) => [
      char.name,
      char.status,
      char.species,
      char.image,
      char.id,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      )
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${selectedItems.length}_items.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  if (selectedItems.length === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t p-4 flex justify-between items-center z-50">
      <p className="font-medium">
        {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''}{' '}
        selected
      </p>
      <div className="flex gap-4">
        <button onClick={clearAll} className="px-4 py-2 rounded">
          Unselect All
        </button>
        <button onClick={handleDownload} className="px-4 py-2 rounded">
          Download
        </button>
      </div>
    </div>
  );
};

export default Flyout;
