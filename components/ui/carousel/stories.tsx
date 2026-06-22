import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Button } from '@/components/ui/button';

import { Carousel } from './carousel';
import { CarouselContent } from './carousel-content';
import { CarouselDots } from './carousel-dots';
import { CarouselItem } from './carousel-item';
import { CarouselNext } from './carousel-next';
import { CarouselPrevious } from './carousel-previous';

const slides = Array.from({ length: 5 });

const meta: Meta<typeof Carousel> = {
  title: 'ui/carousel',
  component: Carousel,
  tags: ['!dev'],
  argTypes: {
    loop: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Carousel>;

/**
 * Default
 */
export const Default: Story = {
  render: (args) => (
    <Carousel {...args}>
      <CarouselContent>
        {slides.map((_, index) => (
          <CarouselItem key={index}>
            <div className="flex h-64 items-center justify-center rounded-lg border bg-surface-muted text-3xl font-semibold">
              {index + 1}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-4 flex items-center justify-between">
        <CarouselPrevious />
        <CarouselDots />
        <CarouselNext />
      </div>
    </Carousel>
  ),
};

/**
 * Loop
 */
export const Loop: Story = {
  args: {
    loop: true,
  },
  render: Default.render,
};

/**
 * Multiple Slides
 */
export const MultipleSlides: Story = {
  render: (args) => (
    <Carousel {...args}>
      <CarouselContent>
        {slides.map((_, index) => (
          <CarouselItem key={index} className="basis-1/2 md:basis-1/3">
            <div className="flex h-48 items-center justify-center rounded-lg border bg-surface-muted text-2xl font-semibold">
              {index + 1}
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-4 flex items-center justify-between">
        <CarouselPrevious />
        <CarouselDots />
        <CarouselNext />
      </div>
    </Carousel>
  ),
};

/**
 * Composition
 */
export const Composition: Story = {
  render: (args) => (
    <Carousel {...args}>
      <CarouselContent>
        {['About', 'Skills', 'Projects', 'Contact'].map((title) => (
          <CarouselItem key={title}>
            <div className="rounded-lg border bg-surface-elevated p-8">
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-text-secondary">
                Explore portfolio content within carousel layout
              </p>
              <Button className="mt-4">View Project</Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="mt-4 flex items-center justify-between">
        <CarouselPrevious />
        <CarouselDots />
        <CarouselNext />
      </div>
    </Carousel>
  ),
};
