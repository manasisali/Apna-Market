import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ToastAndroid, ScrollView, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { app } from '../../firebaseConfig';
import { Formik } from 'formik';
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker';
import { getFirestore, getDocs, collection, addDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUser } from '@clerk/clerk-expo';
export default function AddPostScreen() {
  
  const db = getFirestore(app);
  const storage = getStorage();
  const[categoryList,setCategoryList] = useState([]);

  const {user}=useUser();
  useEffect(()=>{
       getCategoryList();
  },[])
  const getCategoryList=async ()=>{
    setCategoryList([]);
    const querySnapshot =await getDocs(collection(db,'Category'));

    querySnapshot.forEach((doc)=>{
      console.log("Docs:",doc.data());
      setCategoryList(categoryList=>[...categoryList,doc.data()])
    })
  }
  
  const [image, setImage] = useState(null);
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const onSubmitMethod=async(value)=>{
    // value.image= image;
    // console.log(value);
    const resp=await fetch(image);
    const blob=await resp.blob();
    const storageRef = ref(storage, 'sastaMarketplace/'+Date.now()+".jpg");
    
    uploadBytes(storageRef, blob).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    }).then((resp)=>{
      getDownloadURL(storageRef).then(async(downloadUrl)=>{
        console.log(downloadUrl);
        value.image=downloadUrl;
        value.userName=user.fullName;
        value.userEmail=user.primaryEmailAddress.emailAddress;
        value.userImage=user.imageUrl;

        const docRef=await addDoc(collection(db,"UserPost"),value)
        if(docRef.id)
        {
          console.log("Document Added!!")
          ToastAndroid.show("Post Added Successfully!!",ToastAndroid.SHORT);
        }
      })
    });
  }
  return (
    <KeyboardAvoidingView>
    <ScrollView className="p-10">
    <Text className="text-[27px] font-bold">Add New Post</Text>
    <Text className="text-[16px] text-gray-500 mb-7">Create New Post and Start Selling</Text>
      <Formik
        initialValues={{title:'',desc:'',category:'',address:'',image:'',price:'',userName:'',userEmail:'',userImage:'',createdAt:Date.now()}}  
        onSubmit={value=>onSubmitMethod(value)}
        validate={(values)=>{
          const errors={}
          if(!values.title)
          {
            console.log("Title not present");
            ToastAndroid.show('Title must be there',ToastAndroid.SHORT);
            errors.name="Title must be there";
          }
          return errors
        }}
      >
       {({handleChange,handleBlur,handleSubmit,values})=>(
        <View>
          <TouchableOpacity onPress={pickImage}>
          {image?
          <Image source={{uri:image}} style={{width:100, height:100,borderRadius:15}}/>
          :<Image source={require('../../assets/images/error.png')}
          style={{width:100, height:100, borderRadius:15}}/>}
            {/* <Image source={require('../../assets/images/error.png')}
            style={{width:100, height:100, borderRadius:15}}/> */}
          </TouchableOpacity>
          <TextInput style={styles.input}
          placeholder='Title'
          value={values?.title}
          onChangeText={handleChange('title')}
          />
          <TextInput style={styles.input}
          placeholder='Description'
          value={values?.desc}
          numberOfLines={5}
          onChangeText={handleChange('desc')}
          />
          <TextInput style={styles.input}
          placeholder='Address'
          value={values?.address}
          onChangeText={handleChange('address')}
          />
          <TextInput style={styles.input}
          placeholder='Price'
          value={values?.price}
          keyboardType='number-pad'
          onChangeText={handleChange('price')}
          />
        <View style={{borderWidth:1,borderRadius:10,marginTop:15}}>
          <Picker
            selectedValue={values?.category}
            style={styles.input}
            onValueChange={handleChange('category')}
          >
            {categoryList && categoryList.map((item,index)=>(
               <Picker.Item key={index} label={item?.name} value={item?.name}/>
            ))}
            </Picker>
          </View>
          <TouchableOpacity onPress={handleSubmit} className="p-5 bg-blue-900 rounded-full mt-10">
            <Text className="text-white text-center text-[16px]">Submit</Text>
          </TouchableOpacity>
         
        </View>
       )}
      </Formik>
    </ScrollView>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  input:{
      borderWidth:1,
      borderRadius:10,
      padding:10,
      paddingHorizontal:17,
      fontSize:20,
      marginTop:10,
      marginBottom:5
  },
})