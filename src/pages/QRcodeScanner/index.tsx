import React, { useCallback, useState } from 'react';
import { ActivityIndicator, View, processColor } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Lottie from 'lottie-react-native';

import { config } from '../../utils/config';
import { authorize } from 'react-native-app-auth';
import axios from 'axios';

import CustomModal from '../../components/Modal';

import api from '../../services/api';

import {
  Container,
  Title,
  HomeButton,
  LoadingContainer,
  ModalCloseButtom,
  cameraStyle,
  lottieStyle,
} from './styles';

import qrcodeImg from '../../assets/qr-code-scan.json';

const QRcodeScan: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalDescription, setModalDescription] = useState<string>('');

  const navigation = useNavigation();

  let scanner: any;

  useFocusEffect(
    useCallback(() => {
      setIsFocused(true);

      return () => setIsFocused(false);
    }, []),
  );

  const startScan = useCallback(() => {
    if (scanner) {
      scanner._setScanning(false);
    }
  }, []);

  const handleScanQRcode = useCallback(
    async (e: any): Promise<any> => {
      setLoading(true);

      const authState = await authorize(config);

      axios.defaults.headers.common['Authorization'] = authState.accessToken;

      console.log('auth completo', authState);

      console.log('auth direto', authState.accessToken);

      console.log(
        'auth no axios',
        axios.defaults.headers.common['Authorization'],
      );

      // const response = await fetch('https://github.com/login/oauth/authorize');

      // console.log(response.json());

      // const newData = data.split('/');

      // const gistID = newData[newData.length - 1];
      // console.log('aqui no id', gistID);

      // const response = await api.get(`/${gistID}`);

      // setLoading(false);

      // console.log(response.data);

      // return;

      // if (data.indexOf('http')) {
      //   if (data.indexOf('https') !== 1) {
      //     setModalTitle('Only Gists');
      //     setModalDescription(`This QRcode don't contain a valid Gist url.`);
      //     setLoading(false);
      //     toggleModal();
      //     startScan(); // não funfou
      //     return;
      //   } else if (data.indexOf('https')) {
      //     const newData = data.split('/');

      //     const gistID = newData[newData.length - 1];
      //     console.log('aqui no id', gistID);

      //     // const response = await api.get(`/${gistID}`);
      //     setLoading(false);

      //     // console.log(response.data);

      //     return;
      //   }
      // }

      setLoading(false);

      // navigation.navigate('GistPage', { data: e.data });
    },
    [navigation],
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Container>
      <>
        {loading ? (
          <LoadingContainer>
            <ActivityIndicator size={80} color="#f15a24" />
          </LoadingContainer>
        ) : (
          <>
            {isFocused ? (
              <>
                <QRCodeScanner
                  ref={(camera) => (scanner = camera)}
                  onRead={handleScanQRcode}
                  showMarker={true}
                  markerStyle={{ borderColor: '#e5e5e5' }}
                  cameraStyle={cameraStyle}
                  bottomContent={<Title>Point the scanner at qrcode</Title>}
                />

                <Lottie
                  source={qrcodeImg}
                  resizeMode="contain"
                  autoPlay
                  loop
                  style={lottieStyle}
                />

                <CustomModal
                  isModalVisible={isModalVisible}
                  modalTitle={modalTitle}
                  modalDescription={modalDescription}
                >
                  <ModalCloseButtom onPress={toggleModal}>
                    <Icon name="close-box" size={30} color="#f15a24" />
                  </ModalCloseButtom>
                </CustomModal>

                <HomeButton onPress={() => navigation.navigate('Home')}>
                  <Icon name="home-circle" color="#e5e5e5" size={50} />
                </HomeButton>
              </>
            ) : (
              <View />
            )}
          </>
        )}
      </>
    </Container>
  );
};

export default QRcodeScan;
