import type { Meta, StoryObj } from '@storybook/vue3';
import SectionTitle from './SectionTitle.vue';

const meta = {
  title: 'Reusable/SectionTitle',
  component: SectionTitle,
  args: {
    id: 'skills',
    label: 'Skills',
  },
  argTypes: {
    prefix: {
      control: 'text',
    },
  },
} satisfies Meta<typeof SectionTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const CustomPrefix: Story = {
  args: {
    prefix: 'Section: ',
  },
};

export const CustomAnchor: Story = {
  args: {
    href: '#custom-anchor',
  },
};
