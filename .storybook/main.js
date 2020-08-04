module.exports = {
  stories: ["../src/stories/**/*.stories.(ts|tsx|js|jsx|mdx)"],
  addons: [
    "@storybook/addon-actions",
    "@storybook/addon-links",
    "@storybook/preset-create-react-app",
    "@storybook/addon-knobs",
    {
      name: "@storybook/addon-docs",
      options: {
        configureJSX: true,
      },
    },
  ],
};
