import React, { useEffect, useState } from 'react';

const Main = () => {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [hasLoaded, setHasLoaded] = useState(false);


  const changeAdd = (e) => {
    if (todo.trim() === "") return;
    setTodos([...todos, { text: todo, isComplete: false }])
    setTodo("")
  }

  const changeDelete = (index) => {
    const uptodo = todos.filter((_, i) => i !== index);
    setTodos(uptodo)
    console.log(todos,"Todo Deleted successfully!");
  }

  const changeEdit = (index) => {
    const editedTodo = prompt("Edit your TO-DO: ", todos[index].text)
    if(editedTodo !== null && editedTodo.trim() !== ""){
      const uptodo = [...todos]
      uptodo[index].text=editedTodo
      setTodos(uptodo)
      alert("Todo updated successfully!");
    }
  }

  const done= (index)=>{
    const uptodo = [...todos];
    uptodo[index].isComplete = !uptodo[index].isComplete;
    setTodos(uptodo)
  }

  useEffect(() => {
    if(hasLoaded){
      localStorage.setItem("todos",JSON.stringify(todos));
    }
  }, [todos,hasLoaded])
  
  useEffect(() => {
    const savedTODO=localStorage.getItem("todos")
    if(savedTODO){
      try {
        setTodos(JSON.parse(savedTODO));
      } catch (error) {
        console.log(`Fail to load todos: ${error}`)
        setTodos([])  
      }
    }
    setHasLoaded(true)
  }, [])

  return (
    <div className="max-h-screen min-h-[85.3vh] bg-gray-800 flex items-center justify-center p-6">
      <div className="bg-gray-700 w-full max-w-md p-6 rounded-2xl shadow-lg">
        <h1 className="text-amber-200 font-bold text-2xl underline mb-6 text-center">
          Your To-Do
        </h1>

        <div className="mb-6">
          <label htmlFor="add_to-do" className="block text-amber-100 font-semibold mb-2">
            Add TO-DO:
          </label>

          <div className="flex flex-col items-center gap-4">
            <input id="add_to-do" type="text" value={todo} placeholder="Enter To-Do" onChange={(e) => setTodo(e.target.value)} required className="w-full p-2 rounded-lg bg-amber-100 text-black placeholder:italic placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
            <button className="w-[40%] bg-amber-300 hover:bg-amber-200 text-black font-semibold py-2 rounded-xl transition cursor-pointer" onClick={changeAdd}>
              Add
            </button>
          </div>
        </div>

        <hr className="border-amber-400 mb-4" />
        <div>
          <h2 className="text-amber-100 font-semibold mb-2">Your TO-DOs :</h2>
          <div className="space-y-3 max-h-64 overflow-auto pr-1">
            {todos.length == 0 && (
              <p className='text-sm text-gray-300 italic'>No Task Yet</p>
            )}
            {todos.map((item, index) => (
              <div key={index} className="bg-amber-50 p-3 rounded-xl flex items-center justify-between shadow-sm">
                <input type="checkbox" checked={item.isComplete} name="check" id="" onChange={()=>done(index)}/>
                <span className={`text-black font-medium ${item.isComplete ? "line-through" : ""}`}>{item.text}</span>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-amber-300 hover:bg-amber-200 rounded-xl text-sm font-semibold cursor-pointer" onClick={() => changeEdit(index)} >
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-400 hover:bg-red-300 rounded-xl text-sm font-semibold text-white cursor-pointer" onClick={() => changeDelete(index)}> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
