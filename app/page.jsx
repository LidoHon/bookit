import RoomCard from '@/components/RoomCard';
import { getAllRooms } from './actions/getAllRooms';
import Heading from '@/components/Heading';
export default async function Home() {
  const rooms = await getAllRooms()
  return (
    <>
     <Heading title="Available Rooms"/>
     {rooms.length >0 ? (
      rooms.map((room) => (
        <div key={room.$id}>
         
          <RoomCard room={room}/>
        </div>
      ))
     ):(
      <p>no rooms at the moment</p>
     )}
    </>
  );
}
