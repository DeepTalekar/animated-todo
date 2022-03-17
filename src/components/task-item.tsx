import React, {useCallback} from 'react';
import { NativeSyntheticEvent, Pressable, TextInputChangeEventData } from 'react-native';
import { PanGestureHandlerProps, TextInput } from 'react-native-gesture-handler';
import { Box, HStack, Text, theme, useTheme, useColorModeValue, themeTools, Icon, Input } from 'native-base';
import AnimatedCheckbox from 'react-native-checkbox-reanimated';

import AnimatedTaskLabel from './animated-task-label';
import SwipeableView from './swipeable-view';
import {Feather} from '@expo/vector-icons';

interface Props extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
    isEditing: boolean,
    isDone: boolean,
    onToggleCheckbox?: () => void,
    onPressLabel?: () => void,
    onRemove?: () => void,
    onChangeSubject?: (subject: string) => void
    onFinishEditing?: () => void,
    subject: string
}

 export default function TaskItem (props: Props) {
   const {
       isEditing,
       isDone,
       onToggleCheckbox,
       onPressLabel,
       onRemove,
       onChangeSubject,
       onFinishEditing,
       subject,
       simultaneousHandlers
    } = props;

    const theme = useTheme();

    const highlightColor = themeTools.getColor(theme, useColorModeValue('blue.500', 'blue.400'));
    const boxStroke = themeTools.getColor(theme, useColorModeValue('muted.300', 'muted.500'));
    const checkmarkColor = themeTools.getColor(theme, useColorModeValue('white', 'white'));
    const activeTextColor = themeTools.getColor(theme, useColorModeValue('darkText', 'lightText'))
    const doneTextColor = themeTools.getColor(theme, useColorModeValue('muted.500', 'muted.600'));

    const handleChangeSubject = useCallback((event: NativeSyntheticEvent<TextInputChangeEventData>) => {
        onChangeSubject && onChangeSubject(event.nativeEvent.text)
    }, [onChangeSubject])

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
                {isEditing ? (
                    <Input 
                        placeholder='Task'
                        value={subject}
                        variant="unstyled"
                        fontSize={19}
                        px={1} py={0}
                        autoFocus
                        blurOnSubmit
                        onChange={handleChangeSubject} 
                        onBlur={onFinishEditing} 
                    />
                ) : (
                    <AnimatedTaskLabel 
                        strikethrough={isDone}
                        textColor={activeTextColor}
                        inactiveTextColor={doneTextColor}
                        onPress={onPressLabel}
                    >
                        {subject}
                    </AnimatedTaskLabel>
                )}
            </HStack>
        </SwipeableView>
    )
}