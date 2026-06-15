import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider, } from '@tanstack/react-query';
import './index.css';
import App from './App.tsx';
import { BrowserRouter } from "react-router-dom";
import "antd/dist/reset.css";
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 0,
            gcTime: 0,
            refetchOnWindowFocus: true,
            retry: false,
        },
    },
});
createRoot(document.getElementById('root')).render(_jsx(QueryClientProvider, { client: queryClient, children: _jsx(BrowserRouter, { children: _jsx(App, {}) }) }));
