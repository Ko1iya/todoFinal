// import styles from './butFilter.module.scss';
import React, { Component } from 'react';

interface ButFilterProps {
  handlerClass?: string;
  children: string;
  innerState?: boolean;
  handlerСhangeSelected?: (newState: string) => void;
}

class ButFilter extends Component<ButFilterProps> {
  render() {
    const {
      handlerClass: myClass = '',
      children,
      handlerСhangeSelected = () => {},
    } = this.props;

    return (
      <li>
        <button
          className={myClass}
          onClick={() => {
            handlerСhangeSelected(children);
          }}
        >
          {children}
        </button>
      </li>
    );
  }
}

export default ButFilter;
