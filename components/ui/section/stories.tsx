import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import { Section } from './section';
import { SectionTitle } from './section-title';

const meta: Meta<typeof Section> = {
  title: 'ui/section',
  component: Section,
  tags: [],
};

export default meta;

type Story = StoryObj<typeof Section>;

/**
 * Default
 */
export const Default: Story = {
  render: () => (
    <Section>
      <SectionTitle>👩‍💻 Profile History</SectionTitle>
      <div className="space-y-2">
        <p>Frontend Developer</p>
        <p>Backend Developer</p>
      </div>
    </Section>
  ),
};

/**
 * WithoutTitle
 */
export const WithoutTitle: Story = {
  render: () => (
    <Section>
      <div className="space-y-2">
        <p>Frontend Developer</p>
        <p>Backend Developer</p>
      </div>
    </Section>
  ),
};

/**
 * CustomHeading
 */
export const CustomHeading: Story = {
  render: () => (
    <Section>
      <SectionTitle as="h3">Experience</SectionTitle>
      <div className="space-y-2">
        <p>Frontend Developer</p>
        <p>Backend Developer</p>
      </div>
    </Section>
  ),
};
