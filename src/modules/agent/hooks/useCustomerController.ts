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
import type { CustomerRequest } from "../type";
export const useCustomerController = () => {
  const { mutateAsync: deleteUser } = useDeleteUser();
  const { mutateAsync: updateUser, isPending: updateLoading } = useUpdateUser();
  const [perPage, setPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const[date,setDate] = useState<string>("");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
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
  const handlePageChange = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setPerPage(pageSize);
  };
  const handleDelete = (record: any) => {
    showDeleteDoctorConfirm(record, async () => {
      try {
        await deleteUser(record?._id);
        message.success("အေးဂျင့်ကို အောင်မြင်စွာ ဖျက်လိုက်ပါပြီ။");
      } catch {
        message.error("အေးဂျင့်ကို ဖျက်၍မရပါ၊ ထပ်မံကြိုးစားပေးပါ။");
      }
    });
  };
  const handleDetail = (id: number) => {
    navigate(`/doctors/${id}`);
  };
  const handleEdit = async (id: number, data: CustomerRequest) => {
    try {
      await updateUser({ id, data });
      return { success: true, message: "Customer updated successfully" };
    } catch (error: any) {
      return {
        success: false,
        message: error?.response?.data?.message || "Failed to updated Customer",
      };
    }
  };
  const handleCreate = async (data: any) => {
    try {
      await mutateAsync(data);
      return { success: true, message: "Customer created successfully" };
    } catch (error: any) {
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
