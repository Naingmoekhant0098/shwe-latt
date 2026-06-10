import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

export const showDeleteDoctorConfirm = (record: any, onConfirm: () => void) => {
  Modal.confirm({
    title: "Are you sure you want to delete this?",
    icon: <ExclamationCircleFilled style={{ color: "#ff4d4f" }} />,
    content: (
      <div style={{ marginTop: 8 }}>
        <p>This action is permanent and cannot be undone.</p>

        <div style={{ color: "#8c8c8c", fontSize: 12 }}>
          DOCTOR NAME: <b>{record?.name}</b>
        </div>

        <div style={{ color: "#8c8c8c", fontSize: 12 }}>
          LICENSE NUMBER: <b>{record?.license_number}</b>
        </div>
      </div>
    ),
    okText: "Yes, Delete",
    okType: "danger",
    cancelText: "No",
    centered: true,
    width: 420,
    onOk: onConfirm,
  });
};
