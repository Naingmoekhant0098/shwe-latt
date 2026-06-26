import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Space, message, DatePicker } from "antd";
import {
  CalendarOutlined,
  PlusCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useDrawCategoryController } from "../../hooks/useCustomerController";
import dayjs from "dayjs";

interface CreateEditModelProps {
  record?: {
    _id: string;
    drawNumber: string;
    date?: string;
  };
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
    useDrawCategoryController();

  useEffect(() => {
    if (open) {
      if (modalType === "edit" && record) {
        form.setFieldsValue({
          drawNumber: record.drawNumber,

          date: record.date ? dayjs(record.date) : null,
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
        } else {
          message.error(response.message);
        }
      } else {
        const response = await handleEdit(record._id, payload);

        if (response.success) {
          message.success(response.message);
          setOpen(false);
        } else {
          message.error(response.message);
        }
      }
    } catch (error) {
      console.log("Validation failed or API error:", error);
    }
  };

  return (
    <div>
      <Space>
        {record ? (
          <Button
            onClick={() => showModal("edit")}
            className="cursor-pointer text-sm"
            icon={<EditOutlined />}
          ></Button>
        ) : (
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => showModal("create")}
          >
            ဖန်တီးမည်
          </Button>
        )}
      </Space>

      <Modal
        title={
          <div className="flex items-center">
            <CalendarOutlined className="mr-2" />
            <span>
              {modalType === "create"
                ? "ထီထွက်ရက်ဖန်တီးပါ။"
                : "ထီထွက်ရက်ကိုပြင်ဆင်ပါ။"}
            </span>
          </div>
        }
        open={open}
        onCancel={() => setOpen(false)}
        confirmLoading={modalType === "create" ? createLoading : updateLoading}
        destroyOnClose
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
        <Form form={form} layout="vertical" className="mt-4! space-y-၆!">
          <Form.Item
            name="drawNumber"
            label="မဲနှိုက်မည့် အကြိမ်ရေ (Draw Number)"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ မဲနှိုက်မည့် အကြိမ်ရေ ထည့်သွင်းပါ။",
              },
            ]}
          >
            <Input placeholder="ဥပမာ - 001" />
          </Form.Item>

          <Form.Item
            name="date"
            label="ထီထွက်ရက်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ထီထွက်ရက်ကို ရွေးချယ်ပါ။",
              },
            ]}
          >
            <DatePicker className="w-full" placeholder="ရက်စွဲရွေးချယ်ရန်" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateEditModel;
