import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { useRef, useState, useEffect, useCallback, lazy } from 'react';
import Background from "./assets/background.svg"
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { PanResponder } from 'react-native';
import CurvedAppBar from './CurvedAppBar';
import { AntDesign } from '@expo/vector-icons';
import Toast from 'react-native-toast-message';

export default function App() {

  return (
    <View style={styles.container}>
      <CurvedAppBar
        fabIconTint={'white'}
        fabBackgroundTint={'#474667'}
        itemBackgroundTints={['#4592a5', '#f83a7d', '#0a93f3']}
        activeColor={'black'}
        icons={[
          <AntDesign name="customerservice" size={24} color="white" />,
          <AntDesign name="creditcard" size={24} color="white" />,
          <AntDesign name="barschart" size={24} color="white" />
        ]}
        triggers={[
          () => {
            Toast.show({
              type: 'info',
              text1: 'You clicked one'
            });
          },
          () => {
            Toast.show({
              type: 'info',
              text1: 'You clicked two'
            });
          },
          () => {
            Toast.show({
              type: 'info',
              text1: 'You clicked three'
            });
          },
        ]}
      />



      <Toast
        position='bottom'
        bottomOffset={20} />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
});
