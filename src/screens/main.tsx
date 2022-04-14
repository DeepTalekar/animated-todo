import React, {useCallback, useState} from 'react';
import {Text, Box, Center, VStack, themeTools, useTheme, useColorMode, useColorModeValue, Fab, Icon} from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import shortid from 'shortid';

import ThemeToggle from '../components/theme-toggle';
import TaskList from '../components/task-list';
import AnimatedColorBox from './../components/animated-color-box';
import Masthead from './../components/masthead';
import NavBar from './../components/navbar';

const initialData = [
    {
        id: shortid.generate(),
        subject: "WT Mini Project",
        done: false,
    },
    {
        id: shortid.generate(),
        subject: "Practice CP",
        done: false,
    },
];

export default function MainScreen( ) {
    const [data, setData] = useState(initialData);
    const [editingItemId, setEditingItemId] = useState<string | null>(null);

    const handleToggleTaskItem = useCallback((item) => {
        setData(prevData => {
            const newData = [...prevData];
            const index = prevData.indexOf(item);
            newData[index] = {
                ...item,
                done: !item.done,
            }

            return newData;
        }) 
    }, [])

    const handleChangeTaskItemSubject = useCallback((item, newSubject) => {
        setData(prevData => {
            const newData = [...prevData];
            const index = prevData.indexOf(item);
            newData[index] = {
                ...item,
                subject: newSubject,
            }

            return newData;
        })
    }, [])

    const handleFinishEditingTaskItem = useCallback((item) => {
        setEditingItemId(null);
    }, [])

    const handlePressTaskItemLabel = useCallback((item) => {
        setEditingItemId(item.id);
    }, [])

    const handleRemoveItem = useCallback((item) => {
        setData(prevData => {
            const newData = prevData.filter(i => i !== item)

            return newData;
        })
    }, [])

    return (
        <AnimatedColorBox bg={useColorModeValue('warmGray.50', 'primary.900')} w="full"  flex={1} >
            <Masthead title="Whats up, Deep!" image={require('../../assets/masthead.png')}>
                <NavBar />
            </Masthead>
            <VStack 
                // alignItems={"center"}
                space={1}
                flex={1}
                // borderWidth={1}
                // borderColor={'black'}
                // w="full"
                mt="-20px"
                bg={useColorModeValue('warmGray.50', 'primary.900')}
                borderTopLeftRadius="20px"
                borderTopRightRadius="20px" 
                pt="20px">
                <TaskList 
                    data={data}
                    onToggleItem={handleToggleTaskItem}
                    onChangeSubject={handleChangeTaskItemSubject}
                    onFinishEditing={handleFinishEditingTaskItem}
                    onPressLabel={handlePressTaskItemLabel}
                    onRemoveItem={handleRemoveItem}
                    editingItemId={editingItemId}
                />
            </VStack>
            <Fab
                position={'absolute'}
                renderInPortal={false}
                size={'sm'}
                icon={<Icon color="white" size={'sm'} as={<AntDesign name="plus" />} />}
                colorScheme={useColorModeValue('blue', 'darkBlue')}
                bg={useColorModeValue('blue.500', 'blue.400')}
                onPress={() => {
                    const id = shortid.generate();
                    setData([
                        {
                            id,
                            subject: '',
                            done: false,
                        },
                        ...data,
                    ])
                    setEditingItemId(id);
                }}
            />
        </AnimatedColorBox>

    )
}