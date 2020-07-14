import React, { useState, useCallback, useEffect } from 'react';
import { FlatList, ActivityIndicator, Keyboard, View } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { github } from 'react-syntax-highlighter/styles/hljs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, useRoute } from '@react-navigation/native';

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

const GistPage: React.FC = () => {
  const [commentLoading, setCommentLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [comments, setComments] = useState<any[]>([]);
  const [comment, setComment] = useState<string>('');
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalDescription, setModalDescription] = useState<string>('');

  const { params } = useRoute();
  const { data, id }: any = params;

  const navigation = useNavigation();

  let content = '';

  // iteraction to get fileName
  const fileNames = Object.keys(data.files);
  for (let i = 0; i < fileNames.length; i++) {
    var fileName = fileNames[i];
    content = data.files[fileName].content;
  }

  useEffect(() => {
    setLoading(true);
    if (data.comments > 0) {
      handleRefresh();
    }
    setLoading(false);
  }, []);

  // function to refresh page
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    const response = await api.get(`/${id}/comments`);
    console.log(response.data);
    setComments(response.data);
    setRefreshing(false);
  }, [api]);

  const getComment = useCallback((e: string) => {
    setComment(e);
  }, []);

  // function to submit your comment
  const submitComment = useCallback(
    async (comment) => {
      setCommentLoading(true);

      // function to authenticate with oauth
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

  // function to open modal
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
              refreshing={refreshing}
              onRefresh={handleRefresh}
              style={{ maxHeight: 300 }}
              data={comments}
              keyExtractor={(item, index) => String(index)}
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
