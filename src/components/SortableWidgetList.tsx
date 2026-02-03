'use client';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Widget } from '@/types/widget';
import { CounterWidget } from './CounterWidget';
import { TextWidget } from './TextWidget';

type SortableItemProps = {
  widget: Widget;
  isSelected: boolean;
  onSelect: () => void;
  onCounterSettingsChange?: (id: string, settings: { value: number; step: number }) => void;
};

function SortableItem({
  widget,
  isSelected,
  onSelect,
  onCounterSettingsChange,
}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: widget.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const common = (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-50' : ''}`}
    >
      {widget.type === 'text' && (
        <TextWidget widget={widget} isSelected={isSelected} onSelect={onSelect} />
      )}
      {widget.type === 'counter' && (
        <CounterWidget
          widget={widget}
          isSelected={isSelected}
          onSelect={onSelect}
          onSettingsChange={(s) => onCounterSettingsChange?.(widget.id, s)}
        />
      )}
    </div>
  );

  return common;
}

type Props = {
  widgets: Widget[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  onReorder: (widgets: Widget[]) => void;
  onCounterSettingsChange: (id: string, settings: { value: number; step: number }) => void;
};

export function SortableWidgetList({
  widgets,
  selectedId,
  onSelect,
  onReorder,
  onCounterSettingsChange,
}: Props) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = widgets.findIndex((w) => w.id === active.id);
    const newIndex = widgets.findIndex((w) => w.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    const next = arrayMove(widgets, oldIndex, newIndex).map((w, i) => ({
      ...w,
      order: i,
    }));
    onReorder(next);
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={widgets.map((w) => w.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col gap-4">
          {widgets.map((widget) => (
            <SortableItem
              key={widget.id}
              widget={widget}
              isSelected={selectedId === widget.id}
              onSelect={() => onSelect(selectedId === widget.id ? null : widget.id)}
              onCounterSettingsChange={onCounterSettingsChange}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
