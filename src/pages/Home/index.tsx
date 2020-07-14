import React, { useCallback } from 'react';
import { Text } from 'react-native';
import Lottie from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import lightGit from '../../assets/lightGit.json';

import { Container, Title, Info, OpenButton, styles } from './styles';

const Home: React.FC = () => {
  const navigation = useNavigation();

  const openQRcodeScanner = useCallback(() => {
    navigation.navigate('QRcodeScanner');
  }, []);

  return (
    <Container>
      <Title>Gist Scan</Title>
      <Lottie
        source={lightGit}
        resizeMode="contain"
        autoPlay
        loop
        style={{ marginBottom: 100, marginHorizontal: 20 }}
      />
      <Info>
        Press the button to open
        <Text style={{ color: '#f15a24' }}> QRcode Scanner</Text>
      </Info>

      <OpenButton
        testID="open-qrcode-test"
        onPress={openQRcodeScanner}
        style={styles.shadow}
      >
        <Icon name="qrcode-scan" size={40} color="#e5e5e5" />
      </OpenButton>
    </Container>
  );
};

export default Home;
