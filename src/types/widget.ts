export type TextWidget = {
  id: string;
  type: 'text';
  order: number;
  settings: { content: string };
};

export type CounterWidget = {
  id: string;
  type: 'counter';
  order: number;
  settings: { value: number; step: number };
};

export type Widget = TextWidget | CounterWidget;
