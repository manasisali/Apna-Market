import { View, Text ,Image, ScrollView,TouchableOpacity,Linking, Share} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { Entypo } from '@expo/vector-icons';

export default function ProductDetail({navigation}) {
  const {params} = useRoute();
  const[product,setproduct] = useState([]);
  useEffect(()=>{
       params&&setproduct(params.product);
       shareButton();
  },[params,navigation])

  const shareButton=()=>{
    navigation.setOptions({
      headerRight: () => (
         <Entypo name="share" size={24} color="white" 
          style={{marginRight:15}}
          onPress={()=>shareProduct()}/>
        ),
    });
}

  const shareProduct=()=>{
    const content={
      message:product.title+"\n"+product.desc,
    }
    Share.share(content).then(resp=>{
      console.log(resp);
    },(error)=>{
      console.log(error)
    })
  }

  const sendEmailMessage=()=>{
    const subject = 'Regarding'+product.title;
    const body = 'Hi'+product.userName+"\n"+"I am intrested in your product."
    Linking.openURL('mailto:'+product.userEmail+"?subject="+subject+"&body="+body);
  }
  return (

    <ScrollView className="bg-white">
      <Image source={{uri:product.image}}
      className="h-[320px] w-full"/>
      <View className="p-3">
        <Text className="text-[24px] font-bold"
        >{product.title}</Text>
        <View className="items-baseline">
        <Text className="bg-green-200 font-bold p-1 px-2 rounded-full
         text-green-900 mt-2">
              {product.category}</Text>
        </View>
        <Text className="text-[20px] mt-3 font-bold"
        >Description</Text>
        <Text className="text-[17px] text-gray-500 mb-3"
        >{product.desc}</Text>
      </View>
      <View className="p-3 flex-1 flex-row gap-3 items-center bg-green-100">
        <Image source={{uri:product.userImage}}
        className="w-12 h-12 rounded-full "/>
        <View>
          <Text className="text-[18px] font-bold">{product.userName}</Text>
          <Text className="text-gray-500">{product.userEmail}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={sendEmailMessage} className="bg-green-900 p-4 m-2 z-40 rounded-full">
            <Text className="text-white text-center text-[20px]">Send Message</Text>
        </TouchableOpacity>
    </ScrollView>
  )
}