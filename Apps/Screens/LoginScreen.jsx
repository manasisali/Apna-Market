import { View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import * as WebBrowser from 'expo-web-browser';
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <Image source={require('./../../assets/images/login.png')}
          className="w-full h-[400px] object-cover"
      />
      <View >
        <Text className="text-[30px] mt-10 pl-8 font-bold mx-10">Aapna Marketplace</Text>
        <Text className="text-[18px] p-10 text-slate-500 mt-6">Buy and Sell Marketplace where you can sell old item and make real money.</Text>
        <TouchableOpacity onPress={onPress} className="p-4 bg-blue-900 rounded-full mt-18 mx-10">
            <Text className="text-white text-center text-[20px]">Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}