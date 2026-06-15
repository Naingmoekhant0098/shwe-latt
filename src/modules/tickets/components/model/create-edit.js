import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message, Select } from "antd";
import { PlusCircleOutlined, EditOutlined } from "@ant-design/icons";
import { useTicketController } from "../../hooks/useTicketController";
import { ScanLineIcon, Ticket } from "lucide-react";
import Scanner from "../scanner";
const CreateEditModel = ({ record, type: initialType, categories = [], agents = [], }) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState(initialType);
    const [isOpenScan, setIsOpenScan] = useState(false);
    const { handleCreate, handleEdit, createLoading, updateLoading } = useTicketController();
    useEffect(() => {
        if (open) {
            if (modalType === "edit" && record) {
                form.setFieldsValue({
                    number: record.number,
                    drawCategory: typeof record.DrawCategory === "object"
                        ? record.DrawCategory?._id
                        : record.DrawCategory,
                    agent: typeof record.Agent === "object" ? record.Agent?._id : record.Agent,
                    status: record.status || "pending",
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
            console.log("Form Values:", values);
            const response = modalType === "create"
                ? await handleCreate(values)
                : await handleEdit(record?._id, values);
            if (response.success) {
                message.success(response.message);
                setOpen(false);
                form.resetFields();
            }
            else {
                message.error(response.message);
            }
        }
        catch (error) {
            console.log("Validation Failed:", error);
        }
    };
    const startScanner = () => {
        setIsOpenScan(true);
    };
    const scannSuccess = (result) => {
        form.setFieldsValue({ number: result });
        setIsOpenScan(false);
    };
    return (_jsxs("div", { children: [_jsx("div", { children: record ? (_jsxs(Button, { onClick: () => showModal("edit"), size: "small", type: "text", className: "bg-red-100 mt-[2px]! hover:bg-red-200 text-green-600! flex items-center", children: [_jsx(EditOutlined, { style: { fontSize: "14px" } }), _jsx("span", { className: "text-[11px] ml-1", children: "\u1015\u103C\u1004\u103A\u1006\u1004\u103A\u1019\u100A\u103A" })] })) : (_jsxs(Button, { type: "primary", icon: _jsx(PlusCircleOutlined, {}), onClick: () => showModal("create"), children: [_jsx("span", { className: "hidden md:block", children: "\u101C\u1000\u103A\u1019\u103E\u1010\u103A\u1021\u101E\u1005\u103A\u1016\u1014\u103A\u1010\u102E\u1038\u101B\u1014\u103A" }), _jsx("span", { className: "block md:hidden", children: "\u1016\u1014\u103A\u1010\u102E\u1038\u1019\u100A\u103A" })] })) }), _jsxs(Modal, { title: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Ticket, { className: "size-5 text-blue-500" }), _jsx("span", { children: modalType === "create"
                                ? "လက်မှတ်အသစ်ဖန်တီးခြင်း"
                                : "လက်မှတ်အချက်အလက်ပြင်ဆင်ခြင်း" })] }), open: open, onCancel: () => setOpen(false), confirmLoading: modalType === "create" ? createLoading : updateLoading, width: 600, onOk: handleOk, okText: modalType === "create" ? "လက်မှတ်ဖန်တီးမည်" : "အချက်အလက်ပြင်ဆင်မည်", cancelText: "\u1015\u101A\u103A\u1016\u103B\u1000\u103A\u1019\u100A\u103A", destroyOnClose: true, children: [_jsx(Scanner, { isOpen: isOpenScan, setIsOpen: setIsOpenScan, scannSuccess: scannSuccess }), _jsx(Form, { form: form, layout: "vertical", className: "mt-4!", children: _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 md:gap-4", children: [_jsx(Form.Item, { name: "number", label: "\u101C\u1000\u103A\u1019\u103E\u1010\u103A\u1014\u1036\u1015\u102B\u1010\u103A", rules: [
                                        {
                                            required: true,
                                            message: "ကျေးဇူးပြု၍ လက်မှတ်နံပါတ် ထည့်သွင်းပါ။",
                                        },
                                    ], children: _jsx(Input, { placeholder: "QR \u1005\u1000\u1014\u103A\u1016\u1010\u103A\u1015\u102B \u101E\u102D\u102F\u1037\u1019\u101F\u102F\u1010\u103A \u1014\u1036\u1015\u102B\u1010\u103A\u1000\u102D\u102F \u101B\u102D\u102F\u1000\u103A\u1011\u100A\u1037\u103A\u1015\u102B", maxLength: 15, addonAfter: _jsx(Button, { type: "text", icon: _jsx(ScanLineIcon, { size: 18 }), onClick: startScanner }) }) }), _jsx(Form.Item, { name: "drawCategory", label: "\u1000\u1036\u1005\u1019\u103A\u1038\u1019\u1032\u1021\u1019\u103B\u102D\u102F\u1038\u1021\u1005\u102C\u1038", rules: [
                                        {
                                            required: true,
                                            message: "ကျေးဇူးပြု၍ ကံစမ်းမဲအမျိုးအစားကို ရွေးချယ်ပါ။",
                                        },
                                    ], children: _jsx(Select, { placeholder: "\u1021\u1019\u103B\u102D\u102F\u1038\u1021\u1005\u102C\u1038\u101B\u103D\u1031\u1038\u1001\u103B\u101A\u103A\u101B\u1014\u103A", showSearch: true, optionFilterProp: "children", children: categories.map((cat) => (_jsxs(Select.Option, { value: cat.id || cat._id, children: [cat.drawNumber, " (", new Date(cat.date).toLocaleDateString("en-US", {
                                                    month: "short", // Returns "May"
                                                    day: "numeric", // Returns "1"
                                                    year: "numeric", // Returns "2024"
                                                }), ")"] }, cat.id || cat._id))) }) }), _jsx(Form.Item, { name: "agent", label: "\u1010\u102C\u101D\u1014\u103A\u1001\u1036\u1021\u1031\u1038\u1002\u103B\u1004\u1037\u103A", rules: [
                                        {
                                            required: true,
                                            message: "ကျေးဇူးပြု၍ အေးဂျင့်ကို ရွေးချယ်ပါ။",
                                        },
                                    ], children: _jsx(Select, { placeholder: "\u1021\u1031\u1038\u1002\u103B\u1004\u1037\u103A\u101B\u103D\u1031\u1038\u1001\u103B\u101A\u103A\u101B\u1014\u103A", showSearch: true, optionFilterProp: "children", children: agents.map((agent) => (_jsxs(Select.Option, { value: agent.id || agent._id, children: ["\uD83D\uDC64 ", agent.name, " ", agent.phone ? `(${agent.phone})` : ""] }, agent.id || agent._id))) }) }), _jsx(Form.Item, { name: "status", label: "\u1021\u1001\u103C\u1031\u1021\u1014\u1031", initialValue: "pending", children: _jsxs(Select, { disabled: modalType === "create", children: [_jsx(Select.Option, { value: "pending", children: "\u1005\u1031\u102C\u1004\u1037\u103A\u1006\u102D\u102F\u1004\u103A\u1038\u1006\u1032 (Pending)" }), _jsx(Select.Option, { value: "won", children: "\u1015\u1031\u102B\u1000\u103A\u1019\u1032 (Won)" }), _jsx(Select.Option, { value: "lost", children: "\u1019\u1015\u1031\u102B\u1000\u103A\u1015\u102B (Lost)" })] }) })] }) })] })] }));
};
export default CreateEditModel;
