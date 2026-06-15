import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
export const showDeleteDoctorConfirm = (record, onConfirm) => {
    Modal.confirm({
        title: _jsxs("div", { className: " font-medium text-md", children: [" \u1024\u1021\u1031\u1038\u1002\u103B\u1004\u1037\u103A \"", record.name, "\" \u1000\u102D\u102F \u1016\u103B\u1000\u103A\u101B\u1014\u103A \u101E\u1031\u1001\u103B\u102C\u1015\u102B\u101E\u101C\u102C\u1038?"] }),
        icon: _jsx(ExclamationCircleFilled, { style: { color: "#ff4d4f" } }),
        content: (_jsx("div", { className: " mt-0! hidden md:inline-block", children: _jsx("p", { children: "\u1024\u101C\u102F\u1015\u103A\u1006\u1031\u102C\u1004\u103A\u1001\u103B\u1000\u103A\u101E\u100A\u103A \u1021\u1015\u103C\u102E\u1038\u1010\u102D\u102F\u1004\u103A\u1016\u103C\u1005\u103A\u1015\u103C\u102E\u1038 \u1015\u103C\u1014\u103A\u1015\u103C\u1004\u103A\u104D\u1019\u101B\u1014\u102D\u102F\u1004\u103A\u1015\u102B\u104B" }) })),
        okText: "ဖျက်မည်",
        okType: "danger",
        cancelText: "မဖျက်တော့ပါ",
        centered: true,
        width: 420,
        onOk: onConfirm,
    });
};
