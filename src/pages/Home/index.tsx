import React from 'react';
import { Text } from 'react-native';
import Lottie from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import lightGit from '../../assets/lightGit.json';

import { Container, Title, Info, OpenButton, styles } from './styles';

const Home: React.FC = () => {
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
        Press the button bellow to open{' '}
        <Text style={{ color: '#f15a24' }}> QRcode Scan</Text>
      </Info>

      <OpenButton style={styles.shadow}>
        <Icon name="qrcode-scan" size={40} color="#fff" />
      </OpenButton>
    </Container>
  );
};

export default Home;
