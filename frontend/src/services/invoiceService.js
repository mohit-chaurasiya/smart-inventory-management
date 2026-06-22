import api from "./api";

export const extractInvoice =
    async (formData) => {

        const response =
            await api.post(
                "/invoice/extract",

                formData,

                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );

        return response.data;
    };

export const updateInventoryFromInvoice =
    async (products) => {

        const response =
            await api.post(
                "/invoice/confirm",
                { products }
            );

        return response.data;
    };