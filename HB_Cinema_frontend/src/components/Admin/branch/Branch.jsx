import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../../api/localStorage";
import "./branch.css";

const BASE_URL = "http://localhost:8081/identity/branch";

const Branch = () => {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Hook để điều hướng

  useEffect(() => {
    const token = getToken();

    fetch(`${BASE_URL}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setBranches(data.result);
        setLoading(false);
        console.log(data.result);
      })
      .catch((error) => {
        console.error("Error fetching branches:", error);
        setError("Không thể tải dữ liệu");
        setLoading(false);
      });
  }, []);

  const handleViewRooms = (branchId) => {
    navigate(`/rooms/${branchId}`); // Điều hướng tới trang RoomList của chi nhánh cụ thể
  };

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {branches.map((branch) => (
        <div
          key={branch.id}
          className="bg-white shadow-md rounded-lg overflow-hidden custom_card"
        >
          <img
            src={branch.image}
            alt={branch.name}
            className="w-full h-48 object-cover custom_image"
          />
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">{branch.name}</h2>
            <p className="mb-2">Số điện thoại: {branch.phoneNumber}</p>
            <button
              onClick={() => handleViewRooms(branch.id)} // Khi nhấn sẽ chuyển sang trang RoomList của branch này
              className="custom_buton bg-blue-400 text-white py-2 px-4 transition focus:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              Xem phòng
            </button>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                branch.address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-2 text-red-500 hover:underline margin_linkMap"
            >
              Xem địa chỉ
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Branch;
