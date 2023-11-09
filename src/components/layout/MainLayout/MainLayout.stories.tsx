import { Meta, StoryObj } from "@storybook/react";
import { MainLayout } from ".";

const meta: Meta<typeof MainLayout> = {
  component: MainLayout,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof MainLayout>;

export const Default: Story = {
  args: {
    children: <div>Hello world</div>,
  },
};
