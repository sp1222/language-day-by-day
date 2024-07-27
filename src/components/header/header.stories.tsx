import type { Meta, StoryObj } from "@storybook/react";
import { within, expect } from "@storybook/test";

import { Header } from "@/components/header/header";

const meta: Meta<typeof Header> = {
  component: Header,
  args: {
    text: "Language Day-by-Day",
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Primary: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const headerText = canvas.getByText(/Language Day-by-Day/);
    await expect(headerText).toBeInTheDocument();
  },
};
