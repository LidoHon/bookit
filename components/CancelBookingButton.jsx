"use client";
import { toast } from "react-toastify";
import cancelBooking from "@/app/actions/cancelBooking";
import { Popconfirm } from "antd";
const CancelBookingButton = ({ bookingId }) => {
  const handleCancelClick = async () => {
    try {
      const result = await cancelBooking(bookingId);

      if (result.success) {
        toast.success("Booking cancelled successfully!");
      }
    } catch (error) {
      console.log("Failed to cancel booking", error);
      return {
        error: "Failed to cancel booking",
      };
    }
  };

  return (
    <Popconfirm
      title="Are you sure you want to cancel this booking?"
      onConfirm={handleCancelClick}
      okText="Yes"
      cancelText="No"
    >
      <button className="bg-red-500 text-white px-4 py-2 rounded w-full sm:w-auto text-center hover:bg-red-700">
        Cancel Booking
      </button>
    </Popconfirm>
  );
};

export default CancelBookingButton;
