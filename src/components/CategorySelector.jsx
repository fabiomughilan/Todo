
import { useState } from 'react';
import { Tag } from 'lucide-react';

const CategorySelector = ({ value, onChange, categories = [] }) => {
  const [newCategory, setNewCategory] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);

  const defaultCategories = ['Work', 'Personal', 'Shopping', 'Health', 'Learning'];
  const allCategories = [...new Set([...defaultCategories, ...categories])];

  const handleAddCategory = () => {
    if (newCategory.trim() && !allCategories.includes(newCategory.trim())) {
      onChange(newCategory.trim());
      setNewCategory('');
      setShowAddCategory(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = [
      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
    ];
    const index = category.length % colors.length;
    return colors[index];
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Category
      </label>
      <div className="flex flex-wrap gap-2 mb-2">
        {allCategories.map(category => (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-200
                       ${value === category 
                         ? getCategoryColor(category) + ' ring-2 ring-blue-500' 
                         : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                       }`}
          >
            <Tag size={12} className="mr-1" />
            {category}
          </button>
        ))}
      </div>
      
      {showAddCategory ? (
        <div className="flex gap-2">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New category name"
            className="flex-1 px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
          />
          <button
            type="button"
            onClick={handleAddCategory}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => {
              setShowAddCategory(false);
              setNewCategory('');
            }}
            className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setShowAddCategory(true)}
          className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
        >
          + Add new category
        </button>
      )}
    </div>
  );
};

export default CategorySelector;
