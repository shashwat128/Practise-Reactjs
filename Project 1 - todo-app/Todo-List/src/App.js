import React, { useState } from "react";
import styled from "styled-components";
import "./index.css";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const Button = styled.button`
  border: none;
  background-color: #708090;
  color: white;
  height: 30px;
  width: 50px;
  border-radius: 2px;
  cursor: pointer;
  margin-right: 10px;
`;

const Text = styled.input`
  border: 2px solid #000;
  width: 200px;
  padding: 5px;
  border-radius: 2px;
  margin: 5px;
`;

const TaskCount = styled.span`
  margin: 10px;
`;

const Tasks = styled.div``;

const ListItem = styled.li`
  list-style: none;
  text-decoration: ${(props) => (props.complete ? "line-through" : "none")};
  padding: 10px;
  border-radius: 5px;
  background-color: #f4f4f4;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

const TaskText = styled.span`
  flex-grow: 1;
  margin-right: 10px;
`;

const DeleteButton = styled.button`
  background-color: #8a9a5b;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
  margin-left: ;
`;

const CompleteButton = styled.button`
  background-color: #6082b6;
  color: #fff;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
`;

const App = () => {
  const [input, setInput] = useState("");
  const [completedTaskCount, setCompletedTaskCount] = useState(0);
  const [todoList, setTodoList] = useState([]);

  const handleClick = () => {
    const id = todoList.length + 1;
    setTodoList((prev) => [
      ...prev,
      {
        id: id,
        task: input,
        complete: false,
      },
    ]);
    setInput("");
  };

  const handleComplete = (id) => {
    let list = todoList.map((task) => {
      let item = {};
      if (task.id === id) {
        if (!task.complete) {
          setCompletedTaskCount(completedTaskCount + 1);
        } else {
          setCompletedTaskCount(completedTaskCount - 1);
        }
        item = { ...task, complete: !task.complete };
      } else item = { ...task };
      return item;
    });
    setTodoList(list);
  };

  const handleDelete = (id) => {
    let list = todoList.filter((task) => task.id !== id);
    setTodoList(list);
    setCompletedTaskCount((prevCount) => {
      if (todoList.find((task) => task.id === id && task.complete)) {
        return prevCount - 1;
      }
      return prevCount;
    });
  };

  const handleReset = () => {
    setTodoList([]);
    setCompletedTaskCount(0);
  };

  return (
    <Container>
      <div>
        <h2>Todo List</h2>
        <Text value={input} onInput={(e) => setInput(e.target.value)} />
        <Button onClick={handleClick}>Add</Button>
        <Button onClick={handleReset}>Reset</Button>
        <Tasks>
          <TaskCount>
            <b>Pending Tasks:</b> {todoList.length - completedTaskCount}
          </TaskCount>
          <TaskCount>
            <b>Completed Tasks:</b> {completedTaskCount}
          </TaskCount>
        </Tasks>
        <div>
          <ul>
            {todoList.map((todo) => (
              <ListItem
                key={todo.id}
                complete={todo.complete}
                onClick={() => handleComplete(todo.id)}
              >
                <TaskText>{todo.task}</TaskText>
                <div>
                  <CompleteButton onClick={() => handleComplete(todo.id)}>
                    {todo.complete ? "Undo" : "Complete"}
                  </CompleteButton>
                  <DeleteButton onClick={() => handleDelete(todo.id)}>
                    Delete
                  </DeleteButton>
                </div>
              </ListItem>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default App;
