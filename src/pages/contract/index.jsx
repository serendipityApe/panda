import { useMemo } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'


export default function Index () {
  const page = useMemo(() => Taro.getCurrentInstance().page, [])

  useDidShow(() => {
    const tabbar = Taro.getTabBar(page)
    tabbar?.setSelected(3)
  })

  return (
    <View className="index min-h-[100vh] bg-[#f6f6f6]">
      <Text>我是个人中心！</Text>
    </View>
  )
}
