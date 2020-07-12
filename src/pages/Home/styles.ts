import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;

export const Title = styled.Text`
  color: #e5e5e5;
  font-size: 35px;
  font-weight: bold;
  margin-top: -75px;
`;

export const Info = styled.Text`
  color: #e5e5e5;
  font-size: 30px;
  font-weight: bold;
  bottom: 70px;
  margin-top: 470px;
  text-align: center;
  line-height: 50px;
`;

export const OpenButton = styled.TouchableOpacity`
  position: absolute;
  height: 80px;
  width: 80px;
  border-radius: 10px;
  background-color: #f15a24;
  bottom: 50px;
  align-items: center;
  justify-content: center;
`;

export const styles = StyleSheet.create({
  shadow: {
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    shadowColor: '#f15a24',
  },
});
