'use client';

import { useCallback, useEffect, useState } from 'react';
import { getWidgets, login, putWidgets } from '@/lib/api';
import type { Widget } from '@/types/widget';
import { SortableWidgetList } from '@/components/SortableWidgetList';
import { WidgetSettings } from '@/components/WidgetSettings';

export default function DashboardPage() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWidgets = useCallback(async () => {
    try {
      setError(null);
      await login();
      const data = await getWidgets();
      setWidgets(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWidgets();
  }, [loadWidgets]);

  const saveWidgets = useCallback(async (next: Widget[]) => {
    setWidgets(next);
    try {
      await putWidgets(next);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save');
    }
  }, []);

  const handleReorder = useCallback(
    (next: Widget[]) => saveWidgets(next),
    [saveWidgets]
  );

  const handleUpdateSettings = useCallback(
    (id: string, settings: Record<string, unknown>) => {
      const next: Widget[] = widgets.map((w) => {
        if (w.id !== id) return w;
        if (w.type === 'text' && 'content' in settings) {
          return { ...w, settings: { ...w.settings, content: String(settings.content) } };
        }
        if (w.type === 'counter' && ('value' in settings || 'step' in settings)) {
          return {
            ...w,
            settings: {
              value: 'value' in settings ? Number(settings.value) : w.settings.value,
              step: 'step' in settings ? Number(settings.step) : w.settings.step,
            },
          };
        }
        return w;
      });
      saveWidgets(next);
    },
    [widgets, saveWidgets]
  );

  const handleCounterSettingsChange = useCallback(
    (id: string, settings: { value: number; step: number }) => {
      handleUpdateSettings(id, settings);
    },
    [handleUpdateSettings]
  );

  const selectedWidget = widgets.find((w) => w.id === selectedId) ?? null;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-slate-500">Loading dashboard…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Widget Dashboard</h1>
        {error && (
          <p className="rounded bg-red-100 px-3 py-1 text-sm text-red-700">
            {error}
          </p>
        )}
      </header>

      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">
        <main className="lg:col-span-2">
          <SortableWidgetList
            widgets={widgets}
            selectedId={selectedId}
            onSelect={setSelectedId}
            onReorder={handleReorder}
            onCounterSettingsChange={handleCounterSettingsChange}
          />
        </main>
        <aside className="lg:col-span-1">
          <div className="sticky top-6">
            <h2 className="mb-3 text-lg font-semibold text-slate-700">
              Widget Settings
            </h2>
            <WidgetSettings
              widget={selectedWidget}
              onUpdate={handleUpdateSettings}
              onClose={() => setSelectedId(null)}
            />
            {!selectedWidget && (
              <p className="text-sm text-slate-500">
                Select a widget to edit its settings.
              </p>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
