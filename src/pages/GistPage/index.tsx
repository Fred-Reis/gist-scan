import React, { useState, useCallback } from 'react';
import { FlatList } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { github } from 'react-syntax-highlighter/styles/hljs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
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
} from './styles';

const GistPage: React.FC = () => {
  const [data, setData] = useState<string>('');
  const navigation = useNavigation();

  const code = `const boot = {
    on: {
      FOLLOW: 'follower'
    }
  }

  const follower  = {

    type: 'parallel',
    states: {
      follower_update: {
        initial: 'waiting',
        states: {
          waiting: {
            entry: [ 'follower_update_wait'],
            on: {
              RAFT_CONFIG_UPDATE: 'update'
            }
          },
          update: {
            entry: ['follower_update_config'],
            on: {
              RAFT_CONFIG_UPDATE_DONE: 'waiting'
            }
          }
        }
      },
      heart_beat: {
        initial: 'set_timeout',
        states: {
          set_timeout: {
            entry: [ 'follower_timeout_set' ],
            on: {
              RAFT_HEARTBEAT: 'clear_timeout'
            }
          },
          clear_timeout: {
            entry: [ 'follower_timeout_clear'],
            on: {
              RAFT_TIMEOUT_CLEAR: 'set_timeout'
            }
          }
        }
      }
    },
    on: {
      RAFT_HEARTBEAT_TIMEOUT : 'candidate',
    }
  }

  const candidate = {
    initial: 'start_election',
    states: {
      start_election: {
        entry: [ 'candidate_election_start' ],
        on: {
          ELECTION_STARTED: 'vote_wait'
        }
      },
      vote_wait: {
        entry: [ 'candidate_vote_wait' ],
        on: {
          VOTE_TIMEOUT: 'vote_eval'
        }
      },
      vote_eval: {
        entry: [ 'candidate_vote_eval' ],
      }
    },
    on: {
      NEW_LEADER: 'follower',
      MAJORITY_VOTE: 'leader',
      NON_MAJORITY_VOTE: 'follower'
    }
  }

  const leader = {
    on: {
      NEW_TERM: 'follower'
    }
  }

  const node_id = Math.floor (  Math.random() * 32000 )

  const def_machine = {
    id: 'raft_node',
    initial: 'boot',
    context: {
      term: 0,
      cluster_config: {
        timeout_heartbeat_ms: 200,
        timeout_vote_ms: 3000
      },
      id: node_id,
      nodes: [
        node_id
      ]
    },
    states: {
      boot,
      follower ,
      candidate ,
      leader
    }
  }



  const fetchMachine = Machine(def_machine);`;

  const comments = [
    {
      id: 1,
      owner: {
        login: 'nome',
        avatar_url: 'https://avatars0.githubusercontent.com/u/11826350?v=4',
      },
      body:
        'um texto muito gerande pra caber em uma linha só um texto muito gerande pra caber em uma linha só um texto muito gerande pra caber em uma linha só um texto muito gerande pra caber em uma linha só ',
    },
    {
      id: 2,
      owner: {
        login: 'nome1',
        avatar_url: 'https://avatars0.githubusercontent.com/u/11826350?v=4',
      },
      body: 'um texto 1',
    },
    {
      id: 3,
      owner: {
        login: 'nome2',
        avatar_url: 'https://avatars0.githubusercontent.com/u/11826350?v=4',
      },
      body: 'um texto2',
    },
    {
      id: 4,
      owner: {
        login: 'nome3',
        avatar_url: 'https://avatars0.githubusercontent.com/u/11826350?v=4',
      },
      body: 'um texto3',
    },
  ];

  const getData = useCallback((e: string) => {
    setData(e);
  }, []);

  return (
    <Container>
      <Title>Gist Content</Title>
      <SyntaxHighlighter
        customStyle={customStyles}
        fontSize={14}
        language="typescript"
        style={github}
      >
        {code}
      </SyntaxHighlighter>

      <Title>Comments</Title>

      <FlatList
        style={{ maxHeight: 300 }}
        data={comments}
        keyExtractor={(comment) => String(comment.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: any) => (
          <CommentContainer>
            <Avatar source={{ uri: item.owner.avatar_url }} />

            <TextContainer>
              <NameText>{item.owner.login}</NameText>
              <CommentText>{item.body}</CommentText>
            </TextContainer>
          </CommentContainer>
        )}
      />

      <Title>Create new Comment</Title>
      <Input
        placeholder="Write a comment"
        value={data}
        onChangeText={getData}
        multiline={true}
      />

      <SubmitButton onPress={() => console.warn(data)}>
        <TextButton>Send Comment</TextButton>
      </SubmitButton>

      <HomeButton onPress={() => navigation.navigate('Home')}>
        <Icon name="home-circle" color="#e5e5e5" size={40} />
      </HomeButton>
    </Container>
  );
};

export default GistPage;
