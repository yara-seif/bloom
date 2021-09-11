import React from 'react';
import {
  Box,
  Center,
  Img,
  Heading,
  Text,
  VStack,
  Flex,
  Spacer,
  Button,
} from '@chakra-ui/react';

const About = () => {
  return (
    <Box bgColor="gray.100" h="1000px">
      <Text
        p={{ base: '10px', md: '30px' }}
        fontSize={{ base: 'sm', md: '2xl' }}
        fontFamily="serif"
      >
        Welcome to Memories! For the programming assignment, we decided to
        create a mobile-adaptive website that allows one to capture and preserve
        precious moments in his/her life through digital memory cards. It
        provides a private platform for uploading, organizing, and describing
        pictures without needing to post on a social media site.
      </Text>
      <Text
        pl={{ base: '10px', md: '30px' }}
        pr={{ base: '10px', md: '30px' }}
        fontSize={{ base: 'sm', md: '2xl' }}
        fontFamily="serif"
      >
        Using this website is simple! All you have to do is click the "Upload a
        Memory" button and fill out the form with details regarding your memory.
        Once complete, hit "Save" and a memory card will pop up on the home
        page. If you would like to remove a card, simply click "Delete Memory".
      </Text>

      <Text
        pl={{ base: '10px', md: '30px' }}
        pr={{ base: '10px', md: '30px' }}
        mt={{ base: '10px', md: '30px' }}
        fontSize={{ base: 'sm', md: '2xl' }}
        fontFamily="serif"
      >
        We hope you enjoy the site!
      </Text>
      <Text
        pl={{ base: '10px', md: '30px' }}
        pr={{ base: '10px', md: '30px' }}
        fontSize={{ base: 'sm', md: '2xl' }}
        fontFamily="serif"
      >
        Developers: Yara Seif and Varshita Patakottu
      </Text>
      <Text></Text>
    </Box>
  );
};

export default About;
