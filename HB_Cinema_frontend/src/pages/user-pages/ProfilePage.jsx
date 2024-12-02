import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { getMyBill } from "../../api/apiBill";
import { getTicketByBill } from "../../api/apiTicket";
import MyBill from "../../components/User/my-bill/MyBill";
import MyTicket from "../../components/User/my-ticket/MyTicket";
import Profile from "../../components/User/profile/Profile";
import Footer from "../../components/User/footer/Footer"
import { getMyInfo, updateUser } from "../../api/apiUser";

const ProfilePage = () => {
  const [bills, setBills] = useState([]); // Danh sách hóa đơn
  const [tickets, setTickets] = useState([]); // Danh sách vé theo hóa đơn
  const [selectedBillId, setSelectedBillId] = useState(null); // Hóa đơn được chọn
  const [myInfo, setMyInfo] = useState({});
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu

  const navigate = useNavigate();

  // Gọi API lấy danh sách hóa đơn khi component được mount
  useEffect(() => {
    fetchMyBill();
    fetchMyInfo();
  }, []);

  const fetchMyBill = async () => {
    setLoading(true);
    try {
      const data = await getMyBill();
      setBills(data.result);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };


  const fetchMyInfo = async () => {
    try {
      const data = await getMyInfo();
      const myInfo = data.result;
      setMyInfo(myInfo);
      console.log(myInfo);
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchTicketsByBill = async (billId) => {
    setLoading(true);
    try {
      const data = await getTicketByBill(billId);
      setTickets(data.result);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleBillClick = (billId) => {
    setSelectedBillId(billId); // Đặt ID hóa đơn được chọn
    fetchTicketsByBill(billId); // Lấy danh sách vé liên quan
    navigate(`/profile/tickets/${billId}`); // Điều hướng sang trang chi tiết vé
  };

  const handleUpdateProfile = async (id, updatedUser) => {
    try {
      setError(null);
      await updateUser(id, updatedUser);
      alert("Successfully!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
    <div className="row">
      <div className="col-xl-5"><Profile title={"Profile details"} profile={myInfo} onSave={(updateUser) => {handleUpdateProfile(myInfo.id, updateUser)}}/></div>
      <div className="col-xl-7">
        <Routes>
          {/* Truyền danh sách hóa đơn và callback khi hóa đơn được click */}
          <Route
            path="/"
            element={<MyBill title={"List of all your bills"} bills={bills} onBillClick={handleBillClick} loading={loading} />}
          />

          {/* Hiển thị danh sách vé nếu hóa đơn được chọn */}
          <Route
            path="/tickets/:id"
            element={<MyTicket ticket={tickets} loading={loading} />}
          />
        </Routes>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;
