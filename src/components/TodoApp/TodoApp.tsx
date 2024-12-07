import React, { useState } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import styles from './TodoApp.module.scss';
import { ITask } from '../../types';

function TodoApp() {
  const [tasks, setTasks] = useState<ITask[]>([
    {
      id: 1,
      taskState: 'completed',
      content: 'Completed',
      timeCreated: new Date().getTime(),
      timeTimer: 0,
      timerActive: false,
      lastTick: 0,
    },
    {
      id: 2,
      taskState: 'completed',
      content: 'Editing task',
      timeCreated: new Date().getTime(),
      timeTimer: 0,
      timerActive: false,
      lastTick: 0,
    },
    {
      id: 3,
      taskState: 'active',
      content: 'Active task',
      timeCreated: new Date().getTime(),
      timeTimer: 0,
      timerActive: false,
      lastTick: 0,
    },
  ]);
  const [selected, setSelected] = useState<string>('All');

  const handlerChangeContent = (
    e: React.ChangeEvent<HTMLInputElement>,
    idProp: number,
  ) => {
    setTasks((prevTasks) =>
      prevTasks.map((el) =>
        el.id === idProp ? { ...el, content: e.target.value } : el,
      ),
    );
  };

  const handlertoggleEditingToActive = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idProp: number,
  ) => {
    if (e.key === 'Enter') {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === idProp
            ? {
                ...task,
                taskState: task.taskState === 'editing' ? 'active' : 'editing',
              }
            : task,
        ),
      );
    }
  };

  const handlertoggleTaskStateCompleted = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              taskState: task.taskState === 'active' ? 'completed' : 'active',
            }
          : task,
      ),
    );
  };

  const handlertoggleTaskStateEditing = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              taskState: task.taskState === 'editing' ? 'active' : 'editing',
            }
          : task,
      ),
    );
  };

  const tictackTimer = () => {
    const newTime = new Date().getTime();

    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.timerActive) {
          let finishTime = 0;

          if (task.lastTick === 0) {
            finishTime = 1;
          } else {
            finishTime = Math.round(
              task.timeTimer + (newTime - task.lastTick) / 1000,
            );
          }

          return {
            ...task,
            timeTimer: finishTime,
            lastTick: newTime,
          };
        }

        return task;
      }),
    );
  };

  const toggleTimer = (start: boolean, id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id && task.taskState === 'active'
          ? { ...task, timerActive: start, lastTick: new Date().getTime() }
          : task,
      ),
    );
  };

  const handlerDeleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handlerDeleteCompleted = () => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.taskState !== 'completed'),
    );
  };

  const handlerAddTask = (value: string, min: number, sec: number) => {
    setTasks((prevTasks) => {
      const newTask: ITask = {
        id: prevTasks.length + 1,
        taskState: 'active',
        content: value,
        timeCreated: new Date().getTime(),
        timeTimer: min * 60 + sec,
        timerActive: false,
        lastTick: 0,
      };
      return [...prevTasks, newTask];
    });
  };

  const handlerСhangeSelected = (newState: string) => {
    setSelected(newState);
  };

  return (
    <section className={styles.todoApp}>
      <Header addTask={handlerAddTask} />
      <Main
        todoCount={
          tasks.filter(({ taskState }) => taskState === 'active').length
        }
        tasks={tasks}
        toggleTaskStateCompleted={handlertoggleTaskStateCompleted}
        deleteTask={handlerDeleteTask}
        selected={selected}
        changeSelected={handlerСhangeSelected}
        deleteCompleted={handlerDeleteCompleted}
        changeContent={handlerChangeContent}
        toggleTaskStateEditing={handlertoggleTaskStateEditing}
        toggleEditingToActive={handlertoggleEditingToActive}
        tictackTimer={tictackTimer}
        toggleTimer={toggleTimer}
      />
    </section>
  );
}

export default TodoApp;
