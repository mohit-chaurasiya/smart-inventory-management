import api from "./api";

export const getProducts = async () => {
    const response = await api.get("/products");
    return response.data;
};

export const createProduct = async (
    productData
) => {

    const formData = new FormData();

    Object.keys(productData).forEach((key) => {
        formData.append(
            key,
            productData[key]
        );
    });

    const response = await api.post(
        "/products",
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

export const updateProduct = async (
    id,
    productData
) => {

    const formData = new FormData();

    Object.keys(productData).forEach((key) => {

        // image tabhi bhejo jab new file select hui ho

        if (
            key === "image" &&
            !(productData[key] instanceof File)
        ) {
            return;
        }

        formData.append(
            key,
            productData[key]
        );
    });

    const response = await api.put(
        `/products/${id}`,
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

export const deleteProduct = async (id) => {
    const response = await api.delete(
        `/products/${id}`
    );

    return response.data;
};