import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  padding: 30px 20px;
`;

export const Title = styled.Text`
  color: #e5e5e5;
  font-size: 16px;
  margin: 5px;
`;

export const CommentContainer = styled.View`
  background-color: #e5e5e5;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  flex-direction: row;
  align-items: center;
  border: 2px rgba(229, 229, 229, 0.4);
`;

export const Avatar = styled.Image`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  border: 2px rgba(0, 0, 0, 0.2);
`;

export const TextContainer = styled.View`
  margin-left: 20px;
  flex: 1;
`;

export const NameText = styled.Text`
  margin-bottom: 3px;
  font-size: 16px;
  color: #f15a24;
  font-weight: bold;
`;

export const CommentText = styled.Text`
  margin-bottom: 5px;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.5);
`;

export const Input = styled.TextInput`
  background-color: #e5e5e5;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 20px;
  border: 2px rgba(229, 229, 229, 0.4);
`;

export const SubmitButton = styled.TouchableOpacity`
  margin-right: 50px;
  padding: 12px;
  background-color: #f15a24;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

export const TextButton = styled.Text`
  color: #e5e5e5;
  font-size: 18px;
  font-weight: bold;
`;

export const HomeButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 32px;
  right: 20px;
`;

export const customStyles = {
  maxHeight: 250,
  borderRadius: 10,
  borderWidth: 2,
  borderColor: 'rgba(229, 229, 229, 0.4)',
};
