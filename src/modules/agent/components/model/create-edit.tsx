import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Space, message } from "antd";
import {
  EditOutlined,
  UserOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { useCustomerController } from "../../hooks/useCustomerController";
import { Edit, EditIcon, PlusCircle } from "lucide-react";

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

  const { handleCreate, handleEdit, createLoading, updateLoading } =
    useCustomerController();

  useEffect(() => {
    if (open) {
      if (modalType === "edit" && record) {
        form.setFieldsValue({
          name: record.name,
          phone: record.phone,
          address: record.address,
        });
      } else {
        form.resetFields();
      }
    }
  }, [open, record, modalType, form]);

  const showModal = (mode: "create" | "edit") => {
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
        } else {
          message.error(response.message);
        }
      } else {
        const response = await handleEdit(record?.id, values);

        if (response.success) {
          message.success(response.message);
          setOpen(false);
        } else {
          message.error(response.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Space>
        {record ? (
          <Button
            onClick={() => showModal("edit")}
            className="cursor-pointer text-sm"
          >
            <EditIcon className=" size-4! md:size-5" />
          </Button>
        ) : (
          <Button
            type="primary"
            icon={<PlusCircleOutlined size={16} />}
            onClick={() => showModal("create")}
          >
            အေးဂျင့်ဖန်တီးပါ။
          </Button>
        )}
      </Space>

      <Modal
        title={
          <div className=" ">
            <UserOutlined className="mr-2" />
            <span>
              {modalType === "create"
                ? "အေးဂျင့်အသစ်ဖန်တီးပါ။"
                : "အေးဂျင့်ကိုပြင်ဆင်ပါ။"}
            </span>
          </div>
        }
        open={open}
        onCancel={() => setOpen(false)}
        confirmLoading={modalType === "create" ? createLoading : updateLoading}
        destroyOnHidden
        footer={[
          <Space key="buttons">
            <Button key="cancel" onClick={() => setOpen(false)}>
              ပယ်ဖျက်မည်
            </Button>

            <Button
              key="submit"
              type="primary"
              loading={modalType === "create" ? createLoading : updateLoading}
              onClick={handleOk}
            >
              {modalType === "create" ? "ဖန်တီးမည်" : "ပြင်ဆင်မည်"}
            </Button>
          </Space>,
        ]}
      >
        <Form   form={form} layout="vertical" className="mt-4! space-y-4!">
          <Form.Item
            name="name"
            label="အေးဂျင့်အမည်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ အေးဂျင့်အမည် ထည့်သွင်းပါ။",
              },
            ]}
          >
            <Input placeholder="မောင်မောင်" />
          </Form.Item>

          <Form.Item
            name="phone"
            label="ဖုန်းနံပါတ်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ဖုန်းနံပါတ် ထည့်သွင်းပါ။",
              },
              {
                pattern: /^[0-9]{7,15}$/,
                message: "ဖုန်းနံပါတ်သည် ဂဏန်း ၇ လုံးမှ ၁၅ လုံးအထိ ဖြစ်ရပါမည်။",
              },
            ]}
          >
            <Input placeholder="၀၉၉၉၉၉၉၉၉၉၉" />
          </Form.Item>

          <Form.Item name="address" label="လိပ်စာ">
            <Input.TextArea rows={3} placeholder="ရန်ကုန်၊ မြန်မာ။" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CreateEditModel;
