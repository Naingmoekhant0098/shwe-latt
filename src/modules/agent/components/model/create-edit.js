import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Space, message } from "antd";
import { EditOutlined, UserOutlined, PlusCircleOutlined, } from "@ant-design/icons";
import { useCustomerController } from "../../hooks/useCustomerController";
import { Edit, EditIcon, PlusCircle } from "lucide-react";
const CreateEditModel = ({ record, type: initialType, }) => {
    const [form] = Form.useForm();
    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState(initialType);
    const { handleCreate, handleEdit, createLoading, updateLoading } = useCustomerController();
    useEffect(() => {
        if (open) {
            if (modalType === "edit" && record) {
                form.setFieldsValue({
                    name: record.name,
                    phone: record.phone,
                    address: record.address,
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
            if (modalType === "create") {
                const response = await handleCreate(values);
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
                const response = await handleEdit(record?.id, values);
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
            console.log(error);
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(Space, { children: record ? (_jsx(Button, { onClick: () => showModal("edit"), className: "cursor-pointer text-sm", children: _jsx(EditIcon, { className: " size-4! md:size-5" }) })) : (_jsx(Button, { type: "primary", icon: _jsx(PlusCircleOutlined, { size: 16 }), onClick: () => showModal("create"), children: "\u1021\u1031\u1038\u1002\u103B\u1004\u1037\u103A\u1016\u1014\u103A\u1010\u102E\u1038\u1015\u102B\u104B" })) }), _jsx(Modal, { title: _jsxs("div", { className: " ", children: [_jsx(UserOutlined, { className: "mr-2" }), _jsx("span", { children: modalType === "create"
                                ? "အေးဂျင့်အသစ်ဖန်တီးပါ။"
                                : "အေးဂျင့်ကိုပြင်ဆင်ပါ။" })] }), open: open, onCancel: () => setOpen(false), confirmLoading: modalType === "create" ? createLoading : updateLoading, destroyOnHidden: true, footer: [
                    _jsxs(Space, { children: [_jsx(Button, { onClick: () => setOpen(false), children: "\u1015\u101A\u103A\u1016\u103B\u1000\u103A\u1019\u100A\u103A" }, "cancel"), _jsx(Button, { type: "primary", loading: modalType === "create" ? createLoading : updateLoading, onClick: handleOk, children: modalType === "create" ? "ဖန်တီးမည်" : "ပြင်ဆင်မည်" }, "submit")] }, "buttons"),
                ], children: _jsxs(Form, { form: form, layout: "vertical", className: "mt-4! space-y-4!", children: [_jsx(Form.Item, { name: "name", label: "\u1021\u1031\u1038\u1002\u103B\u1004\u1037\u103A\u1021\u1019\u100A\u103A", rules: [
                                {
                                    required: true,
                                    message: "ကျေးဇူးပြု၍ အေးဂျင့်အမည် ထည့်သွင်းပါ။",
                                },
                            ], children: _jsx(Input, { placeholder: "\u1019\u1031\u102C\u1004\u103A\u1019\u1031\u102C\u1004\u103A" }) }), _jsx(Form.Item, { name: "phone", label: "\u1016\u102F\u1014\u103A\u1038\u1014\u1036\u1015\u102B\u1010\u103A", rules: [
                                {
                                    required: true,
                                    message: "ကျေးဇူးပြု၍ ဖုန်းနံပါတ် ထည့်သွင်းပါ။",
                                },
                                {
                                    pattern: /^[0-9]{7,15}$/,
                                    message: "ဖုန်းနံပါတ်သည် ဂဏန်း ၇ လုံးမှ ၁၅ လုံးအထိ ဖြစ်ရပါမည်။",
                                },
                            ], children: _jsx(Input, { placeholder: "\u1040\u1049\u1049\u1049\u1049\u1049\u1049\u1049\u1049\u1049\u1049" }) }), _jsx(Form.Item, { name: "address", label: "\u101C\u102D\u1015\u103A\u1005\u102C", children: _jsx(Input.TextArea, { rows: 3, placeholder: "\u101B\u1014\u103A\u1000\u102F\u1014\u103A\u104A \u1019\u103C\u1014\u103A\u1019\u102C\u104B" }) })] }) })] }));
};
export default CreateEditModel;
