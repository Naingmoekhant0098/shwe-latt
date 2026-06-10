import { Modal } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

export const showDeleteDoctorConfirm = (record: any, onConfirm: () => void) => {
  Modal.confirm({
    title: <div className=" font-medium text-md"> ဤအေးဂျင့် "{record.name}" ကို ဖျက်ရန် သေချာပါသလား?</div>,
    icon: <ExclamationCircleFilled style={{ color: "#ff4d4f" }} />,
    content: (
      <div className=" mt-0! hidden md:inline-block" >
       <p >ဤလုပ်ဆောင်ချက်သည် အပြီးတိုင်ဖြစ်ပြီး ပြန်ပြင်၍မရနိုင်ပါ။</p>
      </div>
    ),
    okText: "ဖျက်မည်",
    okType: "danger",
    cancelText: "မဖျက်တော့ပါ",
    centered: true,
    width: 420,
    onOk: onConfirm,
  });
};
