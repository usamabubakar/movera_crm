// sse.js
import { Howl } from 'howler';


const eventSource = new EventSource('http://localhost:5001/sse');

const sound = new Howl({
  src: ['http://codeskulptor-demos.commondatastorage.googleapis.com/pang/pop.mp3'],
  autoplay:true
});
const notifications = [];

eventSource.onmessage = (event) => {
  const eventData = JSON.parse(event.data)
  console.log(eventData)
  notifications.push(eventData.message);
  // if(eventData.isAdmin){
  //   sound.play();
  // }

  // console.log(notifications)

};
eventSource.onerror = (error) => {
    console.error('Error in SSE connection:', error);
  };

export const getNotifications = () => notifications;


