"use client";
import deleteRoom from "@/app/actions/deleteRoom";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { Popconfirm, Button } from "antd";
const DeleteRoomButton = ({ roomId }) => {
  const handleDelete = async () => {
    try {
      const response = await deleteRoom(roomId);
      toast.success("Room deleted successfully");
    } catch (error) {
      console.log("failed to delete room", error);
      toast.error("Error deleting room");
    }
  };
  return (
    <Popconfirm
      title="Are you sure you want to delete this room?"
      onConfirm={handleDelete}
      okText="Yes"
      cancelText="No"
    >
      <button className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700">
        <FaTrash className="inline mr-1" /> Delete
      </button>
    </Popconfirm>
  );
};

export default DeleteRoomButton;
