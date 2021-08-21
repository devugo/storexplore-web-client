import RenderIcon from './RenderIcon';

const ChatForm = (props: any) => {
  return (
    <div className="chat-form">
      <form>
        <div className="chat-form__input">
          <input placeholder="Write message..." className="devugo-input" {...props} />
          <div className="icon">
            <RenderIcon title="mdi mdi-message" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChatForm;
