module.exports = {
  siteMetadata: {
    siteUrl: `https://clarkmu.com`,
    title: "Michael Clark Portfolio",
  },
  plugins: [
    "gatsby-plugin-postcss",
    // {
    //   resolve: `gatsby-plugin-csp`,
    //   options: {
    //     // disableOnDev: true,
    //     reportOnly: false, // Changes header to Content-Security-Policy-Report-Only for csp testing purposes
    //     mergeScriptHashes: true, // you can disable scripts sha256 hashes
    //     mergeStyleHashes: true, // you can disable styles sha256 hashes
    //     mergeDefaultDirectives: true,
    //     directives: {
    //       "script-src": "'self' 'unsafe-hashes'",
    //       "style-src": "'self' 'unsafe-inline'",
    //       "img-src": "'self'",
    //       // you can add your directives or override defaults
    //     },
    //   },
    // },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: `Michael Clark Portfolio`,
        title: `Michael Clark Portfolio`,
        short_name: `ClarkMU`,
        start_url: `/`,
        icon: "static/logo.webp",
      },
    },
  ],
};
