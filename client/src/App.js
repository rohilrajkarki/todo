import { useState, useEffect } from 'react'
import axios from "axios";

const url_base = 'http://localhost:5000';


function App() {


  const [todos, setTodos] = useState([]);
  const [active, setActive] = useState(false);
  const [newtask, setNewtask] = useState("")
  useEffect(() => {
    fetch(url_base + '/todo')
      .then(res => res.json())
      .then(data => setTodos(data))
      .catch((err) => console.error("Error: ", err));

  }, [])


  const handleCompleted = async (id) => {
    await axios.put(url_base + '/todo/complete/' + id).then((res) => {
      setTodos(todos.map((todo => {
        if (todo._id === res.data._id) {
          todo.complete = res.data.complete;
        }
        return todo;
      }
      )))
    })
  }
  const handleDelete = async (id) => {
    await axios.delete(url_base + "/todo/delete/" + id).then((res) => {
      const removed = [...todos].filter(todo => todo._id !== res.data._id)
      setTodos(removed)
    })

  }
  const handleAdd = async () => {
    await axios.post(url_base + "/todo/new", {
      text: newtask
    }).then((res) => {
      setActive(false);
      setTodos([...todos, res.data]);
      setNewtask("")
    })
  }

  let counter = 0;
  for (const obj of todos) {
    if (obj.complete === false) counter++;
  }


  return (
    <div className="App">
      <h1>welcome</h1>
      <h4>Your tasks:</h4>

      <div className="todos">
        {todos.map((item) => (

          <div key={item._id} className={`todo ${item.complete ? "completed" : ""}`}>
            <div className="checkbox" onClick={() => handleCompleted(item._id)}></div>
            <div className="text">{item.text}</div>
            <div className="delete-todo" onClick={() => handleDelete(item._id)}>❌</div>
          </div>
        ))}


      </div>
      <div className="todo add" onClick={() => setActive(true)}>Add Task</div>
      {active ?
        <div className="addtask">
          <div className="close" onClick={() => setActive(false)}>❌</div>
          <div className="popup">
            <h2>Enter here</h2>
            <textarea type="text" className='todo-input'
              onChange={e => setNewtask(e.target.value)}
              value={newtask}
              rows="4" cols="30"
            />
          </div>
          <button onClick={() => handleAdd()}>Create Task</button>
        </div>
        : ""}
      <div className="remaning">{counter} out of {todos.length} Task Remaining</div>
    </div>
  );
}

export default App;
