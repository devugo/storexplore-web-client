const ChatMessage = ({ position, message }: { position: string; message: string }) => {
  return (
    <div className={`chat-message ${position}`}>
      <div className="chat-message__content">
        <p>{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
