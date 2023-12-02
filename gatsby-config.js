module.exports = {
  siteMetadata: {
    siteUrl: `https://clarkmu.com`,
    title: "Michael Clark Portfolio",
  },
  plugins: [
    "gatsby-plugin-postcss",
    {
      resolve: `gatsby-plugin-csp`,
      options: {
        disableOnDev: true,
      },
    },
  ],
};
