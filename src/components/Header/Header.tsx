import React, { useState } from 'react';
import styles from './header.module.scss';

interface HeaderProps {
  addTask: (value: string, min: number, sec: number) => void;
}

function Header({ addTask }: HeaderProps) {
  const [valueText, setValueText] = useState<string>('');
  const [valueMin, setValueMin] = useState<number>(0);
  const [valueSec, setValueSec] = useState<number>(0);

  const handlerKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const { value } = event.target as HTMLInputElement;
      if (value.trim()) {
        addTask(valueText, valueMin, valueSec);
        setValueText('');
        setValueMin(0);
        setValueSec(0);
      }
    }
  };

  const handlerChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueText(event.target.value);
  };

  const handlerChangeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueMin(+event.target.value);
  };

  const handlerChangeSec = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueSec(+event.target.value);
  };

  return (
    <div className={styles.header}>
      <h1>todos</h1>
      <form className={styles.newTodoForm}>
        <input
          className={styles.newTodo}
          placeholder="What needs to be done?"
          onKeyDown={handlerKeyDown}
          onChange={handlerChangeText}
          value={valueText}
        />
        <input
          type="number"
          min="0"
          className={styles.newTodoForm__timer}
          placeholder="Min"
          onChange={handlerChangeMin}
          value={valueMin}
          onKeyDown={handlerKeyDown}
        />
        <input
          min="0"
          type="number"
          className={styles.newTodoForm__timer}
          placeholder="Sec"
          onChange={handlerChangeSec}
          value={valueSec}
          onKeyDown={handlerKeyDown}
        />
      </form>
    </div>
  );
}

export default Header;
