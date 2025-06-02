import React from 'react'
import { View } from 'react-native'

const StubsCard = ({ backgroundStyle }: { backgroundStyle: string }) => {
  return (
    <View className=
      {`flex flex-col items-center justify-center w-full h-full
        rounded-lg
        ${backgroundStyle}`

      }>

    </View>
  )
}

export default StubsCard
