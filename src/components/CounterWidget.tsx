'use client';

import type { CounterWidget as CounterWidgetType } from '@/types/widget';

type Props = {
  widget: CounterWidgetType;
  isSelected?: boolean;
  onSelect?: () => void;
  onSettingsChange?: (settings: { value: number; step: number }) => void;
};

export function CounterWidget({
  widget,
  isSelected,
  onSelect,
  onSettingsChange,
}: Props) {
  const { value, step } = widget.settings;

  const increment = () => {
    onSettingsChange?.({ value: value + step, step });
  };

  const decrement = () => {
    onSettingsChange?.({ value: value - step, step });
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => e.key === 'Enter' && onSelect?.()}
      className={`
        rounded-lg border-2 bg-white p-4 shadow-sm transition
        ${isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-200 hover:border-slate-300'}
      `}
    >
      <p className="text-sm font-medium text-slate-500">Counter Widget</p>
      <div className="mt-3 flex items-center gap-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            decrement();
          }}
          className="rounded bg-slate-200 px-3 py-1 text-lg font-medium hover:bg-slate-300"
        >
          −
        </button>
        <span className="min-w-[3rem] text-center text-2xl font-semibold">
          {value}
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            increment();
          }}
          className="rounded bg-slate-200 px-3 py-1 text-lg font-medium hover:bg-slate-300"
        >
          +
        </button>
      </div>
    </div>
  );
}
