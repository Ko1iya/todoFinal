// import styles from './butFilter.module.scss';
import React from 'react';

interface ButFilterProps {
  handlerClass: string;
  children: string;
  handlerСhangeSelected: (newState: string) => void;
}

function ButFilter({
  handlerClass = '',
  children,
  handlerСhangeSelected,
}: ButFilterProps) {
  return (
    <li>
      <button
        type="button"
        className={handlerClass}
        onClick={() => {
          handlerСhangeSelected(children);
        }}
      >
        {children}
      </button>
    </li>
  );
}

export default ButFilter;
