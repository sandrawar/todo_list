import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [headingInput, setHeadingInput] = useState('');
    const [listInputs, setListInputs] = useState({});

    const handleAddTodo = () => {
        if (headingInput.trim() !== '') {
            setTodos([...todos, { heading: headingInput, lists: [] }]);
            setHeadingInput('');
        }
    };

    const handleDeleteTodo = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
      };

    const handleDeleteListItem = (todoIndex, listIndex) => {
        const newTodos = [...todos];
        newTodos[todoIndex].lists.splice(listIndex, 1);
        setTodos(newTodos);
    };

    const handleAddListItem = (index) => {
        if (listInputs[index] && listInputs[index].trim() !== '') {
            const newTodos = [...todos];
            newTodos[index].lists.push(listInputs[index]);
            setTodos(newTodos);
            setListInputs({ ...listInputs, [index]: '' });
        }
    };

    const handleListItemInputChange = (index, value) => {
        setListInputs({ ...listInputs, [index]: value });
    };

    return (
        <>
            <div className="todo-container">
                <h1 className="title">My Todo List</h1>
                <div className="input-container">
                    <input
                        type="text"
                        className="heading-input"
                        placeholder="Enter heading"
                        value={headingInput}
                        onChange={(e) => setHeadingInput(e.target.value)}
                    />
                    <button className="add-list-button" onClick={handleAddTodo}>Add Heading</button>
                </div>
            </div>
            <div className="todo_main">
                {todos.map((todo, index) => (
                    <div key={index} className="todo-card">
                        <div className="heading_todo">
                            <h3>{todo.heading}</h3>
                            <button className="delete-button-heading" onClick={() => handleDeleteTodo(index)}>Delete Heading</button>
                        </div>
                        <ul>
                            {todo.lists.map((listItem, listIndex) => (
                                <li key={listIndex} className='todo_inside_list'>
                                    <p>{listItem}</p>
                                    <button className="delete-button-heading" onClick={() => handleDeleteListItem(index, listIndex)}>Delete Item</button>
                                </li>
                            ))}
                        </ul>
                        <div className='add_list'>
                            <input
                                type="text"
                                className="list-input"
                                placeholder="Add Item"
                                value={listInputs[index] || ''}
                                onChange={(e) => handleListItemInputChange(index, e.target.value)}
                            />
                            <button className="add-list-button" onClick={() => handleAddListItem(index)}>Add Item</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TodoList;