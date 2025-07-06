
const TaskFilter = ({ currentFilter, onFilterChange, taskCounts = {} }) => {
  const filters = [
    { key: 'all', label: 'All Tasks', count: taskCounts.all || 0 },
    { key: 'pending', label: 'Pending', count: taskCounts.pending || 0 },
    { key: 'completed', label: 'Completed', count: taskCounts.completed || 0 }
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(filter => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 
                     transform hover:scale-105 flex items-center gap-2
                     ${currentFilter === filter.key
                       ? 'bg-blue-500 text-white shadow-lg'
                       : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                     }`}
        >
          {filter.label}
          <span className={`px-2 py-0.5 rounded-full text-xs
                          ${currentFilter === filter.key
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                          }`}>
            {filter.count}
          </span>
        </button>
      ))}
    </div>
  );
};

export default TaskFilter;
