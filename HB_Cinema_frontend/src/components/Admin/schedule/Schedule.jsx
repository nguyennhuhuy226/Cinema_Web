import React, { useState, useEffect } from "react";
import { getToken } from "../../../api/localStorage";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";  // Đừng quên import CSS
import "./schedule.css";

const Schedule = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSchedules = async () => {
            try {
                const token = getToken(); // Lấy JWT từ localStorage
                const response = await fetch("http://localhost:8081/identity/schedule", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`, // Thêm token vào header
                    },
                });

                // Thay bằng URL API thực tế
                const data = await response.json();

                if (data.code === 0) {
                    setSchedules(data.result); // Lưu toàn bộ danh sách lịch chiếu
                } else {
                    throw new Error(data.message || "Không thể lấy danh sách lịch chiếu.");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSchedules();
    }, []);

    if (loading) return <div>Đang tải dữ liệu...</div>;
    if (error) return <div>Lỗi: {error}</div>;

    return (
        <div className="schedule-page">
            <h1>Schedules</h1>

            {/* Bọc bảng trong PerfectScrollbar */}
            <PerfectScrollbar
                style={{ maxHeight: "600px", width: "100%" }}  // Chiều cao giới hạn và chiều rộng 100%
                options={{ suppressScrollX: false }}  // Kích hoạt cuộn ngang
            >
                <table>
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Phim</th>
                            <th>Thời Gian</th>
                            <th>Ngày</th>
                            <th>Phòng</th>
                            <th>Chi Nhánh</th>
                        </tr>
                    </thead>
                    <tbody>
                        {schedules.map((schedule, index) => (
                            <tr key={schedule.id}>
                                <td>{index + 1}</td>
                                <td>{schedule.movieName}</td>
                                <td>{new Date(schedule.startDateTime).toLocaleTimeString()}</td>
                                <td>{new Date(schedule.startDateTime).toLocaleDateString()}</td>
                                <td>{schedule.room.name}</td>
                                <td>{schedule.room.branch.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </PerfectScrollbar>
        </div>
    );
};

export default Schedule;
