import React, {useCallback} from 'react';
import { Avatar, Box, Center, Heading, IconButton, useColorModeValue, HStack, VStack } from 'native-base';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';

import AnimatedColorBox from './animated-color-box';
import ThemeToggle from './theme-toggle';
import MenuButton from './MenuButton';

const SideBar = (props: DrawerContentComponentProps) => {
    const {state, navigation } = props;

    const currentRoute = state.routeNames[state.index];

    const handlePressBackButton = useCallback(() => {
        navigation.closeDrawer();
    }, [navigation]);

    const handlePressMenuMain = useCallback(() => {
        navigation.navigate('Main');
    }, [navigation]);
    
    const handlePressMenuAbout = useCallback(() => {
        navigation.navigate('About');
    }, [navigation])

    return (
        <AnimatedColorBox 
            safeArea
            flex={1}
            bg={useColorModeValue('blue.50', 'darkBlue.800')}
            p={7}
        >
            <VStack space={2} flex={1}>
                <HStack justifyContent="flex-end">
                    <IconButton 
                        onPress={handlePressBackButton} 
                        variant='outline'
                        borderRadius={100}
                        borderColor={useColorModeValue('blue.300', 'darkBlue.700')}    
                        _icon={{
                            as: Feather,
                            name: 'chevron-left',
                            color: useColorModeValue('blue.800', 'darkBlue.700'),
                            size: 6,
                        }}
                    />
                </HStack>
                <Avatar 
                    source={require("../../assets/profile-image.png")} 
                    size='xl'
                    borderRadius={100}
                    mb={6}
                    borderColor={"secondary.500"}
                    borderWidth={3}
                /> 
                <Heading mb={4} size="xl"> 
                    Deep Talekar
                </Heading>
                <MenuButton 
                    active={currentRoute === 'Main'}
                    onPress={handlePressMenuMain}
                    icon="inbox"
                >
                    Tasks
                </MenuButton>
                <MenuButton 
                    active={currentRoute === 'About'}
                    onPress={handlePressMenuAbout}
                    icon="info"
                >
                    About
                </MenuButton>
            </VStack>
            <Center>
                <ThemeToggle />
            </Center>
        </AnimatedColorBox>
    );
}

export default SideBar;