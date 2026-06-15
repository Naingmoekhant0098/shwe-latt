import { message } from "antd";
import { useCreateUser, useDeleteUser, useGetRoles, useGetUsers, useUpdateUser, } from "./useQuaries";
import { showDeleteDoctorConfirm } from "../components/delete_confirm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export const useUserController = () => {
    const { data: roles, isLoading: roleLoading } = useGetRoles();
    const { mutateAsync: deleteUser } = useDeleteUser();
    const { mutateAsync: updateUser, isPending: updateLoading } = useUpdateUser();
    const [perPage, setPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState("list");
    const params = {
        per_page: perPage,
        page: currentPage,
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
                await deleteUser(record.id);
                message.success("User deleted successfully");
            }
            catch {
                message.error("Failed to user doctor");
            }
        });
    };
    const handleDetail = (id) => {
        navigate(`/doctors/${id}`);
    };
    const handleEdit = async (id, data) => {
        try {
            await updateUser({ id, data });
            return { success: true, message: "User updated successfully" };
        }
        catch (error) {
            return {
                success: false,
                message: error?.response?.data?.message || "Failed to updated user",
            };
        }
    };
    const handleCreate = async (data) => {
        try {
            await mutateAsync(data);
            return { success: true, message: "User created successfully" };
        }
        catch (error) {
            return {
                success: false,
                message: error?.response?.data?.message || "Failed to create user",
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
        roles,
        roleLoading,
        handleCreate,
        createLoading,
    };
};
