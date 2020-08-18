module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        components: "@/components",
        content: "components/content",
        common: "components/common",
        assets: "@/assets",
        network: "@/network",
        views: "@/views",
        services: "@/services",
        store: "@/store",
        utils: "@/utils"
      }
    }
  }
};
