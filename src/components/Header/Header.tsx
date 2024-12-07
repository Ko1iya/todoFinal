import React from 'react';
import styles from './header.module.scss';

interface HeaderProps {
  addTask: (value: string, min: number, sec: number) => void;
}

interface HeaderState {
  valueText: string;
  valueMin: number;
  valueSec: number;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      valueText: '',
      valueMin: 0,
      valueSec: 0,
    };
  }

  handlerKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { props } = this;
    const { state } = this;

    if (event.key === 'Enter') {
      const { value } = event.target as HTMLInputElement;
      if (value.trim()) {
        props.addTask(state.valueText, state.valueMin, state.valueSec);
        this.setState({ valueText: '', valueMin: 0, valueSec: 0 });
      }
    }
  };

  handlerChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ valueText: event.target.value });
  };

  handlerChangeMin = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ valueMin: +event.target.value });
  };

  handlerChangeSec = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ valueSec: +event.target.value });
  };

  render() {
    const { valueText, valueMin, valueSec } = this.state;

    return (
      <div className={styles.header}>
        <h1>todos</h1>
        <form className={styles.newTodoForm}>
          <input
            className={styles.newTodo}
            placeholder="What needs to be done?"
            onKeyDown={this.handlerKeyDown}
            onChange={this.handlerChangeText}
            value={valueText}
          />
          <input
            type="number"
            min="0"
            className={styles.newTodoForm__timer}
            placeholder="Min"
            onChange={this.handlerChangeMin}
            value={valueMin}
            onKeyDown={this.handlerKeyDown}
          />
          <input
            min="0"
            type="number"
            className={styles.newTodoForm__timer}
            placeholder="Sec"
            onChange={this.handlerChangeSec}
            value={valueSec}
            onKeyDown={this.handlerKeyDown}
          />
        </form>
      </div>
    );
  }
}

export default Header;
