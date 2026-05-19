import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { PlusIcon, Trash2Icon } from 'lucide-react';

import { DraggableList } from './draggable-list';
import { DraggableItem } from './draggable-item';
import { DragHandle } from './drag-handle';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const meta: Meta<typeof DraggableList> = {
  title: 'ui/draggable-list',
  component: DraggableList,
  tags: ['!dev'],
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof DraggableList>;

const initial = [
  { id: '1', type: 'Frontend', stacks: ['Next.js', 'TypeScript'] },
  { id: '2', type: 'Backend', stacks: ['Node.js', 'PostgreSQL'] },
  { id: '3', type: 'Infra', stacks: ['AWS', 'Docker'] },
];

/**
 * Default
 */
export const Default: Story = {
  render: () => {
    const [items, setItems] = useState(initial);

    return (
      <div className="space-y-2">
        <DraggableList
          items={items}
          getId={(item) => item.id}
          onChange={setItems}
        >
          {items.map((item) => (
            <DraggableItem key={item.id} id={item.id}>
              <div className="flex items-center gap-3 p-3 border rounded-md bg-surface-elevated">
                <DragHandle />
                <div className="flex-1">
                  <div className="text-sm font-medium">{item.type}</div>
                </div>
              </div>
            </DraggableItem>
          ))}
        </DraggableList>
      </div>
    );
  },
};

/**
 * States
 */
export const States: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: '1', label: 'Normal Item' },
      { id: '2', label: 'Disabled Item', disabled: true },
    ]);

    return (
      <div className="space-y-1">
        <DraggableList
          items={items}
          getId={(item) => item.id}
          onChange={setItems}
        >
          {items.map((item) => (
            <DraggableItem key={item.id} id={item.id} disabled={item.disabled}>
              <div className="flex items-center gap-2 p-3 border rounded-md bg-surface-elevated">
                <DragHandle />
                <span className="text-sm">{item.label}</span>
                {item.disabled && (
                  <span className="text-xs text-text-muted ml-auto">
                    disabled
                  </span>
                )}
              </div>
            </DraggableItem>
          ))}
        </DraggableList>
      </div>
    );
  },
};

/**
 * Composition (Real World CMS Pattern)
 */
export const Composition: Story = {
  render: () => {
    const [items, setItems] = useState(initial);

    return (
      <div className="flex flex-col gap-2">
        <DraggableList
          items={items}
          getId={(item) => item.id}
          onChange={setItems}
        >
          {items.map((item, idx) => (
            <DraggableItem key={item.id} id={item.id}>
              <div className="flex items-start gap-3 p-3 border rounded-md bg-surface-elevated">
                <DragHandle className="mt-2" />

                {/* Content */}
                <div className="flex-1 space-y-2">
                  <Field>
                    <Label htmlFor={`type${idx}`}>유형</Label>
                    <Input
                      id={`type${idx}`}
                      value={item.type}
                      onChange={({ target }) =>
                        setItems((prev) =>
                          prev.map((item, i) =>
                            idx === i ? { ...item, type: target.value } : item,
                          ),
                        )
                      }
                    />
                  </Field>

                  <Field>
                    <Label htmlFor={`stacks${idx}`}>기술스택</Label>
                    <Input
                      id={`stacks${idx}`}
                      value={item.stacks.join(',')}
                      placeholder="기술 스택 (,로 구분)"
                      onChange={({ target }) =>
                        setItems((prev) =>
                          prev.map((item, i) =>
                            idx === i
                              ? { ...item, stacks: target.value.split(',') }
                              : item,
                          ),
                        )
                      }
                    />
                  </Field>
                </div>

                {/* Actions */}
                <Button
                  type="button"
                  className="text-semantic-error text-xs"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setItems(items.filter((_, i) => i !== idx));
                  }}
                >
                  <Trash2Icon size={16} />
                </Button>
              </div>
            </DraggableItem>
          ))}

          {/* Add Button */}
          <Button
            type="button"
            className="mt-3"
            onClick={() =>
              setItems([
                ...items,
                { id: String(Date.now()), type: '', stacks: [] },
              ])
            }
          >
            <PlusIcon size={16} /> 추가
          </Button>
        </DraggableList>
      </div>
    );
  },
};
