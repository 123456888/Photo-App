import React from 'react';
import {Box, Text} from 'native-base';
import {useRoute} from '@react-navigation/native';

const Home = () => {
  const route = useRoute();
  const card = route.params?.card;

  return (
    <Box flex={1} justifyContent={'center'} alignItems={'center'}>
      {card ? (
        <Box height={300} width={250} borderColor={"gray.100"} borderRadius={"sm"} borderWidth={0.5} shadow={3} p={3}>
            <Text color="green.600" fontWeight="bold" fontSize={18}>
              ID: {card.id}
            </Text>
            <Text color="black" mt={2} fontWeight="bold">
              <Text color={"green.600"}>Title: </Text> {card.title}
            </Text>
        </Box>
      ) : (
        <Box flex={1} justifyContent={'center'} alignItems={'center'}>
          <Text color={'green.600'} fontWeight={'bold'} fontSize={18}>
            Choose any Card from Gallery
          </Text>
        </Box>
      )}
    </Box>
  );
};

export default Home;
