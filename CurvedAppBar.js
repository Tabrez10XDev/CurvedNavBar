import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { useRef, useState, useEffect, useCallback, lazy } from 'react';
import Background from "./assets/background.svg"
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { PanResponder } from 'react-native';
export default function CurvedAppBar() {

  const [xy, setXY] = useState({x: 0, y: 0})
  const [layout, setLayout] = useState({height: 0, width: 0})
  const [layout2, setLayout2] = useState({height: 0, width: 0})
  const [layout3, setLayout3] = useState({height: 0, width: 0})

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (evt, gestureState) => {
                  setXY({x: gestureState.dx, y: gestureState.dy})
          // pan.extractOffset();
        },
      onPanResponderRelease: (evt, gestureState) => {
        
        // console.log("release", gestureState.x0);
        // console.log("release", gestureState.dx);
        // console.log("release", gestureState.moveX);
        // console.log("release", gestureState.vx);


        // // pan.extractOffset();
      },
    }),
  ).current;

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const fadeAnimModal = useRef(new Animated.Value(0)).current;

  const [isVisible, setIsVisible] = useState(true)


  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    setXY({x:0,y:0})
    setIsVisible(true)
    fadeOutModal()
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    setIsVisible(false)
    fadeInModal()
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };


  const fadeInModal = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    setIsVisible(false)
    Animated.timing(fadeAnimModal, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const gesture = Gesture.Pan()
  gesture.onTouchesUp(() => {
//     if(isInsideSquare(xy.x, xy.y, layout)) {
//       console.log("Clicked One");
//     }
//     else if(isInsideSquare(xy.x, xy.y, layout2)) {
//       console.log("Clicked  Two");
//     }
//     else if(isInsideSquare(xy.x, xy.y, layout3)) {
//       console.log("Clicked Three");
//     }
//     fadeIn()
// console.log("faded");
  })

  gesture.onEnd(()=>{
    console.log("ended");
  })

  gesture.onTouchesCancelled(()=>{
    if(isInsideSquare(xy.x, xy.y, layout)) {
      console.log("Clicked One");
    }
    else if(isInsideSquare(xy.x, xy.y, layout2)) {
      console.log("Clicked  Two");
    }
    else if(isInsideSquare(xy.x, xy.y, layout3)) {
      console.log("Clicked Three");
    }
    fadeIn()
console.log("faded");
  })






  const fabGesture = Gesture.LongPress()


  fabGesture.onTouchesDown(() => {
    fadeOut()
  })






  fabGesture.onEnd(() => {
  })







  const fadeOutModal = () => {
    setIsVisible(true)
    Animated.timing(fadeAnimModal, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const rotate = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['45deg', '0deg'],
  });

  const position = fadeAnimModal.interpolate({
    inputRange: [0, 1],
    outputRange: [Dimensions.get('window').width * 0.4, 0],
  });

  const scale = fadeAnimModal.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 1],
  });


  const reverseRotate = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['-45deg', '0deg'],
  });

  function isInsideSquare(_x, _y, layout) {

    const x = Dimensions.get('screen').width * 0.5 + _x
    const y = Dimensions.get('screen').width * 0.55 + _y


    const x1 = layout.width - 10
    const x2 = layout.width + 45

    const y1 = layout.height - 10
    const y2 = layout.height + 45


    return x >= x1 && x <= x2 && y >= y1 && y <= y2;
  }


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>

      <View

        style={styles.container}>
        <View
        {...panResponder.panHandlers}

          style={{ width: Dimensions.get('window').width * 0.6, position: 'absolute', bottom: 30, right: 30, height: Dimensions.get('window').width * 0.65 }}>

          <GestureDetector gesture={gesture} style={{ width: '100%', height: '100%', position: 'relative' }}>
            <View style={{ width: '100%', height: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
              <Animated.View style={{ height: '100%', width: '100%', borderRadius: 16, opacity: fadeAnimModal, position: 'relative', transform: [{ scale: scale }, { translateX: position }, { translateY: position }] }}>
                <Background width="100%" />
                <View
                  onLayout={(event) => {
                    setLayout({height: event.nativeEvent.layout.y, width: event.nativeEvent.layout.x})
                  }}
                  style={{ width: 45, height: 45, backgroundColor: isInsideSquare(xy.x, xy.y, layout) ?  'green' : 'red', borderRadius: 45, position: 'absolute', left: '25%', bottom: '5%' }}>
                </View>

                <View 
                 onLayout={(event) => {
                  setLayout2({height: event.nativeEvent.layout.y, width: event.nativeEvent.layout.x})
                }}
                style={{ width: 45, height: 45, backgroundColor: isInsideSquare(xy.x, xy.y, layout2) ?  'green' : 'pink', borderRadius: 45, position: 'absolute', left: '40%', bottom: '35%' }}>
                </View>
                <View 
                 onLayout={(event) => {
                  setLayout3({height: event.nativeEvent.layout.y, width: event.nativeEvent.layout.x})
                }}
                style={{ width: 45, height: 45, backgroundColor: isInsideSquare(xy.x, xy.y, layout3) ?  'green' : 'blue', borderRadius: 45, position: 'absolute', left: '65%', bottom: '55%' }}>
                </View>
              </Animated.View>

              <GestureDetector
                gesture={fabGesture}
              >

                <View
                  // onPressOut={()=>{fadeIn()}}

                  style={{ width: 50, height: 50, borderRadius: 100, backgroundColor: '#474667', alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 0, bottom: 0 }}>
                  <Animated.View style={{ height: 2, width: '50%', backgroundColor: 'black', opacity: fadeAnim }} />

                  <Animated.View style={{
                    transform: [{ rotateZ: rotate }],
                    height: isVisible ? 1 : 2, width: '50%', backgroundColor: 'black', marginTop: '15%', opacity: 1
                  }} />
                  <Animated.View style={{
                    transform: [{ rotateZ: reverseRotate }],
                    height: isVisible ? 1 : 2, width: '50%', backgroundColor: 'black', opacity: 1
                  }} />

                  <Animated.View style={{ height: 2, width: '50%', backgroundColor: 'black', marginTop: '15%', opacity: fadeAnim }} />

                </View>
              </GestureDetector>

            </View>
          </GestureDetector>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
// transform: [{ rotateZ: '45deg' }],

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
