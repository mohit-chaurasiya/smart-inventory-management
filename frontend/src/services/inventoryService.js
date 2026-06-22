import api from "./api";

export const getInventory = async () => {
    const response = await api.get("/products");
    return response.data;
};


export const adjustStock = async (
    id,
    data
) => {

    const response = await api.put(
        `/products/${id}/stock`,
        data
    );

    return response.data;
};

export const getTransactions = async () => {
    const response = await api.get("/inventory");

    return response.data
}