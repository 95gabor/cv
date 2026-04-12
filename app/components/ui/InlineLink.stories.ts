import type { Meta, StoryObj } from '@storybook/vue3';
import InlineLink from './InlineLink.vue';

const meta = {
  title: 'Reusable/InlineLink',
  component: InlineLink,
  args: {
    href: 'https://example.com',
    target: '_blank',
    rel: 'noopener',
  },
  argTypes: {
    href: {
      control: 'text',
    },
    target: {
      control: 'select',
      options: ['_blank', '_self', '_parent', '_top'],
    },
    rel: {
      control: 'text',
    },
  },
} satisfies Meta<typeof InlineLink>;

export default meta;
type Story = StoryObj<typeof meta>;

type InlineLinkStoryArgs = InstanceType<typeof InlineLink>['$props'];

export const ExternalLink: Story = {
  render: (args: InlineLinkStoryArgs) => ({
    components: { InlineLink },
    setup() {
      return { args };
    },
    template: '<InlineLink v-bind="args">Visit profile</InlineLink>',
  }),
};

export const PlainTextFallback: Story = {
  args: {
    href: undefined,
  },
  render: (args: InlineLinkStoryArgs) => ({
    components: { InlineLink },
    setup() {
      return { args };
    },
    template: '<InlineLink v-bind="args">No URL provided</InlineLink>',
  }),
};
