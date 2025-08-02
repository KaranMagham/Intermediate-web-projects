import React, { useState } from 'react';

const Main = () => {
    const [todo, settodo] = useState("");
    const [todos, settodos] = useState([]);

    const handleAdd = () => {
        if (todo.trim() === "") return;
        settodos([...todos, { text: todo, isCompleted: false }]);
        settodo("");
    };

    const handleDelete = (index) => {
        const updatedTodos = todos.filter((_, i) => i !== index);
        settodos(updatedTodos);
    };

    const handleEdit = (index) => {
        const editedTodo = prompt("Edit your todo:", todos[index].text);
        if (editedTodo !== null && editedTodo.trim() !== "") {
            const updatedTodos = [...todos];
            updatedTodos[index].text = editedTodo;
            settodos(updatedTodos);
        }
    };

    const changeval = (e) => {
        settodo(e.target.value);
    };

    return (
        <div className="min-h-screen bg-gray-800 flex items-center justify-center">
            <div className="bg-gray-700 w-full max-w-md p-6 rounded-2xl shadow-lg">
                <h1 className="text-amber-200 font-bold text-2xl underline mb-6 text-center">
                    Your To-Do
                </h1>

                <div className="mb-6">
                    <label htmlFor="add_to-do" className="block text-amber-100 font-semibold mb-2">
                        Add TO-DO:
                    </label>

                    <div className="flex flex-col items-center gap-4">
                        <input id="add_to-do" type="text" placeholder="Enter To-Do" required onChange={changeval} value={todo} className="w-full p-2 rounded-lg bg-amber-100 text-black placeholder:italic placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400" />
                        <button className="w-[40%] bg-amber-300 hover:bg-amber-200 text-black font-semibold py-2 rounded-xl transition cursor-pointer">
                            Add
                        </button>
                    </div>
                </div>

                <hr className="border-amber-400 mb-4" />
                <div>
                    <h2 className="text-amber-100 font-semibold mb-2">Your TO-DOs :</h2>
                    <div className="space-y-3 max-h-64 overflow-auto pr-1">
                        {todos.length === 0 && (
                            <p className="text-sm text-gray-300 italic">No tasks yet!</p>
                        )}
                        {todos.map((item, index) => (
                            <div key={index} className="bg-amber-50 p-3 rounded-xl flex items-center justify-between shadow-sm">
                                <span className="text-black font-medium">{item.text}</span>
                                <div className="flex gap-2">
                                    <button className="px-3 py-1 bg-amber-300 hover:bg-amber-200 rounded-xl text-sm font-semibold cursor-pointer" onClick={() => handleEdit(index)}>
                                        Edit
                                    </button>
                                    <button className="px-3 py-1 bg-red-400 hover:bg-red-300 rounded-xl text-sm font-semibold text-white cursor-pointer"
                                        onClick={() => handleDelete(index)}
                                    > Delete
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
