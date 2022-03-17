import React, {useCallback, useState} from 'react';
import {Text, Box, Center, VStack, themeTools, useTheme, useColorMode, useColorModeValue, KeyboardAvoidingView} from 'native-base';
import { Platform } from 'react-native';

import ThemeToggle from '../components/theme-toggle';
import TaskItem from '../components/task-item';

export default function MainScreen( ) {
    const [checked, setChecked] = useState(false);
    const [subject, setSubject] = useState('Task ITem');
    const [isEditing, setIsEditing] = useState(false);

    const handlePressCheck = useCallback(() => {
        setChecked(!checked); 
    })

    return (
        <Center _dark={{bg: 'blueGray.900'}} _light={{bg: 'blueGray.50'}} px={4} flex={1} >
            <VStack alignItems={"center"} space={5} w="full">
                <TaskItem
                    isEditing={isEditing}
                    isDone={checked}
                    subject={subject}
                    onToggleCheckbox={handlePressCheck}
                    onPressLabel={() => setIsEditing(true)}
                    onChangeSubject={setSubject}
                    onFinishEditing={() => setIsEditing(false)}
                />
                
                <Box p={10} bg={useColorModeValue('red.500', 'yellow.500')}>
                    <Text>
                        Hello
                    </Text>
                </Box>
                <ThemeToggle />
            </VStack>
        </Center>

    )
}