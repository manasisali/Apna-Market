import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native';
import { collection, getDocs, getFirestore, query, where, getDoc } from 'firebase/firestore';
import { app } from '../../firebaseConfig'
import LatestItemList from '../Components/HomeScreen/LatestItemList';

export default function ItemList() {
  const {params}=useRoute();
  const db=getFirestore(app)
  const [itemList,setItemList]=useState([]);
  const[loading,setloading]=useState(false);

  useEffect(()=>{
    params&&getItemListByCategory();
  },[params])

  const getItemListByCategory=async()=>{
    setItemList([]);
    setloading(true)
    const q=query(collection(db,'UserPost'),where('category','==',params.category));
    const snapshot=await getDocs(q);
    snapshot.forEach(doc=>{
        console.log(doc.data());
        setItemList(itemList=>[...itemList,doc.data()])
        setloading(false)
    })
  }
  return (
    <View className="p-2">
      {loading?
      <ActivityIndicator size={'large'} color={'#1b8237'}/>
      :
     itemList?.length>0?<LatestItemList latestItemList={itemList}
     heading={''}/>
    :<Text className="p-5 text-[20px] justify-center text-gray-400 mt-24 text-center">No Post Found</Text>}
    </View>
  )
}