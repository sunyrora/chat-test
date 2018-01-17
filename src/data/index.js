import { data } from './MOCK_DATA.js';

const messages = data.messages;

export const getAllData = () => messages;

export const getLatestData = (limit=20) =>  {
  
  if(limit >= messages.length) {
    return messages;
  }

  return messages.slice(messages.length-limit);
};

export const getOldData = (id, limit=20) => {
  let index = messages.findIndex(msg => msg.id === id);
  if(index === 0) return null;

  let start = index - limit;
  if(start < 0) start = 0;
  let end = index;
  return messages.slice(start, end);
};

export const getNewData = (id, limit=20) => {
  const index = messages.findIndex(msg => msg.id === id);
  let start = index + 1;
  let end = index + limit;
  return messages.slice(start, end);
}