// TodoList.tsx
import React, { useEffect } from 'react';
import Task from '../Task/Task';
import styles from './todoList.module.scss';
import { ITask, ITodoListProps } from '../../types';

interface ITodoList extends ITodoListProps {
  selected: string;
  changeContent: (
    e: React.ChangeEvent<HTMLInputElement>,
    idProp: number,
  ) => void;
  tictackTimer: (newTime?: number, lastTick?: number) => void;
  toggleTimer: (start: boolean, id: number) => void;
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
    toggleTimer,
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

  useEffect(() => {
    const { tictackTimer } = props;

    const timer = setInterval(() => {
      tictackTimer();
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

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
          timeTimer={task.timeTimer}
          timeCreated={task.timeCreated}
          toggleTimer={toggleTimer}
        >
          {task.content}
        </Task>
      ))}
    </ul>
  );
}

export default TodoList;
