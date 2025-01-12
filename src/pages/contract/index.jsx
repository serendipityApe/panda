import { useEffect, useMemo, useState } from "react";
import Taro, { useDidShow } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { AtSearchBar, AtButton, AtIcon } from "taro-ui";
import "./index.scss";
import { useSelector, useDispatch } from "react-redux";
import ScreenBar from "./components/ScreenBar";
import ContractCard from "./components/ContractCard";
import { getContractSelectCondition, getContractList } from "@/api";

export default function Index() {
  const [searchWord, setSearchWord] = useState("");
  const [contractData, setContractData] = useState([
    { name: "丫丫" },
    { name: "笨笨" },
  ]);

  const page = useMemo(() => Taro.getCurrentInstance().page, []);
  const userInfo = useSelector((state) => state.user.userInfo);

  console.log(userInfo, "userInfo");
  useDidShow(() => {
    const tabbar = Taro.getTabBar(page);
    tabbar?.setSelected(3);
  });
  useEffect(() => {
    const _callAPI = async () => {
      const data = await getContractList(
        {
          shopFid: userInfo?.shopFids[0],
        },
        {
          Access_Token: userInfo.access_token,
          Auth,
        }
      );
      console.log("getContractList", data);
      if (data.code === "0") {
        setContractData(data.data.rows);
      }
    };
    if (userInfo) {
      _callAPI();
    }
  }, [userInfo]);
  useEffect(async () => {
    const { res } = await getContractSelectCondition();
    console.log(res);
  });

  const onChange = (value) => {
    setSearchWord(value);
  };

  const addContract = () => {
    Taro.navigateTo({
      url: "/pages/addcontract/index",
    });
  };

  return (
    <View className="index min-h-[100vh] bg-[#f6f6f6]">
      <AtSearchBar value={searchWord} onChange={onChange} />
      <View>{searchWord}</View>
      <ScreenBar></ScreenBar>
      <View className="p-[24px]">
        {contractData.map((item, index) => {
          return <ContractCard key={index} contractData={item}></ContractCard>;
        })}
      </View>
      <View className="add-btn-box absolute bottom-[300px] right-[30px]">
        <AtButton
          className="add-btn rounded-full flex flex-col align-baseline"
          type="primary"
          size="small"
          onClick={() => {
            addContract();
          }}
        >
          <AtIcon value="add" size="30" color="#FFFFFF"></AtIcon>
        </AtButton>
      </View>
    </View>
  );
}
