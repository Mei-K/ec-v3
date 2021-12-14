module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `
            @import "@/scss/_variables.scss";
          `,
      },
    },
  },

  devServer: {
    // Your configuration goes here
  },
};
