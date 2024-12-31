export const scrollToBottom = (messagesContainerRef, notMe) => {
  if (messagesContainerRef.current) {
    const container = messagesContainerRef.current;
    const isNearBottom =
      container.scrollHeight - container.scrollTop <=
      container.clientHeight + 300;

    if (isNearBottom && notMe) {
      container.scrollTop = container.scrollHeight;
    }

    if (!notMe) {
      container.scrollTop = container.scrollHeight;
    }
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
        previousMessage.sender.username === currentMessage.sender.username &&
        getMessageDuration(previousMessage.sent_at, currentMessage.sent_at) < 5
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
