import styled from 'styled-components/native';

export const TextContainer = styled.View`
  margin-left: 30px;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #f15a24;
`;
export const ModalDescription = styled.Text`
  font-size: 18px;
  line-height: 22px;
`;

export const modalStyle: any = {
  backgroundColor: '#e5e5e5',
  borderRadius: 10,
  padding: 20,
  paddingLeft: 30,
  paddingRight: 50,

  position: 'absolute',
  top: '30%',
  left: 0,
  right: 0,
  alignItems: 'center',
  borderColor: '#f15a24',
  borderWidth: 3,
  flexDirection: 'row',
};
