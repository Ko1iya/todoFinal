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

  return (
    <ul className={styles.todoList}>
      {selected === 'All'
        ? tasks.map((task: ITask) => (
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
          ))
        : selected === 'Active'
          ? tasks
              .filter((task: ITask) => task.taskState === 'active')
              .map((task: ITask) => (
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
              ))
          : selected === 'Completed'
            && tasks
              .filter((task: ITask) => task.taskState === 'completed')
              .map((task: ITask) => (
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
