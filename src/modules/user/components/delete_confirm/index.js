import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
export const showDeleteDoctorConfirm = (record, onConfirm) => {
    Modal.confirm({
        title: "Are you sure you want to delete this?",
        icon: _jsx(ExclamationCircleFilled, { style: { color: "#ff4d4f" } }),
        content: (_jsxs("div", { style: { marginTop: 8 }, children: [_jsx("p", { children: "This action is permanent and cannot be undone." }), _jsxs("div", { style: { color: "#8c8c8c", fontSize: 12 }, children: ["DOCTOR NAME: ", _jsx("b", { children: record?.name })] }), _jsxs("div", { style: { color: "#8c8c8c", fontSize: 12 }, children: ["LICENSE NUMBER: ", _jsx("b", { children: record?.license_number })] })] })),
        okText: "Yes, Delete",
        okType: "danger",
        cancelText: "No",
        centered: true,
        width: 420,
        onOk: onConfirm,
    });
};
