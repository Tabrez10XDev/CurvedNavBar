import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, Text, View, Animated, TouchableOpacity, Dimensions, Pressable } from 'react-native';
import { useRef, useState, useEffect, useCallback, lazy } from 'react';
import Background from "./assets/background.svg"
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { PanResponder } from 'react-native';


export default function CurvedAppBar({
    fabIconTint,
    fabBackgroundTint,
    itemBackgroundTints,
    activeColor,
    icons,
    triggers
}) {

    const [xy, setXY] = useState({ x: 0, y: 0 })
    const [layout, setLayout] = useState({ height: 0, width: 0 })
    const [layout2, setLayout2] = useState({ height: 0, width: 0 })
    const [layout3, setLayout3] = useState({ height: 0, width: 0 })

    const fadeAnim = useRef(new Animated.Value(1)).current;
    const fadeAnimModal = useRef(new Animated.Value(0)).current;

    const [isVisible, setIsVisible] = useState(true)

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (evt, gestureState) => {
                setXY({ x: gestureState.dx, y: gestureState.dy })
            },
            onPanResponderRelease: (evt, gestureState) => {
            },
        }),
    ).current;


    const fadeIn = () => {
        setXY({ x: 0, y: 0 })
        setIsVisible(true)
        fadeOutModal()
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const fadeOut = () => {
        setIsVisible(false)
        fadeInModal()
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };


    const fadeInModal = () => {
        setIsVisible(false)
        Animated.timing(fadeAnimModal, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const gesture = Gesture.Pan()

    gesture.onEnd(() => {
        console.log("ended");
    })

    gesture.onTouchesCancelled(() => {
        if (isInsideSquare(xy.x, xy.y, layout)) {
            triggers[0]()
        }
        else if (isInsideSquare(xy.x, xy.y, layout2)) {
            triggers[1]()
        }
        else if (isInsideSquare(xy.x, xy.y, layout3)) {
            triggers[2]()
        }
        fadeIn()
    })






    const fabGesture = Gesture.LongPress()


    fabGesture.onTouchesDown(() => {
        if(fadeAnim._value) fadeOut()
        else fadeIn()
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
        <GestureHandlerRootView style={{ position: 'absolute', bottom: 0, right: 0 }}>
            <View
                {...panResponder.panHandlers}
                style={{ width: Dimensions.get('window').width * 0.6, position: 'absolute', bottom: 30, right: 30, height: Dimensions.get('window').width * 0.65 }}>
                <GestureDetector gesture={gesture} style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <View style={{ width: '100%', height: '100%', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                        <Animated.View style={{ height: '100%', width: '100%', borderRadius: 16, opacity: fadeAnimModal, position: 'relative', transform: [{ scale: scale }, { translateX: position }, { translateY: position }] }}>
                            <Background width="100%" />
                            <Pressable
                                onPress={() => {
                                    fadeIn()
                                    triggers[0]()
                                }}
                                onLayout={(event) => {
                                    setLayout({ height: event.nativeEvent.layout.y, width: event.nativeEvent.layout.x })
                                }}
                                style={[styles.item, { backgroundColor: isInsideSquare(xy.x, xy.y, layout) ? activeColor : itemBackgroundTints[0], left: '25%', bottom: '10%', }]}>
                                {icons[0]}
                            </Pressable>

                            <Pressable
                                onPress={() => {
                                    fadeIn()
                                    triggers[1]()
                                }}
                                onLayout={(event) => {
                                    setLayout2({ height: event.nativeEvent.layout.y, width: event.nativeEvent.layout.x })
                                }}
                                style={[styles.item, { backgroundColor: isInsideSquare(xy.x, xy.y, layout2) ? activeColor : itemBackgroundTints[1], left: '45%', bottom: '40%' }]}>
                                {icons[1]}
                            </Pressable>
                            <Pressable
                                onPress={() => {
                                    fadeIn()
                                    triggers[2]()
                                }} onLayout={(event) => {
                                    setLayout3({ height: event.nativeEvent.layout.y, width: event.nativeEvent.layout.x })
                                }}
                                style={[styles.item, { backgroundColor: isInsideSquare(xy.x, xy.y, layout3) ? activeColor : itemBackgroundTints[2], left: '70%', bottom: '60%' }]}>
                                {icons[2]}
                            </Pressable>
                        </Animated.View>

                        <GestureDetector
                            gesture={fabGesture}>
                            <View
                                style={[styles.fab, { backgroundColor: fabBackgroundTint }]}>
                                <Animated.View style={{ height: 2, width: '50%', backgroundColor: fabIconTint, opacity: fadeAnim }} />

                                <Animated.View style={{
                                    transform: [{ rotateZ: rotate }],
                                    height: isVisible ? 1 : 2, width: '50%', backgroundColor: fabIconTint, marginTop: '15%', opacity: 1
                                }} />
                                <Animated.View style={{
                                    transform: [{ rotateZ: reverseRotate }],
                                    height: isVisible ? 1 : 2, width: '50%', backgroundColor: fabIconTint, opacity: 1
                                }} />
                                <Animated.View style={{ height: 2, width: '50%', backgroundColor: fabIconTint, marginTop: '15%', opacity: fadeAnim }} />

                            </View>
                        </GestureDetector>

                    </View>
                </GestureDetector>
            </View>
        </GestureHandlerRootView>
    );
}


const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
    },
    item: {
        width: 45,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 45,
        position: 'absolute',
    },
    fab: {
        width: 50,
        height: 50,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 0,
        bottom: 0
    }
});
