import ChatsBody from '../../components/ChatsBody';
import ChatUserList from '../../components/ChatUserList';
import PageWrapper from '../../components/PageWrapper';

const Chats = () => {
  return (
    <PageWrapper pageTitle="Chats">
      <div className="store-owner__chats">
        <div className="devugo-card">
          <div className="store-owner__chats-title">
            <div className="profile" style={{ display: 'flex' }}>
              <img
                src="https://devugo.com/index.png"
                width="30"
                height="30"
                style={{ borderRadius: '50%', marginRight: 5 }}
              />
              <h3>MIKE UGO</h3>
            </div>
            <ChatUserList />
          </div>
          <ChatsBody />
        </div>
      </div>
    </PageWrapper>
  );
};

export default Chats;
