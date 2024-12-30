export const scrollToBottom = (messagesContainerRef) => {
  if (messagesContainerRef.current) {
    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }
};

const parseTimestamp = (timestamp) => new Date(timestamp).getTime();

const getMessageDuration = (prevTimestamp, currentTimestamp) => {
  const prevTime = parseTimestamp(prevTimestamp);
  const currentTime = parseTimestamp(currentTimestamp);
  return (currentTime - prevTime) / 60000;
};

export const renderMessages = (messages) => {
  const combinedMessages = [];
  if (messages.length > 0) {
    messages.forEach((currentMessage, index) => {
      const previousMessage = messages[index - 1];
      if (
        previousMessage &&
        previousMessage.name === currentMessage.name &&
        getMessageDuration(
          previousMessage.timestamp,
          currentMessage.timestamp
        ) < 5
      ) {
        combinedMessages[
          combinedMessages.length - 1
        ].message += `<br />${currentMessage.message}`;
      } else {
        combinedMessages.push({ ...currentMessage });
      }
    });
  }
  return combinedMessages;
};
