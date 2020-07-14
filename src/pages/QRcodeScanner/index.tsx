import React, { useCallback, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Lottie from 'lottie-react-native';

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

  // function to restart scanner
  const startScan = useCallback(() => {
    if (scanner) {
      scanner._setScanning(false);
    }
  }, []);

  // function to scanner QRCode
  const handleScanQRcode = useCallback(
    async (e: any): Promise<any> => {
      setLoading(true);

      const data = e.data;

      if (!data.indexOf('http')) {
        if (data.indexOf('https')) {
          setModalTitle('Only Gists');
          setModalDescription(`This QRcode don't contain a valid Gist url.`);
          setLoading(false);
          toggleModal();

          return;
        } else if (!data.indexOf('https')) {
          try {
            const newData = data.split('/');

            const gistID = newData[newData.length - 1];

            const response = await api.get(`/${gistID}`);

            navigation.navigate('GistPage', {
              data: response.data,
              id: gistID,
            });
            setLoading(false);
          } catch (err) {
            setModalTitle('Sorry, something went wrong,');
            setModalDescription(err.message);
            setLoading(false);
            toggleModal();
            return;
          }

          setLoading(false);

          return;
        }
      }

      try {
        console.log(data);
        const response = await api.get(`/${data}`);

        navigation.navigate('GistPage', {
          data: response.data,
          id: data,
        });
        setLoading(false);
      } catch (err) {
        setModalTitle('Sorry, something went wrong,');
        setModalDescription(err.message);
        setLoading(false);
        toggleModal();
        return;
      }

      setLoading(false);
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
