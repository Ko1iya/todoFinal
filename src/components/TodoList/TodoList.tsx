import React from 'react';
import Task from '../Task/Task';
import styles from './todoList.module.scss';
import { ITask, ITodoListProps } from '../../types';

interface ITodoList extends ITodoListProps {
  selected: string;
  changeContent: (
    e: React.ChangeEvent<HTMLInputElement>,
    idProp: number,
  ) => void;
}

function TodoList(props: ITodoList) {
  const {
    tasks,
    toggleTaskStateCompleted,
    deleteTask,
    selected,
    changeContent,
    toggleTaskStateEditing,
    toggleEditingToActive,
  } = props;

  interface ITaskFilters {
    [All: string]: ITask[];
    Active: ITask[];
    Completed: ITask[];
  }

  const taskFilters: ITaskFilters = {
    All: tasks,
    Active: tasks.filter((task) => task.taskState === 'active'),
    Completed: tasks.filter((task) => task.taskState === 'completed'),
  };

  const filteredTasks: ITask[] = taskFilters[selected];

  return (
    <ul className={styles.todoList}>
      {filteredTasks.map((task: ITask) => (
        <Task
          key={task.id}
          id={task.id}
          taskState={task.taskState}
          toggleTaskStateCompleted={toggleTaskStateCompleted}
          deleteTask={deleteTask}
          changeContent={changeContent}
          toggleTaskStateEditing={toggleTaskStateEditing}
          toggleEditingToActive={toggleEditingToActive}
        >
          {task.content}
        </Task>
      ))}
    </ul>
  );
}

export default TodoList;
