import { message } from "antd";
import {
  useCreateUser,
  useDeleteUser,
  useGetUsers,
  useUpdateUser,
} from "./useQuaries";
import { showDeleteDoctorConfirm } from "../components/delete_confirm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { DrawRequest, DrawResponse } from "../type";

export const useDrawCategoryController = () => {
  const { mutateAsync: deleteCategory } = useDeleteUser();
  const { mutateAsync: updateCategory, isPending: updateLoading } = useUpdateUser();
  const { mutateAsync: createCategory, isPending: createLoading } = useCreateUser();

  const [perPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid");

  const params = {
    limit: perPage,
    page: currentPage,
    search: search,
    date,
  };

  const { data: drawCategories, isLoading } = useGetUsers(params);
  const totalItems = drawCategories?.meta?.total || 0;
  const navigate = useNavigate();

  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPerPage(pageSize);
  };

  const handleDelete = (record: any) => {
    showDeleteDoctorConfirm(record, async () => {
      try {
        await deleteCategory(record?._id || record?.id);
        message.success("မဲအကြိမ်ရေကို အောင်မြင်စွာ ဖျက်လိုက်ပါပြီ။");
      } catch {
        message.error("မဲအကြိမ်ရေကို ဖျက်၍မရပါ၊ ထပ်မံကြိုးစားပေးပါ။");
      }
    });
  };

  const handleDetail = (id: string | number) => {
    navigate(`/draw-categories/${id}`);
  };

  const handleEdit = async (id: string, data: DrawRequest) => {
    try {
      await updateCategory({ id, data });
      return { success: true, message: "မဲအကြိမ်ရေ ပြင်ဆင်မှု အောင်မြင်ပါသည်။" };
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || "မဲအကြိမ်ရေကို ပြင်ဆင်၍မရပါ။ ထပ်မံကြိုးစားပေးပါ။",
      };
    }
  };

  const handleCreate = async (data: DrawRequest) => {
    try {
      await createCategory(data);
      return { success: true, message: "မဲအကြိမ်ရေအသစ် ဖန်တီးမှု အောင်မြင်ပါသည်။" };
    } catch (error: any) {
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

