import type { Meta, StoryObj} from "@storybook/react"
import { within, expect } from '@storybook/test';

import Home from "@/app/page";

const meta: Meta<typeof Home> = {
  component: Home
};

export default meta;
type Story = StoryObj<typeof Home>;

export const Primary: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const headerText = canvas.getByText(/Language Day-by-Day/);
    await expect(headerText).toBeInTheDocument();
  }
};

