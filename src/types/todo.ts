export interface Todo {
    _id: string;
    title: string;
    completed: boolean;
    userId: string;
  }

export  interface TodoItemProps {
    item: Todo;
    onToggleComplete: (id: string, completed: boolean) => void;
    onDelete: (id: string) => void;
  }
  