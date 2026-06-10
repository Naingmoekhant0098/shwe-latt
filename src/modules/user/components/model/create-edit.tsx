import React, { useEffect, useState } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Button,
  Space,
  Switch,
  message,
} from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import { useUserController } from "../../hooks/useUserController";

interface CreateEditModelProps {
  record?: any;
  type: "create" | "edit";
}

const CreateEditModel: React.FC<CreateEditModelProps> = ({
  record,
  type: initialType,
}) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">(initialType);
  const {
    roles,
    roleLoading,
    handleEdit,
    createLoading,
    handleCreate,
    updateLoading,
  } = useUserController();
  useEffect(() => {
    if (open) {
      if (modalType === "edit" && record) {
        console.log(record)
        form.setFieldsValue({
          name: record.name,
          email: record.email,
          phone: record.phone,
          role_id: record.role?.id ,
          isVerify: record.isVerify,
        });
      } else {
        form.resetFields();
        // form.setFieldsValue({ role_id: 2, isVerify: 0 });
      }
    }
  }, [open, record, modalType, form]);

  const showModal = (mode: "create" | "edit") => {
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
      } else {
        message.error(response.message);
      }
    } else {

        console.log(values)
        console.log(record)
      const { success, message: errorMessage } = await handleEdit(record?.id, {
        ...values,
        phone: values.phone || "",
      });
      if (!success) {
        message.error(errorMessage);
      } else {
        message.success(errorMessage);
        setOpen(false);
      }
    }
  };

  return (
    <>
      <Space>
        {record ? (
          <span onClick={() => showModal("edit")} className=" text-sm">
            Edit User
          </span>
        ) : (
          <Button icon={<EditOutlined />} onClick={() => showModal("create")}>
            Create User
          </Button>
        )}
      </Space>

      <Modal
        title={
          modalType === "create" ? (
            <div>
              <UserOutlined size={20} className=" mr-2" />
              <span>Create User</span>
            </div>
          ) : (
            <div>
              <UserOutlined size={20} className=" mr-2" />
              <span>Edit User</span>
            </div>
          )
        }
        open={open}
        onOk={handleOk}
        confirmLoading={modalType === "create" ? createLoading : updateLoading}
        onCancel={() => setOpen(false)}
        destroyOnHidden
        footer={[
          <div
            key="footer-container"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div key="switch-section">
              <span style={{ marginRight: 8 }}>Verify : </span>
              <Switch
                checked={form.getFieldValue("isVerify")}
                onChange={(checked) =>
                  form.setFieldsValue({ isVerify: checked })
                }
                size="small"
              />
            </div>
            <Space key="button-section">
              <Button key="back" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button
                key="submit"
                type="primary"
                loading={createLoading}
                onClick={handleOk}
              >
                {modalType === "create" ? "Create" : "Update"}
              </Button>
            </Space>
          </div>,
        ]}
      >
        <Form form={form} layout="vertical" className="mt-4">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input the name!" }]}
          >
            <Input placeholder="Clinizo Admin" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              {
                required: true,
                type: "email",
                message: "Please input a valid email!",
              },
            ]}
          >
            <Input placeholder="clinizo.admin@gmail.com" />
          </Form.Item>
          <Form.Item name="phone" label="Phone Number">
            <Input placeholder="0999999999999" />
          </Form.Item>
          <Form.Item name="role_id" label="Role">
            <Select
              showSearch
              placeholder="Select a role"
              loading={roleLoading}
              options={
                roles?.data?.map((role) => ({
                  label: role.name,
                  value: role.id,
                })) || []
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateEditModel;
