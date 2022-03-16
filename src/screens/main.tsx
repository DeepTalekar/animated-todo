import React, {useCallback, useState} from 'react';
import {Text, Box, Center, VStack, themeTools, useTheme, useColorMode, useColorModeValue} from 'native-base';

import ThemeToggle from '../components/theme-toggle';
import TaskItem from '../components/task-item';

export default function MainScreen( ) {
    const [checked, setChecked] = useState(false);

    const handlePressCheck = useCallback(() => {
        setChecked(!checked); 
    })

    return (
        <Center _dark={{bg: 'blueGray.900'}} _light={{bg: 'blueGray.50'}} px={4} flex={1} >
            <VStack alignItems={"center"} space={5} w="full">
                <TaskItem onToggleCheckbox={handlePressCheck} isDone={checked} subject={'Task ITEM'}  />
                
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