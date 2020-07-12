import React from 'react';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  modalStyle,
  ModalTitle,
  ModalDescription,
  TextContainer,
} from './styles';

interface ModalPropsDTO {
  isModalVisible: boolean;
  modalTitle: string;
  modalDescription: string;
  children: any;
}

function CustomModal({
  isModalVisible,
  modalTitle,
  modalDescription,
  children,
}: ModalPropsDTO) {
  return (
    <Modal
      isVisible={isModalVisible}
      animationIn="bounceIn"
      animationOut="bounceOut"
      animationInTiming={800}
      animationOutTiming={300}
      style={modalStyle}
    >
      <Icon name="warning" size={30} color="#f15a24" />
      <TextContainer>
        <ModalTitle>{modalTitle}</ModalTitle>
        <ModalDescription>{modalDescription}</ModalDescription>
      </TextContainer>
      {children}
    </Modal>
  );
}

export default CustomModal;
