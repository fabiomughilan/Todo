
const PrioritySelector = ({ value, onChange }) => {
  const priorities = [
    { value: 'low', label: 'Low', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
    { value: 'medium', label: 'Medium', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
    { value: 'high', label: 'High', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' }
  ];

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Priority
      </label>
      <div className="flex space-x-2">
        {priorities.map(priority => (
          <button
            key={priority.value}
            type="button"
            onClick={() => onChange(priority.value)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200
                       ${value === priority.value 
                         ? priority.color + ' ring-2 ring-blue-500' 
                         : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                       }`}
          >
            {priority.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PrioritySelector;
