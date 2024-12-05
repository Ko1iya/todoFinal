/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
export interface ITask {
  id: number;
  taskState: 'completed' | 'editing' | 'active';
  content: string;
  timeTimer: number;
  timeCreated: number;
  timerActive: boolean;
}

export interface ITodoListProps {
  toggleTaskStateEditing: (id: number) => void;
  tasks: ITask[];
  toggleTaskStateCompleted: (id: number) => void;
  deleteTask: (id: number) => void;
  toggleEditingToActive: (
    e: React.KeyboardEvent<HTMLInputElement>,
    idProp: number,
  ) => void;
}
