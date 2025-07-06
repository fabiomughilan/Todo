
import { useState, useEffect, useMemo } from 'react';
import LoginForm from './LoginForm';
import TaskList from './TaskList';
import TaskForm from './TaskForm';
import TaskFilter from './TaskFilter';
import TaskSearch from './TaskSearch';
import ThemeToggle from './ThemeToggle';
import { loadTasks, saveTasks, loadUser, saveUser, clearUser } from '../utils/storage';

const TaskManager = () => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const savedUser = loadUser();
    if (savedUser) {
      setUser(savedUser);
      const savedTasks = loadTasks(savedUser);
      setTasks(savedTasks);
      
      // Extract unique categories from tasks
      const uniqueCategories = [...new Set(savedTasks.map(task => task.category).filter(Boolean))];
      setCategories(uniqueCategories);
    }
  }, []);

  const handleLogin = (username) => {
    const userData = { username };
    setUser(userData);
    saveUser(userData);
    const userTasks = loadTasks(userData);
    setTasks(userTasks);
    
    // Extract unique categories
    const uniqueCategories = [...new Set(userTasks.map(task => task.category).filter(Boolean))];
    setCategories(uniqueCategories);
  };

  const handleLogout = () => {
    setUser(null);
    setTasks([]);
    setFilter('all');
    setEditingTask(null);
    setSearchTerm('');
    setCategories([]);
    clearUser();
  };

  const addTask = (taskData) => {
    const newTask = {
      id: Date.now().toString(),
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority || 'medium',
      category: taskData.category || '',
      dueDate: taskData.dueDate || '',
      completed: false,
      createdAt: new Date().toISOString()
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    saveTasks(user, updatedTasks);
    
    // Update categories if new category was added
    if (taskData.category && !categories.includes(taskData.category)) {
      setCategories([...categories, taskData.category]);
    }
  };

  const updateTask = (taskId, taskData) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId
        ? { 
            ...task, 
            title: taskData.title, 
            description: taskData.description,
            priority: taskData.priority || 'medium',
            category: taskData.category || '',
            dueDate: taskData.dueDate || ''
          }
        : task
    );
    setTasks(updatedTasks);
    saveTasks(user, updatedTasks);
    setEditingTask(null);
    
    // Update categories if new category was added
    if (taskData.category && !categories.includes(taskData.category)) {
      setCategories([...categories, taskData.category]);
    }
  };

  const toggleTask = (taskId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(user, updatedTasks);
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
    saveTasks(user, updatedTasks);
  };

  // Enhanced filtering and searching
  const filteredAndSearchedTasks = useMemo(() => {
    let filtered = tasks;

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower) ||
        task.category.toLowerCase().includes(searchLower)
      );
    }

    // Apply status filter
    if (filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    } else if (filter === 'pending') {
      filtered = filtered.filter(task => !task.completed);
    }

    // Sort by priority and due date
    filtered.sort((a, b) => {
      // First sort by completion status
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      // Then by priority
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      const priorityDiff = (priorityOrder[b.priority] || 2) - (priorityOrder[a.priority] || 2);
      if (priorityDiff !== 0) return priorityDiff;

      // Then by due date
      if (a.dueDate && b.dueDate) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      }
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;

      // Finally by creation date
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return filtered;
  }, [tasks, filter, searchTerm]);

  // Calculate task counts for filter badges
  const taskCounts = useMemo(() => {
    const searchFiltered = searchTerm.trim() 
      ? tasks.filter(task => {
          const searchLower = searchTerm.toLowerCase();
          return task.title.toLowerCase().includes(searchLower) ||
                 task.description.toLowerCase().includes(searchLower) ||
                 task.category.toLowerCase().includes(searchLower);
        })
      : tasks;

    return {
      all: searchFiltered.length,
      pending: searchFiltered.filter(task => !task.completed).length,
      completed: searchFiltered.filter(task => task.completed).length
    };
  }, [tasks, searchTerm]);

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-6xl mx-auto p-6">
        <header className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">My Tasks</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome back, {user.username}!</p>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 
                         transition-all duration-200 transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-6">
            <TaskForm
              onSubmit={editingTask ? (data) => updateTask(editingTask.id, data) : addTask}
              editingTask={editingTask}
              onCancel={() => setEditingTask(null)}
              categories={categories}
            />
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="animate-fade-in">
              <TaskSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
              <TaskFilter 
                currentFilter={filter} 
                onFilterChange={setFilter}
                taskCounts={taskCounts}
              />
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
              <TaskList
                tasks={filteredAndSearchedTasks}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onEdit={setEditingTask}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
