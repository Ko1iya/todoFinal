import React from 'react';
import styles from './header.module.scss';

interface HeaderProps {
  addTask: (value: string) => void;
}

interface HeaderState {
  value: string;
}

class Header extends React.Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handlerKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const { value } = (event.target as HTMLInputElement);
      if (value.trim()) {
        this.props.addTask(value);
        this.setState({ value: '' });
      }
    }
  };

  handlerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: event.target.value });
  };

  render() {
    return (
      <div className={styles.header}>
        <h1>todos</h1>
        <input
          className={styles.newTodo}
          placeholder="What needs to be done?"
          onKeyDown={this.handlerKeyDown}
          onChange={this.handlerChange}
          value={this.state.value}
        />
      </div>
    );
  }
}

export default Header;
