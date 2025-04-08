import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import FilterButtons from './components/FilterButtons';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tasks');
      setTasks(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setLoading(false);
    }
  };

  const addTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', task);
      setTasks([response.data, ...tasks]);
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, { completed });
      setTasks(tasks.map(task => 
        task._id === id ? { ...task, completed } : task
      ));
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  return (
    <div className="app">
      <h1>Task Tracker</h1>
      <TaskForm onAddTask={addTask} />
      <FilterButtons filter={filter} setFilter={setFilter} />
      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <TaskList 
          tasks={filteredTasks} 
          onToggleComplete={toggleComplete} 
          onDeleteTask={deleteTask} 
        />
      )}
    </div>
  );
}

export default App;