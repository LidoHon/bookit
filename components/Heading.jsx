"use client";
import React from "react";
import { useAuth } from "@/context/authContext";
const Heading = ({ title }) => {
  const { isAuthenticated, currentUser } = useAuth();
  // console.log("Auth state:", isAuthenticated, currentUser);
  return (
    <section className="bg-white mb-5 shadow px-4 py-4">
      {isAuthenticated && currentUser && (
        <p className="text-sm text-gray-600">
          welcome <span className="">{currentUser.name}!</span>
        </p>
      )}
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
        {title}
      </h1>
    </section>
  );
};

export default Heading;
