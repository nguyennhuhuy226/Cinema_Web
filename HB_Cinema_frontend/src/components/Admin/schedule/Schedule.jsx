import React, { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./schedule.css";
import { getAllSchedule, addSchedule, updateSchedule, deleteSchedule } from "../../../api/apiSchedule";
import DeleteSchedule from "../modal-admin/DeleteSchedule";
import AddSchedule from "../modal-admin/AddSchedule";
import EditSchedule from "../modal-admin/EditSchedule";


const Schedule = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBranch, setSelectedBranch] = useState("All");
    const [selectedDate, setSelectedDate] = useState("");
    
    // State for modals
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [selectedSchedule, setSelectedSchedule] = useState(null);
    const [scheduleToDelete, setScheduleToDelete] = useState(null);
    const [newSchedule, setNewSchedule] = useState({
        movieId: "",
        branchId: "",
        roomId: "",
        startDateTime: ""
    });

    useEffect(() => {
        fetchAllSchedule();  
    }, []);

    const fetchAllSchedule = async () => {
        try {
            setError(null);
            const data = await getAllSchedule();
            setSchedules(data.result);
            setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    // Add Schedule Handler
    const handleAddSchedule = async (scheduleData) => {
        try {
            const response = await addSchedule(scheduleData);
            setSchedules([...schedules, response.result]);
            setIsAddModalOpen(false);
            setNewSchedule({
                movieId: "",
                branchId: "",
                roomId: "",
                startDateTime: ""
            });
        } catch (error) {
            setError(error.message);
        }
    };

    // Update Schedule Handler
    const handleUpdateSchedule = async (updatedSchedule) => {
        try {
            await updateSchedule(selectedSchedule.id, updatedSchedule);
            const updatedSchedules = schedules.map(schedule => 
                schedule.id === selectedSchedule.id ? {...schedule, ...updatedSchedule} : schedule
            );
            setSchedules(updatedSchedules);
            setIsUpdateModalOpen(false);
            setSelectedSchedule(null);
        } catch (error) {
            setError(error.message);
        }
    };

    // Delete Schedule Handler
    const handleDeleteSchedule = async (scheduleId) => {
        try {
            await deleteSchedule(scheduleId);
            setSchedules(schedules.filter(schedule => schedule.id !== scheduleId));
            setIsDeleteModalOpen(false);
            setScheduleToDelete(null);
        } catch (error) {
            setError(error.message);
        }
    };

    // Get unique branches
    const branches = ["All", ...new Set(schedules.map(schedule => schedule.branchName))];

    // Filter schedules based on branch and date
    const filteredSchedules = schedules.filter(schedule => {
        const branchMatch = selectedBranch === "All" || schedule.branchName === selectedBranch;
        const dateMatch = !selectedDate || 
            new Date(schedule.startDateTime).toISOString().split('T')[0] === 
            new Date(selectedDate).toISOString().split('T')[0];
        return branchMatch && dateMatch;
    });

    // Group schedules by date and sort
    const groupedSchedules = filteredSchedules.reduce((acc, schedule) => {
        const date = new Date(schedule.startDateTime).toISOString().split('T')[0];
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(schedule);
        return acc;
    }, {});

    const formatTime = (dateTimeString) => {
        return new Date(dateTimeString).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    };

    const openDeleteModal = (schedule) => {
        setScheduleToDelete(schedule);
        setIsDeleteModalOpen(true);
    };

    const openUpdateModal = (schedule) => {
        setSelectedSchedule(schedule);
        setIsUpdateModalOpen(true);
    };

    if (loading) return <div className="loading">Loading schedules...</div>;
    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="schedule-management">
            <div className="schedule-filters">
                <select 
                    value={selectedBranch} 
                    onChange={(e) => setSelectedBranch(e.target.value)}
                    className="branch-select"
                >
                    {branches.map(branch => (
                        <option key={branch} value={branch}>{branch}</option>
                    ))}
                </select>
                <input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="date-select"
                />
                <button 
                    onClick={() => setIsAddModalOpen(true)} 
                    className="add-schedule-btn"
                >
                    Add Schedule
                </button>
            </div>

            <PerfectScrollbar>
                <div className="schedule-list">
                    {Object.entries(groupedSchedules).map(([date, dailySchedules]) => (
                        <div key={date} className="schedule-day">
                            {dailySchedules.map(schedule => (
                                <div key={schedule.id} className="schedule-item">
                                    <div className="schedule-time">{formatTime(schedule.startDateTime)}</div>
                                    <div className="schedule-details">
                                        <h3 className="movie-name">{schedule.movieName}</h3>
                                        <div className="schedule-info">
                                            <span className="branch-name">{schedule.branchName}</span>
                                            <span className="room-name">{schedule.room.name}</span>
                                        </div>
                                    </div>
                                    <div className="schedule-actions">
                                        <button 
                                            onClick={() => openUpdateModal(schedule)} 
                                            className="update-btn"
                                        >
                                            Update
                                        </button>
                                        <button 
                                            onClick={() => openDeleteModal(schedule)} 
                                            className="delete-btn"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </PerfectScrollbar>

            {filteredSchedules.length === 0 && (
                <div className="no-schedules">No schedules found</div>
            )}

            {/* Modals */}
            <AddSchedule 
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onAddSchedule={handleAddSchedule}
            />

            <EditSchedule
                isOpen={isUpdateModalOpen}
                onClose={() => setIsUpdateModalOpen(false)}
                schedule={selectedSchedule}
                onUpdateSchedule={handleUpdateSchedule}
            />

            <DeleteSchedule
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                schedule={scheduleToDelete}
                onDeleteSchedule={() => handleDeleteSchedule(scheduleToDelete.id)}
            />
        </div>
    );
};

export default Schedule;