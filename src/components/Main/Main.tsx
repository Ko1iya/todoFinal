import React from 'react';

import { ITodoListProps } from '../../types';
import Footer from '../Footer/Footer';
import TodoList from '../TodoList/TodoList';
import styles from './main.module.scss';

interface IMainProps extends ITodoListProps {
  todoCount: number;
  selected: string;
  changeSelected: (newState: string) => void;
  deleteCompleted: () => void;
  changeContent: (
    e: React.ChangeEvent<HTMLInputElement>,
    idProp: number,
  ) => void;
}

function Main(prop: IMainProps) {
  const {
    tasks,
    toggleTaskStateCompleted,
    deleteTask,
    todoCount,
    deleteCompleted,
    changeContent,
    toggleTaskStateEditing,
    toggleEditingToActive,
    selected,
    changeSelected,
  } = prop;

  return (
    <div className={styles.main}>
      <TodoList
        tasks={tasks}
        toggleTaskStateCompleted={toggleTaskStateCompleted}
        deleteTask={deleteTask}
        selected={selected}
        changeContent={changeContent}
        toggleTaskStateEditing={toggleTaskStateEditing}
        toggleEditingToActive={toggleEditingToActive}
      />
      <Footer
        todoCount={todoCount}
        selected={selected}
        changeSelected={changeSelected}
        deleteCompleted={deleteCompleted}
      />
    </div>
  );
}

export default Main;
