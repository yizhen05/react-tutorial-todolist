import { useState, useRef } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid"; //ユニークなIDを生成するためのライブラリ

function App() {
  const [todos, setTodos] = useState([]);
  //tososの値が動いたときだけ再レンダリングしてくれるらしい

  const todoNameRef = useRef();
  const handleAddTodo = () => {
    //タスクを追加する
    //文字列を取得
    // console.log(todoNameRef.current.value);
    const name = todoNameRef.current.value;
    //空白のときは何もしない
    if (name === "") {
      return;
    }
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name, completed: false }];
    });
  };

  const toggleTodo = (id) => {
    //タスクの完了状態を変更する
    const newTodos = [...todos];
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleClear = () => {
    //未完了のタスクをnewTodosに格納する
    const newTodos = todos.filter((todo) => !todo.completed);
    //完了したタスクを削除する
    setTodos(newTodos);
  };

  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={todoNameRef} />
      <button onClick={handleAddTodo}>タスクを追加</button>
      <button onClick={handleClear}>完了したタスクの削除</button>
      <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
    </>
  );
}

export default App;
