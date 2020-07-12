import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 30px;
  align-items: center;
`;

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  color: #e5e5e5;
  font-size: 30px;
  text-align: center;
  margin: 30px 20px 0 20px;
`;

export const HomeButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 35px;
  right: 20px;
`;

export const ModalCloseButtom = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const cameraStyle: any = {
  overflow: 'hidden',
  position: 'absolute',
  height: 400,
  width: 400,
};

export const lottieStyle: any = {
  marginBottom: 50,
  marginTop: 20,
  height: 200,
};
