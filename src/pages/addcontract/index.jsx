import { useState } from "react";
import Taro from "@tarojs/taro";
import { View, Text, Input, Picker, Button } from "@tarojs/components";
import { AtButton, AtInput, AtForm, AtIcon } from "taro-ui";
import { Popup, Cell } from "@antmjs/vantui";
// // 引入组件
// import { Cell } from "@antmjs/vantui/es/cell";
// // 引入组件对应的样式，若组件没有样式文件，则无须引入
// import "@antmjs/vantui/es/cell/style";
import RadioGroup from "../../components/Radio";
import "./index.scss";

import {
  contractTypeOption,
  putUpOption,
  timedReminderOption,
} from "./constant";

export default function Index() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: "", // 客户手机
    customerName: "", // 客户姓名
    contractType: "", // 合同类型
    contractPeriodStart: "", // 合同期限开始
    contractPeriodEnd: "", // 合同期限结束
    servicePersonnel: "", // 服务人员
    salary: "", // 家政员工资
    salaryDay: "", // 月工作天数
    customerServiceFee: "", // 客户服务费
    housekeepingServiceFee: "", // 家政员服务费
  });

  const topFormRanderList = [
    {
      name: "phoneNumber",
      title: "客户手机",
      type: "phone",
      placeholder: "输入客户手机",
      required: true,
    },
    {
      name: "customerName",
      title: "客户姓名",
      type: "text",
      placeholder: "输入客户姓名",
      required: true,
    },
  ];

  const midFormRanderList = [
    {
      name: "contractType",
      title: "合同类型",
      type: "contractType",
      range: contractTypeOption,
      placeholder: "选择合同类型",
      required: true,
    },
    {
      name: "contractPeriodStart",
      title: "合同期限",
      type: "timepicker",
      placeholder: "选择合同开始时间",
      required: true,
    },
    {
      name: "contractPeriodEnd",
      type: "timepicker",
      placeholder: "选择合同结束时间",
      required: true,
    },
    {
      name: "servicePersonnel",
      title: "服务人员2",
      type: "link",
      placeholder: "选择服务人员",
      required: true,
    },
    {
      name: "salary",
      title: "家政员工资(元/月)",
      type: "digit",
      placeholder: "输入家政员工资",
      required: true,
    },
    {
      name: "salaryDay",
      type: "number",
      placeholder: "输入家政员每月工作天数",
      required: true,
    },
    {
      name: "customerServiceFee",
      title: "客户服务费(元)",
      type: "digit",
      placeholder: "输入客户服务费",
      required: true,
    },
    {
      name: "housekeepingServiceFee",
      title: "家政员服务费(元)",
      type: "digit",
      placeholder: "输入家政员服务费",
      required: true,
    },
  ];
  const servicePersonnelOptions = ["保姆", "厨师", "家政员", "产后修复师"];
  const [formRanderList, setFormRanderList] = useState([]);
  const [checkedValue, setCheckedValue] = useState();
  const [addFormBtnList, setAddFormBtnList] = useState([
    {
      btnTitle: "备注",
      name: "remark",
      title: "备注",
      type: "text",
      placeholder: "合同备注，客户不可见",
    },
    {
      btnTitle: "约定定金",
      name: "earnestMoney",
      title: "定金(元)",
      type: "digit",
      placeholder: "约定客户缴纳的定金",
    },
    {
      btnTitle: "约定尾款",
      name: "earnestMoney",
      title: "尾款(元)",
      type: "digit",
      placeholder: "约定的客户后期支持的尾款",
    },
    {
      btnTitle: "约定尾款",
      name: "earnestMoney",
      title: "尾款(元)",
      type: "digit",
      placeholder: "约定的客户后期支持的尾款",
    },
    {
      btnTitle: "住宿情况",
      name: "putUp",
      title: "住宿",
      type: "picker",
      range: putUpOption,
      placeholder: "约定的客户后期支持的尾款",
    },
    {
      btnTitle: "预产期",
      name: "expectedDate",
      title: "预产期",
      type: "timepicker",
      placeholder: "预产期前两周提醒代办",
    },
    {
      btnTitle: "工资发放日",
      name: "payDay",
      title: "工资发放日",
      type: "number",
      placeholder: "家政员每月工资发放日",
    },
    {
      btnTitle: "定时提醒间隔",
      name: "timedReminder",
      title: "定时提醒间隔",
      range: timedReminderOption,
      type: "picker",
      placeholder: "请选择",
    },
    {
      btnTitle: "自定义条款",
      name: "customTerms",
      title: "自定义条款",
      type: "text",
      placeholder: "模板合同之外，客户要求的自定义的条款内容",
    },
  ]);

  const [formError, setFormError] = useState({
    phoneNumber: false,
    customerName: false,
    contractType: false,
    contractPeriod: false,
    servicePersonnel: false,
    salary: false,
    customerServiceFee: false,
    housekeepingServiceFee: false,
  });

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSelectChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
    setFormError({
      ...formError,
      [key]: false,
    });
  };

  const handleSubmit = () => {
    // 校验必填项
    const requiredFields = [
      "phoneNumber",
      "customerName",
      "contractType",
      "contractPeriodStart",
      "contractPeriodEnd",
      "servicePersonnel",
      "salary",
      "customerServiceFee",
      "housekeepingServiceFee",
    ];
    let hasError = false;
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        console.log("必填项：", field, "为空");
        hasError = true;
        setFormError((prevError) => ({
          ...prevError,
          [field]: true,
        }));
      } else {
        setFormError((prevError) => ({
          ...prevError,
          [field]: false,
        }));
      }
    });
    console.log("提交的表单数据：", formData);

    if (hasError) {
      Taro.showToast({
        title: "请填写必填项2",
        icon: "none",
      });
      return;
    }

    // 处理提交逻辑，可以发送请求等
  };

  const handleAddForm = (form) => {
    // 将 form 添加到 formRanderList 中
    setFormRanderList((prevList) => [...prevList, form]);

    // 移除 addFormBtnList 中对应的 form
    setAddFormBtnList((prevBtnList) =>
      prevBtnList.filter((btn) => btn.name !== form.name)
    );
  };

  return (
    <View className="index pt-20 px-20 min-h-[100vh] bg-[#f6f6f6]">
      <AtForm className="!bg-transparent" onSubmit={handleSubmit}>
        <View className="mb-20 rounded-[16px] bg-white border border-transparent">
          {topFormRanderList &&
            topFormRanderList.map((item) => (
              <AtInput
                key={item.name}
                name={item.name}
                title={item.title}
                type={item.type}
                required={item.required}
                placeholder={item.placeholder}
                value={formData[item.name]}
                error={formError[item.name]}
                onChange={(value) => handleInputChange(item.name, value)}
              />
            ))}
        </View>
        <View className="mb-20 rounded-[16px] bg-white border border-transparent">
          {midFormRanderList &&
            midFormRanderList.map((item) => {
              if (item.type === "buffer") {
                return <View key={item.type} style={{ height: "20px" }} />; // 举例：buffer 类型的特殊处理
              } else if (item.type === "picker") {
                return (
                  <Picker
                    key={item.name}
                    mode="selector"
                    range={item.range}
                    onChange={(e) =>
                      handleSelectChange(item.name, e.detail.value)
                    }
                  >
                    <View>
                      <AtInput
                        name={item.name}
                        title={item.title}
                        type={item.type}
                        required={item.required}
                        placeholder={item.placeholder}
                        value={item.range[formData[item.name]]}
                        error={formError[item.name]}
                      />
                    </View>
                  </Picker>
                );
              } else if (item.type === "timepicker") {
                // 处理 timepicker 类型的特殊渲染
                return (
                  <Picker
                    key={item.name}
                    mode="date"
                    onChange={(e) =>
                      handleSelectChange(item.name, e.detail.value)
                    }
                  >
                    <View>
                      <AtInput
                        name={item.name}
                        title={item.title}
                        type={item.type}
                        required={item.required}
                        placeholder={item.placeholder}
                        value={formData[item.name]}
                        error={formError[item.name]}
                      />
                    </View>
                  </Picker>
                );
              } else if (item.type === "link") {
                return (
                  <View key={item.name}>
                    <Cell
                      title="服务人员"
                      isLink
                      required={item.required}
                      value={checkedValue}
                      onClick={() => {}}
                    />
                  </View>
                );
              } else if (item.type === "contractType") {
                return (
                  <View key={item.name}>
                    <Cell
                      title="合同类型"
                      isLink
                      required={item.required}
                      value={checkedValue}
                      onClick={() => setShow(true)}
                    />
                    <Popup
                      position="bottom"
                      height="200px"
                      show={show}
                      onClose={() => setShow(false)}
                    >
                      <RadioGroup
                        name="example"
                        options={servicePersonnelOptions.map((i) => ({
                          label: i,
                          value: i,
                        }))}
                        setCheckedValue={(value) => {
                          handleSelectChange(item.name, value);
                          setShow(false);

                          setCheckedValue(value);
                        }}
                        checkedValue={checkedValue}
                      />
                    </Popup>
                  </View>
                );
              } else {
                return (
                  <AtInput
                    key={item.name}
                    name={item.name}
                    title={item.title}
                    type={item.type}
                    required={item.required}
                    placeholder={item.placeholder}
                    value={formData[item.name]}
                    error={formError[item.name]}
                    onChange={(value) => handleInputChange(item.name, value)}
                  />
                );
              }
            })}
        </View>
        {formRanderList.length > 0 && (
          <View className="mb-20 rounded-[16px] bg-white border border-transparent">
            {formRanderList.map((item) => {
              if (item.type === "buffer") {
                return <View key={item.type} style={{ height: "20px" }} />; // 举例：buffer 类型的特殊处理
              } else if (item.type === "picker") {
                return (
                  <Picker
                    key={item.name}
                    mode="selector"
                    range={item.range}
                    onChange={(e) =>
                      handleSelectChange(item.name, e.detail.value)
                    }
                  >
                    <View>
                      <AtInput
                        name={item.name}
                        title={item.title}
                        type={item.type}
                        required={item.required}
                        placeholder={item.placeholder}
                        value={item.range[formData[item.name]]}
                        error={formError[item.name]}
                      />
                    </View>
                  </Picker>
                );
              } else if (item.type === "timepicker") {
                // 处理 timepicker 类型的特殊渲染
                return (
                  <Picker
                    key={item.name}
                    mode="date"
                    onChange={(e) =>
                      handleSelectChange(item.name, e.detail.value)
                    }
                  >
                    <View>
                      <AtInput
                        name={item.name}
                        title={item.title}
                        type={item.type}
                        required={item.required}
                        placeholder={item.placeholder}
                        value={formData[item.name]}
                        error={formError[item.name]}
                      />
                    </View>
                  </Picker>
                );
              } else if (item.type === "link") {
                // 处理 link 类型的特殊渲染
                // ...
              } else if (item.type === "cell") {
                return (
                  <Picker
                    key={item.name}
                    mode="selector"
                    range={item.range}
                    onChange={(e) =>
                      handleSelectChange(item.name, e.detail.value)
                    }
                  >
                    <View>
                      <Cell
                        name={item.name}
                        title={item.title}
                        type={item.type}
                        required={item.required}
                        error={formError[item.name]}
                      />
                    </View>
                  </Picker>
                );
              } else {
                return (
                  <AtInput
                    key={item.name}
                    name={item.name}
                    title={item.title}
                    type={item.type}
                    required={item.required}
                    placeholder={item.placeholder}
                    value={formData[item.name]}
                    error={formError[item.name]}
                    onChange={(value) => handleInputChange(item.name, value)}
                  />
                );
              }
            })}
          </View>
        )}

        <View className="mb-[28px]">
          <View className="text-black/50 text-[24px] mb-[24px]">
            添加以下内容:
          </View>
          <View className="flex flex-wrap justify-start">
            {addFormBtnList &&
              addFormBtnList.map((item) => (
                <View className="mr-[10px] mb-[16px]">
                  <AtButton size="small" onClick={() => handleAddForm(item)}>
                    <View className="flex items-center">
                      <AtIcon value="add" size="12" color="#858585"></AtIcon>
                      {item.btnTitle}
                    </View>
                  </AtButton>
                </View>
              ))}
          </View>
          <View className="text-black/50 text-[24px]">
            提示：添加合同，将自动在上户前7天，添加一个上户提醒。家政员下户前7天，添加一个合同到期提醒（详见手机软件首页）
          </View>
        </View>

        {/* 提交按钮 */}
        <AtButton type="primary" formType="submit">
          保存
        </AtButton>
      </AtForm>
    </View>
  );
}
