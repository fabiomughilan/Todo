
const STORAGE_KEYS = {
  USER: 'taskManager_user',
  TASKS: 'taskManager_tasks'
};

export const loadUser = () => {
  try {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error loading user from localStorage:', error);
    return null;
  }
};

export const saveUser = (user) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error('Error saving user to localStorage:', error);
  }
};

export const clearUser = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
  } catch (error) {
    console.error('Error clearing user from localStorage:', error);
  }
};

export const loadTasks = (user) => {
  try {
    const tasksKey = `${STORAGE_KEYS.TASKS}_${user.username}`;
    const tasks = localStorage.getItem(tasksKey);
    return tasks ? JSON.parse(tasks) : [];
  } catch (error) {
    console.error('Error loading tasks from localStorage:', error);
    return [];
  }
};

export const saveTasks = (user, tasks) => {
  try {
    const tasksKey = `${STORAGE_KEYS.TASKS}_${user.username}`;
    localStorage.setItem(tasksKey, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks to localStorage:', error);
  }
};
