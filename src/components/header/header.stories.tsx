import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

import { Header } from "@/components/header/header";

const meta: Meta<typeof Header> = {
  component: Header,
  args: {
    text: "Header Text",
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Primary: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const headerText = canvas.getByText(/Header Text/);
    await expect(headerText).toBeInTheDocument();
  },
};
