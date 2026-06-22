import api from "./api";

export const getSales = async () => {
    const response = await api.get("/sales");
    return response.data;
};

export const createSale = async (saleData) => {
    const response = await api.post(
        "/sales",
        saleData
    );

    return response.data;
};

export const getTodaySales = async () => {
    const response = await api.get(
        "/sales/today"
    );

    return response.data;
};



export const downloadInvoice = async (saleId) => {
    const response = await api.get(
        `/sales/invoice/${saleId}`,
        {
            responseType: "blob",
        }
    );

    return response.data;
};