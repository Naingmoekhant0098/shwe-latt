import { ConfigProvider } from "antd";
import { useRoutes } from "react-router-dom";
import { routes } from "./app/router/routes";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00B14F",
          borderRadius: 12,
          fontFamily: "Poppins, sans-serif",
        },
        components: {
          Input: {
            borderRadius: 12,
            controlHeight: 40,
            paddingInline: 14,
            fontSize: 13,
            
          },
          
          InputNumber: {
            borderRadius: 12,
            controlHeight: 40,
            paddingInline: 14,
          },
          Alert: {
            fontSize: 11,
          },
          Select: {
            controlHeight: 45,
            borderRadius: 12,
          },
          Button: {
            borderRadius: 13,
            controlHeight: 42,
            paddingInline: 14,
            fontSize: 13,
            
          },
        },
      }}
    >
      {useRoutes(routes)}
    </ConfigProvider>
  );
}

export default App;
