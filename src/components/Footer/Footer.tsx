import ButFilter from '../ButFilter/ButFilter';
import styles from './footer.module.scss';

interface FooterProps {
  todoCount: number;
  selected: string;
  changeSelected: (newState: string) => void;
  deleteCompleted: () => void;
}

function Footer(prop: FooterProps) {
  const {
 todoCount, selected, changeSelected, deleteCompleted,
} = prop;

  return (
    <div className={styles.footer}>
      <span className={styles.todoCount}>
        {todoCount}
        {' '}
        items left
      </span>
      <ul className={styles.filters}>
        <ButFilter
          handlerClass={selected === 'All' ? styles.selected : ''}
          handlerСhangeSelected={changeSelected}
        >
          All
        </ButFilter>
        <ButFilter
          handlerClass={selected === 'Active' ? styles.selected : ''}
          handlerСhangeSelected={changeSelected}
        >
          Active
        </ButFilter>
        <ButFilter
          handlerClass={selected === 'Completed' ? styles.selected : ''}
          handlerСhangeSelected={changeSelected}
        >
          Completed
        </ButFilter>
      </ul>
      <button className={styles.clearCompleted} onClick={deleteCompleted}>
        Clear completed
      </button>
    </div>
  );
}

export default Footer;
