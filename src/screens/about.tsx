import React from 'react';
import { Box, ScrollView, Text, VStack, useColorModeValue, Icon, Image } from 'native-base';
import { Feather, Ionicons } from '@expo/vector-icons';

import AnimatedColorBox from '../components/animated-color-box';
import NavBar from '../components/navbar';
import Masthead from '../components/masthead';
import LinkButton from '../components/link-button';

const AboutScreen = () => {
    return (
        <AnimatedColorBox 
            flex={1}
            bg={useColorModeValue('warmGray.50', 'warmGray.900')}
            w="full"
        >
            <Masthead 
                title="About this app"
                image={require("../../assets/about-masthead.png")}
            >
                <NavBar />
            </Masthead>
            <ScrollView 
                borderTopLeftRadius={"20px"}
                borderTopRightRadius={"20px"}
                bg={useColorModeValue('warmGray.50', 'warmGray.900')}
                mt="-20px"
                pt="30px"
                p={4}
                // borderWidth={1}
                borderColor={'blue.200'}
            >
                <VStack flex={1} space={4}>
                    <Box alignItems="center">
                        <Image 
                            source={require("../../assets/author.jpg")} 
                            borderRadius="full"
                            resizeMode='cover'
                            w={120}
                            h={120}
                            alt="author"
                        />
                    </Box>
                    <Text textAlign={"center"} alignItems="center" fontSize={"md"} w="full">Made with ❤ in React Native <Icon as={Ionicons} name="logo-react" size="sm" color={"#61dafb"} /></Text>
                    <LinkButton 
                        colorScheme={useColorModeValue('coolGray', 'light')} 
                        href='https://github.com/DeepTalekar' 
                        size='lg' 
                        borderRadius="full" 
                        leftIcon={<Icon as={Feather} name="github" size="sm" opacity={0.5} />}
                    >
                        @DeepTalekar
                    </LinkButton>
                    <LinkButton 
                        colorScheme={useColorModeValue('blue', 'darkBlue')} 
                        href='https://www.linkedin.com/in/deep-talekar/' 
                        size='lg' 
                        borderRadius="full" 
                        leftIcon={<Icon as={Feather} name="linkedin" size="sm" opacity={0.5} />}
                    >
                        @deep-talekar
                    </LinkButton>
                </VStack>                
            </ScrollView>
        </AnimatedColorBox>

    )
};

export default AboutScreen;