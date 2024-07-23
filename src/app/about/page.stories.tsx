import About from "./page";

export default {
  component: About,
  title: "About",
  tags: ["autodocs"],
  excludeStories: /.*Data$/,
};

const Template = (args: any) => <About {...args} />;

export const Default = Template.bind({});
