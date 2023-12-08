/**
 * 自定义原生 tabbar
 */
import { Component } from "react";
import Taro from "@tarojs/taro";
import { CoverView, CoverImage } from "@tarojs/components";

import "./index.scss";

export default class Index extends Component {
  state = {
    selected: 0,
    color: "#000000",
    selectedColor: "#082FAC",
    list: [
      {
        pagePath: "/pages/index/index",
        selectedIconPath:
          "https://fe-staticaccess.oss-cn-beijing.aliyuncs.com/home-active.png",
        iconPath:
          "https://fe-staticaccess.oss-cn-beijing.aliyuncs.com/home.png",
        text: "首页",
      },
      {
        pagePath: "/pages/customer/index",
        selectedIconPath:
          "https://fe-staticaccess.oss-cn-beijing.aliyuncs.com/customer-active.png",
        iconPath:
          "https://fe-staticaccess.oss-cn-beijing.aliyuncs.com/customer.png",
        text: "家政客户",
      },
      {
        pagePath: "/pages/housekeeper/index",
        selectedIconPath:
          "https://fe-staticaccess.oss-cn-beijing.aliyuncs.com/housekeeper-active.png",
        iconPath:
          "https://fe-staticaccess.oss-cn-beijing.aliyuncs.com/housekeeper.png",
        text: "家政员",
      },
      {
        pagePath: "/pages/contract/index",
        selectedIconPath:
          "https://fe-staticaccess.oss-cn-beijing.aliyuncs.com/contract-active.png",
        iconPath:
          "https://fe-staticaccess.oss-cn-beijing.aliyuncs.com/contract.png",
        text: "合同",
      },
    ],
  };

  switchTab(index, url) {
    this.setSelected(index);
    Taro.switchTab({ url });
  }

  setSelected(idx) {
    this.setState({
      selected: idx,
    });
  }

  render() {
    const { list, selected, color, selectedColor } = this.state;

    return (
      <CoverView className="tab-bar">
        <CoverView className="tab-bar-border"></CoverView>
        {list.map((item, index) => {
          return (
            <CoverView
              key={index}
              className="tab-bar-item"
              onClick={this.switchTab.bind(this, index, item.pagePath)}
            >
              <CoverImage
                src={selected === index ? item.selectedIconPath : item.iconPath}
              />
              <CoverView
                style={{ color: selected === index ? selectedColor : color }}
              >
                {item.text}
              </CoverView>
            </CoverView>
          );
        })}
      </CoverView>
    );
  }
}
