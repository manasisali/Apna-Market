import { View, Text, Image,FlatList, TouchableOpacity, ToastAndroid } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo';
import caption from './../../assets/images/caption.png'
import logout from './../../assets/images/logout.png'
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const { isLoaded,signOut } = useAuth();
  const {user}=useUser();
  const navigation=useNavigation();
  const menuList=[
    {
      id:1,
      name:'My Products',
      icon:caption,
      path:'my-product'
    },
    {
      id:2,
      name:'Logout',
      icon:logout,
    }
  ]
  

  const onMenuPress=(item)=>{
    if(item.name=='Logout'){
      ToastAndroid.show('User Sign Out Successfully.',ToastAndroid.SHORT);
       signOut();
      return;
    }
        item?.path?navigation.navigate(item.path):null;
  }
  return (
    <View className="p-5">
      <View className="mt-20 items-center">
          <Image source={{uri:user?.imageUrl}}
          className="w-[100px] h-[100px] rounded-full "
          />
          <Text className="font-bold text-[25px] mt-2">{user.fullName}</Text>
          <Text className="text-gray-500 text-[18px] mt-2">{user.primaryEmailAddress.emailAddress}</Text>
      </View>

      <FlatList
      data={menuList}
      numColumns={2}
      renderItem={({item,index})=>(
        <TouchableOpacity className="flex-1 p-5 items-center rounded-lg
         bg-green-100 m-5 border-green-800 border-[1px]"
         onPress={()=>onMenuPress(item)}>
          {item.icon&& <Image source={item?.icon}
          className=" w-[100px] h-[100px] "/>}
          <Text className="text-[15px] text-green-900 mt-2 ">
            {item.name}</Text>
        </TouchableOpacity>
      )}
      />
    </View>
  )
}