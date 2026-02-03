'use client';

import type { TextWidget as TextWidgetType } from '@/types/widget';

type Props = {
  widget: TextWidgetType;
  isSelected?: boolean;
  onSelect?: () => void;
};

export function TextWidget({ widget, isSelected, onSelect }: Props) {
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
      <p className="text-sm font-medium text-slate-500">Text Widget</p>
      <p className="mt-2 text-slate-800">{widget.settings.content}</p>
    </div>
  );
}
