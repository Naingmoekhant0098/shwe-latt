import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, message, Select } from "antd";
import { PlusCircleOutlined, EditOutlined } from "@ant-design/icons";
import { useTicketController } from "../../hooks/useTicketController";
import { ScanLineIcon, Ticket } from "lucide-react";
import Scanner from "../scanner";

interface CreateEditModelProps {
  record?: any;
  type: "create" | "edit";
  categories?: any[];
  agents?: any[];
}

const CreateEditModel: React.FC<CreateEditModelProps> = ({
  record,
  type: initialType,
  categories = [],
  agents = [],
}) => {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "edit">(initialType);
  const [isOpenScan, setIsOpenScan] = useState(false);
  const { handleCreate, handleEdit, createLoading, updateLoading } =
    useTicketController();

  useEffect(() => {
    if (open) {
      if (modalType === "edit" && record) {
        form.setFieldsValue({
          number: record.number,
          drawCategory:
            typeof record.DrawCategory === "object"
              ? record.DrawCategory?._id
              : record.DrawCategory,
          agent:
            typeof record.Agent === "object" ? record.Agent?._id : record.Agent,
          status: record.status || "pending",
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
      console.log("Form Values:", values);

      const response =
        modalType === "create"
          ? await handleCreate(values)
          : await handleEdit(record?._id, values);

      if (response.success) {
        message.success(response.message);
        setOpen(false);
        form.resetFields();
      } else {
        message.error(response.message);
      }
    } catch (error) {
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

  return (
    <div>
      <div>
        {record ? (
          <Button
            onClick={() => showModal("edit")}
            size="small"
            type="text"
            className="bg-red-100 mt-[2px]! hover:bg-red-200 text-green-600! flex items-center"
          >
            <EditOutlined style={{ fontSize: "14px" }} />
            <span className="text-[11px] ml-1">ပြင်ဆင်မည်</span>
          </Button>
        ) : (
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={() => showModal("create")}
          >
            <span className="hidden md:block">လက်မှတ်အသစ်ဖန်တီးရန်</span>
            <span className="block md:hidden">ဖန်တီးမည်</span>
          </Button>
        )}
      </div>

      <Modal
        title={
          <div className="flex items-center gap-2">
            <Ticket className="size-5 text-blue-500" />
            <span>
              {modalType === "create"
                ? "လက်မှတ်အသစ်ဖန်တီးခြင်း"
                : "လက်မှတ်အချက်အလက်ပြင်ဆင်ခြင်း"}
            </span>
          </div>
        }
        open={open}
        onCancel={() => setOpen(false)}
        confirmLoading={modalType === "create" ? createLoading : updateLoading}
        width={600}
        onOk={handleOk}
        okText={
          modalType === "create" ? "လက်မှတ်ဖန်တီးမည်" : "အချက်အလက်ပြင်ဆင်မည်"
        }
        cancelText="ပယ်ဖျက်မည်"
        destroyOnClose
      >
        <Scanner
          isOpen={isOpenScan}
          setIsOpen={setIsOpenScan}
          scannSuccess={scannSuccess}
        />
        <Form form={form} layout="vertical" className="mt-4!">
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
            <Form.Item
              name="number"
              label="လက်မှတ်နံပါတ်"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ လက်မှတ်နံပါတ် ထည့်သွင်းပါ။",
                },
              ]}
            >
              <Input
                placeholder="QR စကန်ဖတ်ပါ သို့မဟုတ် နံပါတ်ကို ရိုက်ထည့်ပါ"
                maxLength={15}
                addonAfter={
                  <Button
                    type="text"
                    icon={<ScanLineIcon size={18} />}
                    onClick={startScanner}
                  />
                }
              />
            </Form.Item>

            <Form.Item
              name="drawCategory"
              label="ကံစမ်းမဲအမျိုးအစား"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ ကံစမ်းမဲအမျိုးအစားကို ရွေးချယ်ပါ။",
                },
              ]}
            >
              <Select
                placeholder="အမျိုးအစားရွေးချယ်ရန်"
                showSearch
                optionFilterProp="children"
              >
                {categories.map((cat) => (
                  <Select.Option
                    key={cat.id || cat._id}
                    value={cat.id || cat._id}
                  >
                    {cat.drawNumber} (
                    {new Date(cat.date).toLocaleDateString("en-US", {
                      month: "short", // Returns "May"
                      day: "numeric", // Returns "1"
                      year: "numeric", // Returns "2024"
                    })}
                    )
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="agent"
              label="တာဝန်ခံအေးဂျင့်"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ အေးဂျင့်ကို ရွေးချယ်ပါ။",
                },
              ]}
            >
              <Select
                placeholder="အေးဂျင့်ရွေးချယ်ရန်"
                showSearch
                optionFilterProp="children"
              >
                {agents.map((agent) => (
                  <Select.Option
                    key={agent.id || agent._id}
                    value={agent.id || agent._id}
                  >
                    👤 {agent.name} {agent.phone ? `(${agent.phone})` : ""}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="status" label="အခြေအနေ" initialValue="pending">
              <Select disabled={modalType === "create"}>
                <Select.Option value="pending">
                  စောင့်ဆိုင်းဆဲ (Pending)
                </Select.Option>
                <Select.Option value="won">ပေါက်မဲ (Won)</Select.Option>
                <Select.Option value="lost">မပေါက်ပါ (Lost)</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CreateEditModel;
