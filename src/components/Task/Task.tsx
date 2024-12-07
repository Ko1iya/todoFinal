// Task.tsx
import React, { useEffect, useState } from 'react';
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

function Task({
  children,
  taskState,
  toggleTaskStateCompleted,
  toggleTaskStateEditing,
  id,
  deleteTask,
  changeContent,
  toggleEditingToActive,
  timeCreated,
  timeTimer,
  toggleTimer,
}: TaskProps) {
  const [timePassed, setTimePassed] = useState<string>('less than 5 seconds');

  useEffect(() => {
    const timeCreatedDate = new Date(timeCreated);
    setTimePassed(
      formatDistanceToNow(timeCreatedDate, { includeSeconds: true }),
    );

    const intervalId = setInterval(() => {
      setTimePassed(
        formatDistanceToNow(timeCreatedDate, { includeSeconds: true }),
      );
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [timeCreated]);

  const formatSeconds = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }

    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  return (
    <li className={taskState ? styles[taskState] : undefined}>
      {taskState !== 'editing' ? (
        <div className={styles.view}>
          <input
            className={styles.toggle}
            type="checkbox"
            checked={taskState === 'completed'}
            onChange={() => toggleTaskStateCompleted(id)}
          />
          <label htmlFor="input">
            <span
              className={styles.title}
              onClick={() => toggleTaskStateCompleted(id)}
              aria-hidden="true"
            >
              {children}
            </span>
            <span className={styles.description}>
              <button
                aria-label="play"
                type="button"
                className={[styles.icon, styles.iconPlay].join(' ')}
                onClick={() => toggleTimer(true, id)}
              />
              <button
                type="button"
                className={[styles.icon, styles.iconPause].join(' ')}
                aria-label="pause"
                onClick={() => toggleTimer(false, id)}
              />
              {formatSeconds(timeTimer)}
            </span>
            <span className={styles.description}>created {timePassed}</span>
          </label>
          <button
            type="button"
            className={`${styles.icon} ${styles.iconEdit}`}
            onClick={() => toggleTaskStateEditing(id)}
            aria-label="edit"
          />
          <button
            type="button"
            className={`${styles.icon} ${styles.iconDestroy}`}
            onClick={() => deleteTask(id)}
            aria-label="delete"
          />
        </div>
      ) : (
        <input
          type="text"
          className={styles.edit}
          value={children}
          onChange={(e) => changeContent(e, id)}
          onKeyDown={(e) => toggleEditingToActive(e, id)}
          onBlur={() => toggleTaskStateEditing(id)}
        />
      )}
    </li>
  );
}

export default Task;
