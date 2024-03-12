import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Categories({CategoryList}) {
  const navigation=useNavigation();
  return (
    <View className="mt-3">
      <Text className="font-bold text-[20px]">Categories</Text>
      <FlatList
        data={CategoryList}
        numColumns={3}
        renderItem={({item,index})=>(
            <TouchableOpacity 
            onPress={()=>navigation.navigate('item-list',{
              category:item.name
            })}
            className="flex-1 items-center justify-center p-2 
               border-[2px] border-green-800 m-1 h-[80px] rounded-lg">
                <Image source={{uri:item?.icon}}
                    className="h-[45px] w-[45px]"
                />
                <Text className="text-[14px] mt-1">{item.name}</Text>
            </TouchableOpacity>
        )}
      />
    </View>
  )
}