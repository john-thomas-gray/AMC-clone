import MacGuffinsBar from '@/components/foodAndDrinks/MacguffinsBar'
import OrderAhead from '@/components/foodAndDrinks/OrderAhead'
import SlidingLayout from '@/components/SlidingLayout'
import React from 'react'
import { View } from 'react-native'

const DummyData = {
  theatres: ["AMC Bay Street 16", "AMC Burbank 16", "AMC Century City 15", "AMC Downtown Disney 12", "AMC Empire 25", "AMC Garden State Plaza 16", "AMC Lincoln Square 13", "AMC Loews Boston Common 19", "AMC Loews Cherry Hill 24", "AMC Loews Jersey Gardens 20", "AMC Loews Lincoln Square 13", "AMC Loews Newport Centre 11", "AMC Loews Oak Tree 6", "AMC Loews Palisades Center 21", "AMC Loews Rockaway 16", "AMC Loews Stony Brook 17"]
}

const FoodAndDrinks = () => {
  return (
    <View className="flex-1 bg-black">
      <SlidingLayout buttonNames={['ORDER AHEAD', 'MACGUFFINS BAR']}>
        <OrderAhead theatres={DummyData.theatres} />
        <MacGuffinsBar theatres={DummyData.theatres} />
      </SlidingLayout>
    </View>
  )
}
export default FoodAndDrinks
