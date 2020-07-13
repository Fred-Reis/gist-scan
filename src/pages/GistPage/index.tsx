import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, ActivityIndicator, Keyboard } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { github } from 'react-syntax-highlighter/styles/hljs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { config } from '../../utils/config';
import { authorize } from 'react-native-app-auth';
import axios from 'axios';

import api from '../../services/api';

import {
  Container,
  LoadingContainer,
  Title,
  customStyles,
  CommentContainer,
  Avatar,
  TextContainer,
  NameText,
  CommentText,
  Input,
  SubmitButton,
  TextButton,
  HomeButton,
  NoCommentsContainer,
  NoCommentText,
  ModalCloseButtom,
} from './styles';

import CustomModal from '../../components/Modal';

interface RouteParams {
  data: any;
  id: string;
}

const GistPage: React.FC = ({ route, navigation }: any) => {
  const [commentLoading, setCommentLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>([]);
  const [comment, setComment] = useState<string>('');

  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalDescription, setModalDescription] = useState<string>('');

  const { data, id }: RouteParams = route.params;

  let content = '';

  const fileNames = Object.keys(data.files);
  for (let i = 0; i < fileNames.length; i++) {
    var fileName = fileNames[i];
    content = data.files[fileName].content;
  }

  useEffect(() => {
    setLoading(true);
    const loadComments = async () => {
      if (data.comments > 0) {
        const response = await api.get(`/${id}/comments`);

        setComments(response.data);
      }
      setLoading(false);
    };
    loadComments();
  }, []);

  const getComment = useCallback((e: string) => {
    setComment(e);
  }, []);

  const submitComment = useCallback(
    async (comment) => {
      setCommentLoading(true);
      if (!!!axios.defaults.headers.common['Authorization']) {
        const authState = await authorize(config);

        axios.defaults.headers.common['Authorization'] = authState.accessToken;
      }

      console.log(axios.defaults.headers.common['Authorization']);

      try {
        Keyboard.dismiss();
        const response = await api.post(
          `/${id}/comments`,
          {
            body: comment,
          },
          {
            headers: {
              Authorization: `Bearer ${axios.defaults.headers.common['Authorization']}`,
            },
          },
        );

        setComments((state) => [...state, response.data]);
        setComment('');

        setModalTitle('Very good');
        setModalDescription(
          'Your comment has been added, scroll down to see it',
        );

        setCommentLoading(false);
        toggleModal();
      } catch (err) {
        setModalTitle('Sorry, something went wrong,');
        setModalDescription(err.message);

        setCommentLoading(false);
        toggleModal();
      }
    },
    [api],
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <Container>
      {loading ? (
        <LoadingContainer>
          <ActivityIndicator size={80} color="#f15a24" />
        </LoadingContainer>
      ) : (
        <>
          <Title>Gist Content</Title>
          <SyntaxHighlighter
            customStyle={customStyles}
            fontSize={14}
            language="typescript"
            style={github}
          >
            {content}
          </SyntaxHighlighter>

          <Title>Comments</Title>

          {comments.length > 0 ? (
            <FlatList
              style={{ maxHeight: 300 }}
              data={comments}
              keyExtractor={(comment) => String(comment.id)}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }: any) => (
                <CommentContainer>
                  <Avatar source={{ uri: item.user?.avatar_url }} />

                  <TextContainer>
                    <NameText>{item.user?.login}</NameText>
                    <CommentText>{item.body}</CommentText>
                  </TextContainer>
                </CommentContainer>
              )}
            />
          ) : (
            <NoCommentsContainer>
              <NoCommentText>
                Nobody commented on this gist yet, be the first.
              </NoCommentText>

              <Icon name="delete-empty-outline" size={100} color={'#e5e5e5'} />
            </NoCommentsContainer>
          )}

          <Title>Create new Comment</Title>
          <Input
            placeholder="Write a comment"
            value={comment}
            onChangeText={getComment}
            multiline={true}
          />

          <SubmitButton onPress={() => submitComment(comment)}>
            {commentLoading ? (
              <ActivityIndicator size={25} color="#e5e5e5" />
            ) : (
              <TextButton>Send Comment</TextButton>
            )}
          </SubmitButton>

          <HomeButton onPress={() => navigation.navigate('Home')}>
            <Icon name="home-circle" color="#e5e5e5" size={45} />
          </HomeButton>

          <CustomModal
            isModalVisible={isModalVisible}
            modalTitle={modalTitle}
            modalDescription={modalDescription}
          >
            <ModalCloseButtom onPress={toggleModal}>
              <Icon name="close-box" size={30} color="#f15a24" />
            </ModalCloseButtom>
          </CustomModal>
        </>
      )}
    </Container>
  );
};

export default GistPage;
