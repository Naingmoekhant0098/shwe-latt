import { message } from "antd";
import { useCreateUser, useDeleteUser, useGetUsers, useUpdateUser, } from "./useQuaries";
import { showDeleteDoctorConfirm } from "../components/delete_confirm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const useDrawCategoryController = () => {
    const { mutateAsync: deleteCategory } = useDeleteUser();
    const { mutateAsync: updateCategory, isPending: updateLoading } = useUpdateUser();
    const { mutateAsync: createCategory, isPending: createLoading } = useCreateUser();
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("");
    const [viewMode, setViewMode] = useState("grid");
    const params = {
        limit: perPage,
        page: currentPage,
        search: search,
        date,
    };
    const { data: drawCategories, isLoading } = useGetUsers(params);
    const totalItems = drawCategories?.meta?.total || 0;
    const navigate = useNavigate();
    const handlePageChange = (page, pageSize) => {
        setCurrentPage(page);
        setPerPage(pageSize);
    };
    const handleDelete = (record) => {
        showDeleteDoctorConfirm(record, async () => {
            try {
                await deleteCategory(record?._id || record?.id);
                message.success("မဲအကြိမ်ရေကို အောင်မြင်စွာ ဖျက်လိုက်ပါပြီ။");
            }
            catch {
                message.error("မဲအကြိမ်ရေကို ဖျက်၍မရပါ၊ ထပ်မံကြိုးစားပေးပါ။");
            }
        });
    };
    const handleDetail = (id) => {
        navigate(`/draw-categories/${id}`);
    };
    const handleEdit = async (id, data) => {
        try {
            await updateCategory({ id, data });
            return { success: true, message: "မဲအကြိမ်ရေ ပြင်ဆင်မှု အောင်မြင်ပါသည်။" };
        }
        catch (error) {
            return {
                success: false,
                message: error?.response?.data?.message || "မဲအကြိမ်ရေကို ပြင်ဆင်၍မရပါ။ ထပ်မံကြိုးစားပေးပါ။",
            };
        }
    };
    const handleCreate = async (data) => {
        try {
            await createCategory(data);
            return { success: true, message: "မဲအကြိမ်ရေအသစ် ဖန်တီးမှု အောင်မြင်ပါသည်။" };
        }
        catch (error) {
            return {
                success: false,
                message: error?.response?.data?.message || "မဲအကြိမ်ရေအသစ် ဖန်တီး၍မရပါ။ ထပ်မံကြိုးစားပေးပါ။",
            };
        }
    };
    return {
        handleDelete,
        handleDetail,
        handleEdit,
        drawCategories,
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
    };
};
