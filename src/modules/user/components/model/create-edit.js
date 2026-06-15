import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Select, Button, Space, Switch, message, } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { useUserController } from "../../hooks/useUserController";
const CreateEditModel = ({ record, type: initialType, }) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState(initialType);
    const { roles, roleLoading, handleEdit, createLoading, handleCreate, updateLoading, } = useUserController();
    useEffect(() => {
        if (open) {
            if (modalType === "edit" && record) {
                console.log(record);
                form.setFieldsValue({
                    name: record.name,
                    email: record.email,
                    phone: record.phone,
                    role_id: record.role?.id,
                    isVerify: record.isVerify,
                });
            }
            else {
                form.resetFields();
                // form.setFieldsValue({ role_id: 2, isVerify: 0 });
            }
        }
    }, [open, record, modalType, form]);
    const showModal = (mode) => {
        setModalType(mode);
        setOpen(true);
    };
    const handleOk = async () => {
        const values = await form.validateFields();
        if (modalType === "create") {
            const response = await handleCreate(values);
            if (response.success) {
                message.success(response.message);
                setOpen(false);
            }
            else {
                message.error(response.message);
            }
        }
        else {
            console.log(values);
            console.log(record);
            const { success, message: errorMessage } = await handleEdit(record?.id, {
                ...values,
                phone: values.phone || "",
            });
            if (!success) {
                message.error(errorMessage);
            }
            else {
                message.success(errorMessage);
                setOpen(false);
            }
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Space, { children: record ? (_jsx("span", { onClick: () => showModal("edit"), className: " text-sm", children: "Edit User" })) : (_jsx(Button, { icon: _jsx(EditOutlined, {}), onClick: () => showModal("create"), children: "Create User" })) }), _jsx(Modal, { title: modalType === "create" ? (_jsxs("div", { children: [_jsx(UserOutlined, { size: 20, className: " mr-2" }), _jsx("span", { children: "Create User" })] })) : (_jsxs("div", { children: [_jsx(UserOutlined, { size: 20, className: " mr-2" }), _jsx("span", { children: "Edit User" })] })), open: open, onOk: handleOk, confirmLoading: modalType === "create" ? createLoading : updateLoading, onCancel: () => setOpen(false), destroyOnHidden: true, footer: [
                    _jsxs("div", { style: {
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }, children: [_jsxs("div", { children: [_jsx("span", { style: { marginRight: 8 }, children: "Verify : " }), _jsx(Switch, { checked: form.getFieldValue("isVerify"), onChange: (checked) => form.setFieldsValue({ isVerify: checked }), size: "small" })] }, "switch-section"), _jsxs(Space, { children: [_jsx(Button, { onClick: () => setOpen(false), children: "Cancel" }, "back"), _jsx(Button, { type: "primary", loading: createLoading, onClick: handleOk, children: modalType === "create" ? "Create" : "Update" }, "submit")] }, "button-section")] }, "footer-container"),
                ], children: _jsxs(Form, { form: form, layout: "vertical", className: "mt-4", children: [_jsx(Form.Item, { name: "name", label: "Name", rules: [{ required: true, message: "Please input the name!" }], children: _jsx(Input, { placeholder: "Clinizo Admin" }) }), _jsx(Form.Item, { name: "email", label: "Email", rules: [
                                {
                                    required: true,
                                    type: "email",
                                    message: "Please input a valid email!",
                                },
                            ], children: _jsx(Input, { placeholder: "clinizo.admin@gmail.com" }) }), _jsx(Form.Item, { name: "phone", label: "Phone Number", children: _jsx(Input, { placeholder: "0999999999999" }) }), _jsx(Form.Item, { name: "role_id", label: "Role", children: _jsx(Select, { showSearch: true, placeholder: "Select a role", loading: roleLoading, options: roles?.data?.map((role) => ({
                                    label: role.name,
                                    value: role.id,
                                })) || [] }) })] }) })] }));
};
export default CreateEditModel;
