import { useState } from 'react';

function App() {
  const [task, setTask] = useState<string[]>([]);
  const [newTask, setNewTask] = useState('');
  const [completedTask, setCompletedTask] = useState<number[]>([]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTask([...task, newTask]);
      setNewTask('');
    }
  };

  const deleteTask = (index: number) => {
    const updatedTask = task.filter((_, i) => i !== index);
    setTask(updatedTask);
    setCompletedTask(completedTask.filter(i => i !== index));
  };


  const toggleComplete = (index: number) => {
    if (completedTask.includes(index)) {
      setCompletedTask(completedTask.filter(i => i !== index));
    } else {
      setCompletedTask([...completedTask, index]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };


  return (
    <div className="App">
      <div className="todo-container">
        <h1>To Do List</h1>
        <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
        onKeyDown={handleKeyPress}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {task.map((taskItem, index) => (
          <li key={index} className={completedTask.includes(index) ? 'completed' : ''}>
            <input 
            type="checkbox" 
            checked={completedTask.includes(index)} 
            onChange={() => toggleComplete(index)} />
            <span className="task-text">{taskItem}</span>
             <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}

export default App
