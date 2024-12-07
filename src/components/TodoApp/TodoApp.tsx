import React, { Component } from 'react';
import Header from '../Header/Header';
import Main from '../Main/Main';
import styles from './TodoApp.module.scss';
import { ITask } from '../../types';

// interface TodoAppProps {
//   // как избежать испльзования пустого интерфейса
// }
interface TodoAppState {
  tasks: ITask[];
  selected: string;
}

class TodoApp extends Component<object, TodoAppState> {
  constructor(props: object) {
    super(props);
    this.state = {
      tasks: [
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
      ],
      selected: 'All',
    };
  }

  handlerChangeContent = (
    e: React.ChangeEvent<HTMLInputElement>,
    idProp: number,
  ) => {
    this.setState((prevstate) => {
      const newArr = [...prevstate.tasks];

      return {
        tasks: newArr.map((el) =>
          el.id === idProp ? { ...el, content: e.target.value } : el,
        ),
      };
    });
  };

  handlertoggleEditingToActive = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idProp: number,
  ) => {
    if (e.key === 'Enter') {
      this.setState((prevState) => {
        const newArr = [...prevState.tasks];

        return {
          tasks: newArr.map((task) =>
            task.id === idProp
              ? {
                  ...task,
                  taskState:
                    task.taskState === 'editing' ? 'active' : 'editing',
                }
              : task,
          ),
        };
      });
    }
  };

  handlertoggleTaskStateCompleted = (id: number) => {
    this.setState((prevState) => {
      const newArr = [...prevState.tasks];

      return {
        tasks: newArr.map((task) =>
          task.id === id
            ? {
                ...task,
                taskState: task.taskState === 'active' ? 'completed' : 'active',
              }
            : task,
        ),
      };
    });
  };

  handlertoggleTaskStateEditing = (id: number) => {
    this.setState((prevState) => {
      const newArr = [...prevState.tasks];

      return {
        tasks: newArr.map((task) =>
          task.id === id
            ? {
                ...task,
                taskState: task.taskState === 'editing' ? 'active' : 'editing',
              }
            : task,
        ),
      };
    });
  };

  tictackTimer = () => {
    this.setState((prevState) => {
      const newArr = [...prevState.tasks];

      return {
        tasks: newArr.map((task) => {
          const newTime = new Date().getTime();
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
      };
    });
  };

  toggleTimer = (start: boolean, id: number) => {
    this.setState((prevState) => {
      const newArr = [...prevState.tasks];

      return {
        tasks: newArr.map((task) =>
          task.id === id && task.taskState === 'active'
            ? {
                ...task,
                timerActive: start,
                lastTick: new Date().getTime(),
              }
            : task,
        ),
      };
    });
  };

  handlerDeleteTask = (id: number) => {
    this.setState((prevState) => {
      const newArr = [...prevState.tasks];
      return { tasks: newArr.filter((task) => task.id !== id) };
    });
  };

  handlerDeleteCompleted = () => {
    this.setState((prevState) => {
      const newArr = [...prevState.tasks];
      return { tasks: newArr.filter((task) => task.taskState !== 'completed') };
    });
  };

  handlerAddTask = (value: string, min: number, sec: number) => {
    this.setState(({ tasks }) => {
      const newTask: ITask = {
        id: tasks.length + 1,
        taskState: 'active',
        content: value,
        timeCreated: new Date().getTime(),
        timeTimer: min * 60 + sec,
        timerActive: false,
        lastTick: 0,
      };

      return { tasks: [...tasks, newTask] };
    });
  };

  handlerСhangeSelected = (newState: string) => {
    this.setState({ selected: newState });
  };

  render() {
    const { tasks, selected } = this.state;

    return (
      <section className={styles.todoApp}>
        <Header addTask={this.handlerAddTask} />
        <Main
          todoCount={
            tasks.filter(({ taskState }) => taskState === 'active').length
          }
          tasks={tasks}
          toggleTaskStateCompleted={this.handlertoggleTaskStateCompleted}
          deleteTask={this.handlerDeleteTask}
          selected={selected}
          changeSelected={this.handlerСhangeSelected}
          deleteCompleted={this.handlerDeleteCompleted}
          changeContent={this.handlerChangeContent}
          toggleTaskStateEditing={this.handlertoggleTaskStateEditing}
          toggleEditingToActive={this.handlertoggleEditingToActive}
          tictackTimer={this.tictackTimer}
          toggleTimer={this.toggleTimer}
        />
      </section>
    );
  }
}

export default TodoApp;
