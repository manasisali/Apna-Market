import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, getFirestore, query, where, getDocs } from 'firebase/firestore'
import { useUser } from '@clerk/clerk-expo'
import { app } from '../../firebaseConfig'
import LatestItemList from '../Components/HomeScreen/LatestItemList'

export default function MyProducts() {

    const db=getFirestore(app)
    const {user}=useUser();
    const [productList,setproductList] = useState([]);

    useEffect(()=>{
      user&&getUserPost();
    },[user])

    const getUserPost=async()=>{
        setproductList([]);
        const q=query(collection(db,'UserPost'),where('userEmail','==',user?.primaryEmailAddress?.emailAddress));
        const snapshot=await getDocs(q);
        snapshot.forEach(doc=>{
            console.log(doc.data());
            setproductList(productList=>[...productList,doc.data()])
        })
    }
  return (
    <View>
      <LatestItemList latestItemList={productList}
      />
    </View>
  )
}