import React, {useEffect, useState} from 'react';
import {Box, Button, Flex, Spinner, Text} from 'native-base';
import {ScrollView} from 'react-native';
import axios from 'axios';
import {Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Gallery = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [spinnerId, setSpinnerId] = useState(null);

  const navigation = useNavigation();

  const displayCard = item => {
    setSpinnerId(item.id);
    setTimeout(() => {
      navigation.navigate('Home', {card: item});
      setSpinnerId(null);
    }, 2000);
  };

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/photos')
      .then(res => {
        console.log('API response:', res.data);
        setData(res.data.slice(0, 20));
        setLoading(false);
      })
      .catch(err => {
        console.log('Error found: ', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box flex={1} justifyContent="center" alignItems="center">
        <Spinner color="gray.900" size="lg" />
        <Text color="black" mt={2}>
          Loading...
        </Text>
      </Box>
    );
  }

  return (
    <ScrollView contentContainerStyle={{paddingBottom: 200}}>
      <Box>
        <Box>
          <Flex
            direction="row"
            wrap="wrap"
            justifyContent="space-between"
            px={4}
            mt={10}>
            {data.map(item => (
              <Box
                key={item.id}
                width="49%"
                maxHeight={56}
                border
                borderColor={'gray.200'}
                shadow={9}
                borderWidth={0.5}
                bg="gray.100"
                p={3}
                mb={2}
                borderRadius="sm">
                <Flex
                  direction="column"
                  justifyContent="space-between"
                  height="100%">
                  <Box>
                    <Text fontWeight="bold">
                      <Text color="green.700">UserID:</Text> {item.id}
                    </Text>
                    <Text mt={2} fontWeight="bold">
                      <Text color="green.700">Title:</Text> {item.title}
                    </Text>
                  </Box>

                  <Button mt={2} onPress={() => displayCard(item)} isLoading={spinnerId == item.id}>
                    Display
                  </Button>
                </Flex>
              </Box>
            ))}
          </Flex>
        </Box>
      </Box>
    </ScrollView>
  );
};

export default Gallery;
