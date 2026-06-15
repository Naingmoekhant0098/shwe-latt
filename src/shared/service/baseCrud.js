import api from "../../app/api/axios";
export const apiService = (endpoint) => {
    return {
        getAll: (params) => api.get(endpoint, { params }).then((res) => res.data),
        getById: (id) => api
            .get(`${endpoint}/${id}`)
            .then((res) => res.data),
        create: (data) => api.post(endpoint, data).then((res) => res.data),
        update: (id, data) => api
            .put(`${endpoint}/${id}`, data)
            .then((res) => res.data),
        remove: (id) => api
            .delete(`${endpoint}/${id}`)
            .then((res) => res.data),
        uploadFiles: (id, formData) => api
            .put(`${endpoint}/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then((res) => res.data),
    };
};
