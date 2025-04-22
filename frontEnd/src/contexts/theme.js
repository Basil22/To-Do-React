export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          // light mode colors
          background: {
            default: "#f5f5f5",
          },
        }
      : {
          // dark mode colors
          background: {
            default: "#121212",
          },
        }),
  },
});
