export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/login/index",
    "pages/customer/index",
    "pages/housekeeper/index",
    "pages/contract/index",
    "pages/agreement/index",
    "pages/authentication/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "熊猫",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    custom: true,
    color: "#000000",
    selectedColor: "#DC143C",
    backgroundColor: "#ffffff",
    list: [
      {
        pagePath: "pages/index/index",
        text: "首页",
      },
      {
        pagePath: "pages/customer/index",
        text: "家政客户",
      },
      {
        pagePath: "pages/housekeeper/index",
        text: "家政员",
      },
      {
        pagePath: "pages/contract/index",
        text: "合同",
      },
    ],
  },
});
