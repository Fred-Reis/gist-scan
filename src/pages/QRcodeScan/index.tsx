import React, { useCallback } from 'react';
import { Text, Button } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { useNavigation } from '@react-navigation/native';

// import { Container } from './styles';

const QRcodeScan: React.FC = () => {
  const navigation = useNavigation();

  const handleScanQRcode = useCallback((e: any) => {
    console.log('QR code scanned!', e);
    // navigation.navigate('GistPage');
  }, []);
  let scanner: any;

  const startScan = () => {
    if (scanner) {
      scanner._setScanning(false);
    }
  };

  return (
    <>
      <QRCodeScanner
        ref={(camera) => (scanner = camera)}
        onRead={handleScanQRcode}
        // reactivate={true}
        // reactivateTimeout={3000}
        showMarker={true}
        markerStyle={{ borderColor: '#e5e5e5' }}
        cameraStyle={{
          overflow: 'hidden',
          position: 'absolute',
          height: 400,
          width: 400,
        }}
        bottomContent={
          <Button title="Reactivate" onPress={() => startScan()} />
        }
        // topContent={
        //   <Text style={{ color: '#e5e5e5', fontSize: 50, marginTop: 10 }}>
        //     Qualquer coisa
        //   </Text>
        // }
        // bottomContent={
        //   <Text style={{ color: '#e5e5e5', fontSize: 40, fontWeight: 'bold' }}>
        //     Point the scanner at qrcode
        //   </Text>
        // }
      />
    </>
  );
};

export default QRcodeScan;
