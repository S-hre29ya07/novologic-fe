'use client';

import type { Widget } from '@/types/widget';

type Props = {
  widget: Widget | null;
  onUpdate: (id: string, settings: Record<string, unknown>) => void;
  onClose: () => void;
};

export function WidgetSettings({ widget, onUpdate, onClose }: Props) {
  if (!widget) return null;

  if (widget.type === 'text') {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Text Widget Settings</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700"
          >
            ✕
          </button>
        </div>
        <label className="block text-sm text-slate-600">Content</label>
        <textarea
          value={widget.settings.content}
          onChange={(e) =>
            onUpdate(widget.id, { content: e.target.value })
          }
          className="mt-1 w-full rounded border border-slate-300 p-2 text-slate-800"
          rows={3}
        />
      </div>
    );
  }

  if (widget.type === 'counter') {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Counter Widget Settings</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-500 hover:text-slate-700"
          >
            ✕
          </button>
        </div>
        <label className="block text-sm text-slate-600">Step</label>
        <input
          type="number"
          value={widget.settings.step}
          onChange={(e) =>
            onUpdate(widget.id, {
              value: widget.settings.value,
              step: Number(e.target.value) || 1,
            })
          }
          className="mt-1 w-full rounded border border-slate-300 p-2 text-slate-800"
        />
        <label className="mt-3 block text-sm text-slate-600">Current value</label>
        <input
          type="number"
          value={widget.settings.value}
          onChange={(e) =>
            onUpdate(widget.id, {
              value: Number(e.target.value) || 0,
              step: widget.settings.step,
            })
          }
          className="mt-1 w-full rounded border border-slate-300 p-2 text-slate-800"
        />
      </div>
    );
  }

  return null;
}
