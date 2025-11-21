import axiosClient from "../api/axiosClient"
import { API_ENDPOINTS } from "../api/endpoints"

export const uploadFile = async (formData: FormData) => {
    return await axiosClient.post(API_ENDPOINTS.FILE.UPLOAD, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}