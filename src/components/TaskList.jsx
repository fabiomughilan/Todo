
import { Check, Trash2, Edit, Calendar, Tag } from 'lucide-react';

const TaskList = ({ tasks, onToggle, onDelete, onEdit }) => {
  if (tasks.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 text-center animate-fade-in">
        <p className="text-gray-500 dark:text-gray-400">No tasks found. Create your first task!</p>
      </div>
    );
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-500 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20';
      case 'low': return 'border-green-500 bg-green-50 dark:bg-green-900/20';
      default: return 'border-blue-500 bg-white dark:bg-gray-800';
    }
  };

  const getPriorityBadgeColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
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

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();
    const isPast = date < today && !isToday;

    if (isToday) return { text: 'Today', class: 'text-orange-600 dark:text-orange-400' };
    if (isTomorrow) return { text: 'Tomorrow', class: 'text-blue-600 dark:text-blue-400' };
    if (isPast) return { text: date.toLocaleDateString(), class: 'text-red-600 dark:text-red-400' };
    return { text: date.toLocaleDateString(), class: 'text-gray-600 dark:text-gray-400' };
  };

  return (
    <div className="space-y-3">
      {tasks.map((task, index) => {
        const dueDate = formatDueDate(task.dueDate);
        
        return (
          <div
            key={task.id}
            className={`rounded-lg shadow-sm p-4 border-l-4 transition-all duration-300 ease-in-out
                       transform hover:scale-[1.02] hover:shadow-md animate-fade-in
                       ${task.completed 
                         ? 'bg-gray-50 dark:bg-gray-700/50 border-gray-400' 
                         : getPriorityColor(task.priority)
                       }`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className={`font-medium transition-all duration-200 ${
                    task.completed 
                      ? 'line-through text-gray-500 dark:text-gray-400' 
                      : 'text-gray-800 dark:text-gray-200'
                  }`}>
                    {task.title}
                  </h3>
                  
                  {task.priority && (
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadgeColor(task.priority)}`}>
                      {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                    </span>
                  )}
                  
                  {task.category && (
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(task.category)}`}>
                      <Tag size={10} className="mr-1" />
                      {task.category}
                    </span>
                  )}
                </div>
                
                {task.description && (
                  <p className={`text-sm mt-1 transition-all duration-200 ${
                    task.completed 
                      ? 'line-through text-gray-400 dark:text-gray-500' 
                      : 'text-gray-600 dark:text-gray-300'
                  }`}>
                    {task.description}
                  </p>
                )}
                
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                  
                  {dueDate && (
                    <div className={`flex items-center text-xs ${dueDate.class}`}>
                      <Calendar size={12} className="mr-1" />
                      Due: {dueDate.text}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => onToggle(task.id)}
                  className={`p-2 rounded-full transition-all duration-200 transform hover:scale-110 ${
                    task.completed
                      ? 'bg-green-100 text-green-600 hover:bg-green-200 dark:bg-green-800 dark:text-green-200 dark:hover:bg-green-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                  title={task.completed ? 'Mark as pending' : 'Mark as complete'}
                >
                  <Check size={16} />
                </button>

                <button
                  onClick={() => onEdit(task)}
                  className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 
                           dark:bg-blue-800 dark:text-blue-200 dark:hover:bg-blue-700
                           transition-all duration-200 transform hover:scale-110"
                  title="Edit task"
                >
                  <Edit size={16} />
                </button>

                <button
                  onClick={() => onDelete(task.id)}
                  className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200 
                           dark:bg-red-800 dark:text-red-200 dark:hover:bg-red-700
                           transition-all duration-200 transform hover:scale-110"
                  title="Delete task"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
