
import UpdateRoom from "@/components/UpdateRoom"; 

const UpdateRoomPage = ({ params }) => {
  const { roomId } = params;

  // Fetch existing room data (you can use server-side props or client-side fetching)
  const existingRoomData = {
    name: "Test Room",
    description: "This is a test room", 
  };

  return (
    <div>
      <UpdateRoom roomId={roomId} existingRoomData={existingRoomData} />
    </div>
  );
};

export default UpdateRoomPage;
