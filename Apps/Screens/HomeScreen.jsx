import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/HomeScreen/Header'
import Slider from '../Components/HomeScreen/Slider'
import { getFirestore } from 'firebase/firestore'
import {app} from '../../firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import Categories from '../Components/HomeScreen/Categories'
import LatestItemList from '../Components/HomeScreen/LatestItemList'


export default function HomeScreen() {
  const db = getFirestore(app);
  const[sliderList,setSliderList]=useState([]);
  const[CategoryList,setCategoryList]=useState([]);
  const[latestItemList,setLatestItemList]=useState([]);

  useEffect(()=>{
      getSliders();
      getCategory();
      getLatestItemList();
  },[])

  const getSliders=async()=>{
      setSliderList([])
    const querySnapshot = await getDocs(collection(db, "Sliders"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      setSliderList(sliderList=>[...sliderList,doc.data()]);
    });
  }

  const getCategory=async()=>{
    setCategoryList([])
  const querySnapshot = await getDocs(collection(db, "Category"));
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    // console.log(doc.id, " => ", doc.data());
    setCategoryList(CategoryList=>[...CategoryList,doc.data()]);
  });
}

  const getLatestItemList=async()=>{
    setLatestItemList([]);
    const querySnapshot=await getDocs(collection(db,'UserPost'));
    querySnapshot.forEach((doc)=>{
      console.log("Docs",doc.data())
      setLatestItemList(latestItemList=>[...latestItemList,doc.data()])
    })
  }
  return (
    <View className="py-8 px-6 bg-white flex-1">
      <ScrollView
       showsVerticalScrollIndicator={false}>
        <Header/>
        <Slider sliderList={sliderList}/>
        <Categories CategoryList={CategoryList}/>
        <LatestItemList latestItemList={latestItemList}
        heading={"Latest Item"}
        />
      </ScrollView>
    </View>
  )
}
