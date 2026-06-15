import { message } from "antd";
import { useCreateUser, useDeleteUser, useGetUsers, useUpdateUser, } from "./useQuaries";
import { showDeleteDoctorConfirm } from "../components/delete_confirm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const useCustomerController = () => {
    const { mutateAsync: deleteUser } = useDeleteUser();
    const { mutateAsync: updateUser, isPending: updateLoading } = useUpdateUser();
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("");
    const [viewMode, setViewMode] = useState("list");
    const params = {
        limit: perPage,
        page: currentPage,
        search: search,
        date
    };
    const { data: doctors, isLoading } = useGetUsers(params);
    const { mutateAsync, isPending: createLoading } = useCreateUser();
    const totalItems = doctors?.meta?.total || 0;
    const navigate = useNavigate();
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPerPage(pageSize);
    };
    const handleDelete = (record) => {
        showDeleteDoctorConfirm(record, async () => {
            try {
                await deleteUser(record?._id);
                message.success("အေးဂျင့်ကို အောင်မြင်စွာ ဖျက်လိုက်ပါပြီ။");
            }
            catch {
                message.error("အေးဂျင့်ကို ဖျက်၍မရပါ၊ ထပ်မံကြိုးစားပေးပါ။");
            }
        });
    };
    const handleDetail = (id) => {
        navigate(`/doctors/${id}`);
    };
    const handleEdit = async (id, data) => {
        try {
            await updateUser({ id, data });
            return { success: true, message: "Customer updated successfully" };
        }
        catch (error) {
            return {
                success: false,
                message: error?.response?.data?.message || "Failed to updated Customer",
            };
        }
    };
    const handleCreate = async (data) => {
        try {
            await mutateAsync(data);
            return { success: true, message: "Customer created successfully" };
        }
        catch (error) {
            return {
                success: false,
                message: error?.response?.data?.message || "Failed to create Customer",
            };
        }
    };
    return {
        handleDelete,
        handleDetail,
        handleEdit,
        doctors,
        isLoading,
        totalItems,
        currentPage,
        perPage,
        viewMode,
        setViewMode,
        handlePageChange,
        updateLoading,
        handleCreate,
        createLoading,
        setSearch,
        setDate
    };
};
