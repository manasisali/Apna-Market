import { View, Text, Image, TouchableOpacity  } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function PostItem({item}) {
  const navigation=useNavigation();
  return (
    <TouchableOpacity className="flex-1 m-2 p-2 rounded-lg border-[1px] border-slate-200"
      onPress={()=>navigation.push('product-detail',
      {
        product:item
      }
      )}
    >
            <Image source={{uri:item.image}}
            className="w-full h-[180px] rounded-lg "/>
          <View>
            <Text className="text-[19px] font-bold mt-2">{item.title}</Text>
            <Text className="text-[20px] font-bold text-green-700">Rs. {item.price}/-</Text>
            <Text className="bg-green-100 font-bold p-1 rounded-full text-green-900 px-3 text-[10px] w-[100px] text-center mt-1">
              {item.category}</Text>
          </View>
          </TouchableOpacity> 
  )
}