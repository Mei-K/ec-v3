module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/_variables.scss";
        `,
      },
    },
  },
};
