import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { getMyBill } from "../../api/apiBill";
import { getTicketByBill } from "../../api/apiTicket";
import MyBill from "../../components/User/my-bill/MyBill";
import MyTicket from "../../components/User/my-ticket/MyTicket";
import Profile from "../../components/User/profile/Profile";
import Footer from "../../components/User/footer/Footer";
import { getMyInfo, updateUser } from "../../api/apiUser";
import Loading from "../../components/User/loading/Loading";
import { useNotificationModal } from "../../components/User/notificationModal/NotificationModal";

const ProfilePage = () => {
  const [bills, setBills] = useState([]); // Danh sách hóa đơn
  const [tickets, setTickets] = useState([]); // Danh sách vé theo hóa đơn
  const [selectedBillId, setSelectedBillId] = useState(null); // Hóa đơn được chọn
  const [myInfo, setMyInfo] = useState({});
  const [error, setError] = useState(null); // Trạng thái lỗi
  const [loading, setLoading] = useState(false); // Trạng thái tải dữ liệu

  const navigate = useNavigate();

  // Sử dụng hook thông báo
  const { openModal, ModalComponent } = useNotificationModal();

  // Gọi API lấy danh sách hóa đơn và thông tin người dùng khi component được mount
  useEffect(() => {
    fetchMyBill();
    fetchMyInfo();
  }, []);

  const fetchMyBill = async () => {
    setLoading(true); // Bắt đầu loading
    try {
      const data = await getMyBill();
      setBills(data.result);
    } catch (err) {
      setError(err.message);
      openModal({ type: "error", title: "Error", message: err.message });
    } finally {
      setLoading(false); // Kết thúc loading
    }
  };

  const fetchMyInfo = async () => {
    setLoading(true);
    try {
      const data = await getMyInfo();
      setMyInfo(data.result);
    } catch (error) {
      setError(error.message);
      openModal({ type: "error", title: "Lỗi", message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const fetchTicketsByBill = async (billId) => {
    setLoading(true);
    try {
      const data = await getTicketByBill(billId);
      setTickets(data.result);
    } catch (err) {
      setError(err.message);
      openModal({ type: "error", title: "Lỗi", message: err.message });
    } finally {
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
      const payload = {
        username: updatedUser.username, // Lấy từ form
        firstName: updatedUser.firstName, // Lấy từ form
        lastName: updatedUser.lastName, // Lấy từ form
        email: updatedUser.email, // Lấy từ form
        phoneNumber: updatedUser.phoneNumber, // Lấy từ form
        address: updatedUser.address, // Lấy từ form
        dob: new Date(updatedUser.dob).toISOString().split("T")[0], // Định dạng YYYY-MM-DD
      };
      setError(null);
      await updateUser(id, payload);
      openModal({
        type: "success",
        title: "Success",
        message: "Information updated successfully!",
      });
    } catch (error) {
      setError(error.message);
      openModal({ type: "error", title: "Error", message: error.message });
    }
  };

  // Nếu đang loading, hiển thị trạng thái Loading
  if (loading) {
    return <Loading fullScreen={true} text="Loading data..." />;
  }

  return (
    <div className="row">
      <ModalComponent />
      <div className="col-xl-5">
        <Profile
          title={"Profile details"}
          profile={myInfo}
          onSave={(updateUser) => handleUpdateProfile(myInfo.id, updateUser)}
        />
      </div>
      <div className="col-xl-7">
        <Routes>
          {/* Truyền danh sách hóa đơn và callback khi hóa đơn được click */}
          <Route
            path="/"
            element={
              <MyBill
                title={"List of all your bills"}
                bills={bills}
                onBillClick={handleBillClick}
                loading={loading}
              />
            }
          />

          {/* Hiển thị danh sách vé nếu hóa đơn được chọn */}
          <Route
            path="/tickets/:id"
            element={<MyTicket ticket={tickets} loading={loading} />}
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
