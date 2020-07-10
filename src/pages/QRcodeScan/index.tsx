import React, { useCallback, useState } from 'react';
import { Button, Text, Image, ActivityIndicator, View } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Lottie from 'lottie-react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Container, Title, HomeButton } from './styles';

import icon from '../../assets/icon.png';
import qrcodeImg from '../../assets/qr-code-scan.json';

const QRcodeScan: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const navigation = useNavigation();
  let scanner: any;

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);

      return () => setIsFocused(false);
    }, []),
  );

  const handleScanQRcode = useCallback(
    (e: any): void => {
      navigation.navigate('GistPage', { data: e.data });
    },
    [navigation],
  );

  return (
    <Container>
      {isFocused ? (
        <>
          <QRCodeScanner
            ref={(camera) => (scanner = camera)}
            onRead={handleScanQRcode}
            showMarker={true}
            markerStyle={{ borderColor: '#e5e5e5' }}
            cameraStyle={{
              overflow: 'hidden',
              position: 'absolute',
              height: 400,
              width: 400,
            }}
            bottomContent={<Title>Point the scanner at qrcode</Title>}
          />

          <Lottie
            source={qrcodeImg}
            resizeMode="contain"
            autoPlay
            loop
            style={{ marginBottom: 50, marginTop: 20, height: 200 }}
          />

          <HomeButton onPress={() => navigation.navigate('Home')}>
            <Icon name="home-circle" color="#e5e5e5" size={40} />
          </HomeButton>
        </>
      ) : (
        <View />
      )}
    </Container>
  );
};

export default QRcodeScan;
