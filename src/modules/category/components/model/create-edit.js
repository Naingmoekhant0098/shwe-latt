import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Space, message, DatePicker } from "antd";
import { CalendarOutlined, PlusCircleOutlined, EditOutlined, } from "@ant-design/icons";
import { useDrawCategoryController } from "../../hooks/useCustomerController";
import dayjs from "dayjs";
const CreateEditModel = ({ record, type: initialType, }) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState(initialType);
    const { handleCreate, handleEdit, createLoading, updateLoading } = useDrawCategoryController();
    useEffect(() => {
        if (open) {
            if (modalType === "edit" && record) {
                form.setFieldsValue({
                    drawNumber: record.drawNumber,
                    date: record.date ? dayjs(record.date) : null,
                });
            }
            else {
                form.resetFields();
            }
        }
    }, [open, record, modalType, form]);
    const showModal = (mode) => {
        setModalType(mode);
        setOpen(true);
    };
    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            const payload = {
                ...values,
                date: values.date ? values.date.format("YYYY-MM-DD") : undefined,
            };
            if (modalType === "create") {
                const response = await handleCreate(payload);
                if (response.success) {
                    message.success(response.message);
                    setOpen(false);
                    form.resetFields();
                }
                else {
                    message.error(response.message);
                }
            }
            else {
                const response = await handleEdit(record._id, payload);
                if (response.success) {
                    message.success(response.message);
                    setOpen(false);
                }
                else {
                    message.error(response.message);
                }
            }
        }
        catch (error) {
            console.log("Validation failed or API error:", error);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Space, { children: record ? (_jsx(Button, { onClick: () => showModal("edit"), className: "cursor-pointer text-sm", icon: _jsx(EditOutlined, {}) })) : (_jsx(Button, { type: "primary", icon: _jsx(PlusCircleOutlined, {}), onClick: () => showModal("create"), children: "\u1021\u1000\u103C\u102D\u1019\u103A\u101B\u1031\u1021\u101E\u1005\u103A\u1016\u103D\u1004\u1037\u103A\u1015\u102B\u104B" })) }), _jsx(Modal, { title: _jsxs("div", { className: "flex items-center", children: [_jsx(CalendarOutlined, { className: "mr-2" }), _jsx("span", { children: modalType === "create"
                                ? "မဲနှိုက်မည့် အကြိမ်ရေကိုဖန်တီးပါ။"
                                : "မဲနှိုက်မည့် အကြိမ်ရေကိုပြင်ဆင်ပါ။" })] }), open: open, onCancel: () => setOpen(false), confirmLoading: modalType === "create" ? createLoading : updateLoading, destroyOnClose: true, footer: [
                    _jsxs(Space, { children: [_jsx(Button, { onClick: () => setOpen(false), children: "\u1015\u101A\u103A\u1016\u103B\u1000\u103A\u1019\u100A\u103A" }, "cancel"), _jsx(Button, { type: "primary", loading: modalType === "create" ? createLoading : updateLoading, onClick: handleOk, children: modalType === "create" ? "ဖန်တီးမည်" : "ပြင်ဆင်မည်" }, "submit")] }, "buttons"),
                ], children: _jsxs(Form, { form: form, layout: "vertical", className: "mt-4! space-y-\u1046!", children: [_jsx(Form.Item, { name: "drawNumber", label: "\u1019\u1032\u1014\u103E\u102D\u102F\u1000\u103A\u1019\u100A\u1037\u103A \u1021\u1000\u103C\u102D\u1019\u103A\u101B\u1031 (Draw Number)", rules: [
                                {
                                    required: true,
                                    message: "ကျေးဇူးပြု၍ မဲနှိုက်မည့် အကြိမ်ရေ ထည့်သွင်းပါ။",
                                },
                            ], children: _jsx(Input, { placeholder: "\u1025\u1015\u1019\u102C - 001" }) }), _jsx(Form.Item, { name: "date", label: "\u1011\u102F\u1010\u103A\u1015\u103C\u1014\u103A\u1019\u100A\u1037\u103A\u101B\u1000\u103A\u1005\u103D\u1032 (Release Date)", rules: [
                                {
                                    required: true,
                                    message: "ကျေးဇူးပြု၍ ထုတ်ပြန်မည့်ရက်စွဲကို ရွေးချယ်ပါ။",
                                },
                            ], children: _jsx(DatePicker, { className: "w-full", placeholder: "\u101B\u1000\u103A\u1005\u103D\u1032\u101B\u103D\u1031\u1038\u1001\u103B\u101A\u103A\u101B\u1014\u103A" }) })] }) })] }));
};
export default CreateEditModel;
