import { message } from "antd";
import { useCreateUser, useDeleteUser, useGetUserDetail, useUpdateUser, } from "./useQuaries";
import { showDeleteDoctorConfirm } from "../components/delete_confirm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const useTicketController = () => {
    const { mutateAsync: deleteUser } = useDeleteUser();
    const { mutateAsync: updateUser, isPending: updateLoading } = useUpdateUser();
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [viewMode, setViewMode] = useState("list");
    const { data: tickets, isLoading } = useGetUserDetail(selectedCategory);
    const { mutateAsync, isPending: createLoading } = useCreateUser();
    const totalItems = tickets?.pagination?.total || 0;
    const navigate = useNavigate();
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPerPage(pageSize);
    };
    const handleDelete = (record) => {
        showDeleteDoctorConfirm(record, async () => {
            try {
                await deleteUser(record.id);
                message.success("လက်မှတ်ကို အောင်မြင်စွာ ဖျက်ပြီးပါပြီ။");
            }
            catch {
                message.error("လက်မှတ်ဖျက်ရန် အဆင်မပြေပါသဖြင့် ပြန်လည်ကြိုးစားပါ။");
            }
        });
    };
    const handleDetail = (id) => {
        navigate(`/doctors/${id}`);
    };
    const handleEdit = async (id, data) => {
        try {
            await updateUser({ id, data });
            return {
                success: true,
                message: "လက်မှတ်အချက်အလက်ကို အောင်မြင်စွာ ပြင်ဆင်ပြီးပါပြီ။",
            }; // Ticket updated successfully
        }
        catch (error) {
            return {
                success: false,
                message: error?.response?.data?.message || "လက်မှတ်ပြင်ဆင်ရန် အဆင်မပြေပါ။", // Failed to update Ticket
            };
        }
    };
    const handleCreate = async (data) => {
        try {
            await mutateAsync(data);
            return {
                success: true,
                message: "လက်မှတ်ကို အောင်မြင်စွာ ပြုလုပ်ပြီးပါပြီ။",
            };
        }
        catch (error) {
            return {
                success: false,
                message: error?.response?.data?.message || "လက်မှတ်ပြုလုပ်ရန် အဆင်မပြေပါ။",
            };
        }
    };
    return {
        handleDelete,
        handleDetail,
        handleEdit,
        tickets,
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
        setDate,
        selectedCategory,
        setSelectedCategory,
    };
};
