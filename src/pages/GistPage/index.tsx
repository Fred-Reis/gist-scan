import React from 'react';
import { ScrollView } from 'react-native';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import { github, docco, dracula } from 'react-syntax-highlighter/styles/hljs';

// import { Container } from './styles';

const GistPage: React.FC = () => {
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



  const fetchMachine = Machine(def_machine);

  `;

  return (
    <ScrollView style={{ maxHeight: 400, flex: 1 }}>
      <SyntaxHighlighter
        customStyle={{ padding: 0, margin: 20 }}
        language="javascript"
        style={github}
      >
        {code}
      </SyntaxHighlighter>
    </ScrollView>
  );
};

export default GistPage;
