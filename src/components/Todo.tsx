import { useState } from 'react';

import BasicTable from './Table';
import TodoDialog from './TodoDialog';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export interface TodoItem {
  id: number;
  select: boolean;
  todo: string;
  description: string;
  deadline: string;
  done: boolean;
}

const todoItems: TodoItem[] = [
  {
    id: 1,
    select: false,
    todo: 'create app',
    description: 'React Todo application',
    deadline: '2023-04-30',
    done: true,
  },
  {
    id: 2,
    select: false,
    todo: 'deploy',
    description: 'depploy app on GHPages',
    deadline: '2023-04-30',
    done: true,
  },
];

const Todo = () => {
  const [todos, setTodos] = useState(todoItems);

  const selectTodo = (todoItem: TodoItem) => {
    const updatedTodos = [...todos];
    updatedTodos.forEach((el) => (el.select = false));
    updatedTodos.find((el: TodoItem) => el.id === todoItem.id).select =
      !todoItem.select;
    setTodos(updatedTodos);
  };

  const addItem = (item: TodoItem) => {
    item.id = todos.length ? todos.at(-1).id + 1 : 1;
    setTodos([...todos, item]);
  };

  const editItem = (item: TodoItem) => {
    const updatedTodos = [...todos];
    const index = updatedTodos.findIndex((el) => el.id === item.id);
    if (index !== -1) {
      updatedTodos.splice(index, 1, item);
      setTodos(updatedTodos);
    }
  };

  const itemToEdit = () => {
    return todos.filter((el) => el.select === true)[0];
  };

  const deleteItem = () => {
    const updatedTodos = todos.filter((el) => el.select !== true);
    console.log(updatedTodos);
    setTodos(updatedTodos);
  };

  const doneItem = (todoItem: TodoItem) => {
    const updatedTodos = [...todos];
    updatedTodos.find((el: TodoItem) => el.id === todoItem.id).done =
      !todoItem.done;
    setTodos(updatedTodos);
  };

  return (
    <>
      <BasicTable rows={todos} select={selectTodo} done={doneItem} />
      <Stack
        direction="row"
        sx={{
          marginTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          width: '50%',
        }}
      >
        <TodoDialog onAddTodo={addItem} action="Add" />
        <TodoDialog
          itemToEdit={itemToEdit()}
          editItem={editItem}
          action="Edit"
        />
        <Button variant="contained" color="error" onClick={() => deleteItem()}>
          Delete selected item
        </Button>
      </Stack>
    </>
  );
};

export default Todo;
