import React, { Component } from 'react';

import { formatDistanceToNow } from 'date-fns';
import styles from './task.module.scss';

interface TaskProps {
  children: string;
  taskState: string;
  toggleTaskStateCompleted: (id: number) => void;
  toggleTaskStateEditing: (id: number) => void;
  id: number;
  deleteTask: (id: number) => void;
  changeContent: (
    e: React.ChangeEvent<HTMLInputElement>,
    idProp: number,
  ) => void;
  toggleEditingToActive: (
    e: React.KeyboardEvent<HTMLInputElement>,
    idProp: number,
  ) => void;
}

interface TaskState {
  timePassed: string;
  timeCreated: Date;
  timeTimer: number;
}

class Task extends Component<TaskProps, TaskState> {
  static formatSeconds(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }

  private refTimeCreate: ReturnType<typeof setInterval>;

  private refTimeTimer: ReturnType<typeof setInterval>;

  constructor(props: TaskProps) {
    super(props);
    this.state = {
      timeCreated: new Date(),
      timePassed: '',
      timeTimer: 0,
    };
  }

  componentDidMount(): void {
    const { timeCreated } = this.state;

    this.setState({
      timePassed: formatDistanceToNow(timeCreated, {
        includeSeconds: true,
      }),
    });

    this.refTimeCreate = setInterval(() => {
      this.setState({
        timePassed: formatDistanceToNow(timeCreated, {
          includeSeconds: true,
        }),
      });
    }, 5000);
  }

  componentWillUnmount(): void {
    clearInterval(this.refTimeCreate);
    clearInterval(this.refTimeTimer);
  }

  toggleTimer(stateTimer: boolean): void {
    if (stateTimer) {
      clearInterval(this.refTimeTimer);

      return;
    }

    this.refTimeTimer = setInterval(() => {
      this.setState((prevstate) => ({
        timeTimer: prevstate.timeTimer + 1,
      }));
    }, 1000);
  }

  render() {
    const { timePassed, timeTimer } = this.state;

    const {
      children,
      taskState,
      id,
      toggleTaskStateCompleted,
      deleteTask,
      changeContent,
      toggleTaskStateEditing,
      toggleEditingToActive,
    } = this.props;

    return (
      <li className={taskState ? styles[taskState] : undefined}>
        {taskState !== 'editing' ? (
          <div className={styles.view}>
            <input
              className={styles.toggle}
              type="checkbox"
              checked={taskState === 'completed'}
              onChange={() => {
                toggleTaskStateCompleted(id);
              }}
            />
            <label htmlFor="input">
              <span
                className={styles.title}
                onClick={() => {
                  toggleTaskStateCompleted(id);
                }}
                aria-hidden="true"
              >
                {children}
              </span>
              <span className={styles.description}>
                <button
                  aria-label="play"
                  type="button"
                  className={[styles.icon, styles.iconPlay].join(' ')}
                  onClick={() => {
                    this.toggleTimer(false);
                  }}
                />
                <button
                  type="button"
                  className={[styles.icon, styles.iconPause].join(' ')}
                  aria-label="pause"
                  onClick={() => {
                    this.toggleTimer(true);
                  }}
                />
                {Task.formatSeconds(timeTimer)}
              </span>
              <span className={styles.description}>created {timePassed}</span>
            </label>
            <button
              type="button"
              className={`${styles.icon} ${styles.iconEdit}`}
              onClick={() => {
                toggleTaskStateEditing(id);
              }}
              aria-label="edit"
            />
            <button
              type="button"
              className={`${styles.icon} ${styles.iconDestroy}`}
              onClick={() => {
                deleteTask(id);
              }}
              aria-label="delete"
            />
          </div>
        ) : (
          <input
            type="text"
            className={styles.edit}
            value={children}
            onChange={(e) => {
              changeContent(e, id);
            }}
            onKeyDown={(e) => {
              toggleEditingToActive(e, id);
            }}
            onBlur={() => {
              toggleTaskStateEditing(id);
            }}
          />
        )}
      </li>
    );
  }
}

export default Task;
