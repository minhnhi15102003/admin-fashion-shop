import axiosClient from "../api/axiosClient"
import { API_ENDPOINTS } from "../api/endpoints"
import type { CategoryRes } from "../types/category/CategoryRes"
import type { CreateCategoryRq } from "../types/category/CreateCategoryRp"

export const categoryServices = {
    createCategory: async (data: CreateCategoryRq) => {
        return await axiosClient.post<CategoryRes>(API_ENDPOINTS.CATEGORY.CREAT, data)
    },

    getListCategory: async () => {
        return await axiosClient.get(API_ENDPOINTS.CATEGORY.LIST_CATEGORY,{
            params: {
                limit: 10,
                offset: 0
            }
        })

    },
    
    removeCategory: async (id: number) => {
        return await axiosClient.delete(API_ENDPOINTS.CATEGORY.REMOVE_CATEGORY, {
            pathParams: {
                id: id + "",
            }
        })
    }
}