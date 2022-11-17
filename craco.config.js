const CracoAlias = require("craco-alias");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin

const isProductionBuild = process.env.NODE_ENV === "production"
const shouldAnalyze = process.env.REACT_APP_RUN_ANALYZER === "true"
const plugins = []
if (isProductionBuild && shouldAnalyze ) {
  plugins.push(new BundleAnalyzerPlugin({ analyzerMode: 'server' }))
}
module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "options",
        baseUrl: "./",
        aliases: {
          "txml/txml": "./node_modules/txml/dist/txml",
        }
      }
    }
  ],
  webpack: {
    plugins,
  },
}
