import React, {memo, useEffect, useState} from 'react';
import { Pressable } from 'react-native';
import {Text, Box, HStack} from 'native-base';
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming, withSequence, withDelay, interpolateColor,  } from 'react-native-reanimated';

interface Props {
    strikethrough: boolean,
    textColor: string,
    inactiveTextColor: string,
    onPress?: () => void,
    children?: React.ReactNode, 
};

const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedHStack = Animated.createAnimatedComponent(HStack);
const AnimatedText = Animated.createAnimatedComponent(Text);


const AnimatedTaskLabel = memo((props: Props) => {
    const {strikethrough, inactiveTextColor, textColor, onPress, children} = props;
    
    const hstackOffset = useSharedValue(0);
    const hstackOffsetStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: hstackOffset.value
            }]
        }
    }, [strikethrough]);

    const textColorProgress = useSharedValue(0);
    const textColorProgressStyle = useAnimatedStyle(() => ({
        color: interpolateColor(textColorProgress.value, [0, 1], [textColor, inactiveTextColor]),
    }), [strikethrough, textColor, inactiveTextColor])

    useEffect(() => {
        const easing = Easing.out(Easing.quad);
        if(strikethrough) {
            hstackOffset.value = withSequence(
                withTiming(4, {duration: 200, easing}),
                withTiming(0, {duration: 200, easing})
            );

            strikethroughWidth.value = withTiming(1, {duration: 400, easing});

            textColorProgress.value = withDelay(
                1000,
                withTiming(1, {duration: 400, easing})
            );
        } else {
            strikethroughWidth.value = withTiming(0, {duration: 400, easing});
            textColorProgress.value = withTiming(0, {duration: 400, easing});
        }
    });

    const strikethroughWidth = useSharedValue(0);
    const  strikethroughAnimatedStyle = useAnimatedStyle(() => ({
        width: `${strikethroughWidth.value * 100}%`,
        borderBottomColor: interpolateColor(
            textColorProgress.value,
            [0, 1],
            [textColor, inactiveTextColor]
        )
    }), [strikethrough, textColor, inactiveTextColor]);

    return (
        <Pressable onPress={onPress}>
            <AnimatedHStack alignItems={'center'} style={[hstackOffsetStyle]}>
                <AnimatedText noOfLines={1} ellipsizeMode='tail' style={[textColorProgressStyle, {paddingHorizontal: 1, fontSize: 19}]}>
                    {children}
                </AnimatedText>
                <AnimatedBox position={'absolute'} h={1} borderBottomWidth={1} style={[strikethroughAnimatedStyle]} />
            </AnimatedHStack>
        </Pressable>
    )
});

export default AnimatedTaskLabel;