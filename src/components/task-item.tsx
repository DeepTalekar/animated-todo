import React, {useCallback} from 'react';
import { Pressable } from 'react-native';
import { PanGestureHandlerProps } from 'react-native-gesture-handler';
import { Box, HStack, Text, theme, useTheme, useColorModeValue, themeTools, Icon } from 'native-base';
import AnimatedCheckbox from 'react-native-checkbox-reanimated';

import AnimatedTaskLabel from './animated-task-label';
import SwipeableView from './swipeable-view';
import {Feather} from '@expo/vector-icons';

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    isDone: boolean,
    onToggleCheckbox?: () => void,
    onPressLabel?: () => void,
    onRemove?: () => void,
    subject: string
}

 export default function TaskItem (props: Props) {
   const { isDone, onToggleCheckbox, onPressLabel, onRemove, subject, simultaneousHandlers } = props;

    const theme = useTheme();

    const highlightColor = themeTools.getColor(theme, useColorModeValue('blue.500', 'blue.400'));
    const boxStroke = themeTools.getColor(theme, useColorModeValue('muted.300', 'muted.500'));
    const checkmarkColor = themeTools.getColor(theme, useColorModeValue('white', 'white'));
    const activeTextColor = themeTools.getColor(theme, useColorModeValue('darkText', 'lightText'))
    const doneTextColor = themeTools.getColor(theme, useColorModeValue('muted.500', 'muted.600'));

    return (
        <SwipeableView 
            simultaneousHandlers={simultaneousHandlers} 
            onSwipeLeft={onRemove} 
            backView={
                <Box w="full" h="full" bg="red.500" alignItems="flex-end" justifyContent={'center'} pr={4}>
                    <Icon color="white" as={<Feather name="trash-2"/>} />
                </Box>
            }
        >
            <HStack alignItems={'center'} w='full' px={4} py={2} bg={useColorModeValue('warmGray.50', 'primary.900')}>
                <Box width={30} height={30} mr={2}>
                    <Pressable onPress={onToggleCheckbox}>
                        <AnimatedCheckbox
                            highlightColor={highlightColor} 
                            boxOutlineColor={boxStroke} 
                            checkmarkColor={checkmarkColor} 
                            checked={isDone} 
                        />
                    </Pressable>
                </Box>
                <AnimatedTaskLabel 
                    strikethrough={isDone}
                    textColor={activeTextColor}
                    inactiveTextColor={doneTextColor}
                >
                    {subject}
                </AnimatedTaskLabel>
            </HStack>
        </SwipeableView>
    )
}