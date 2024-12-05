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
  timeCreated: number;
  timeTimer: number;
  toggleTimer: (start: boolean, id: number) => void;
}

interface TaskState {
  timePassed: string;
  timeCreated: Date;
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

  constructor(props: TaskProps) {
    super(props);

    const { timeCreated } = this.props;

    this.state = {
      timeCreated: new Date(timeCreated),
      timePassed: 'less than 5 seconds',
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
  }

  render() {
    const { timePassed } = this.state;

    const {
      timeTimer,
      children,
      taskState,
      id,
      toggleTaskStateCompleted,
      deleteTask,
      changeContent,
      toggleTaskStateEditing,
      toggleEditingToActive,
      toggleTimer,
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
                    toggleTimer(true, id);
                  }}
                />
                <button
                  type="button"
                  className={[styles.icon, styles.iconPause].join(' ')}
                  aria-label="pause"
                  onClick={() => {
                    toggleTimer(false, id);
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
