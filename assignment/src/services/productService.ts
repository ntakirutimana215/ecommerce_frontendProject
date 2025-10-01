import api from './api';

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    images: string[];
    category: {
        _id: string;
        name: string;
    };
    sizes: string[];
    colors: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateProductData {
    name: string;
    description?: string;
    price: number;
    stock: number;
    category: string;
    sizes?: string[];
    colors?: string[];
    images?: File[];
}

export const productService = {
    async getAllProducts(): Promise<Product[]> {
        const response = await api.get('/products');
        return response.data;
    },

    async getProductById(id: string): Promise<Product> {
        const response = await api.get(`/products/${id}`);
        return response.data;
    },

    async createProduct(data: CreateProductData): Promise<{ message: string; product: Product }> {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price.toString());
        formData.append('stock', data.stock.toString());
        formData.append('category', data.category);



        if (data.description) formData.append('description', data.description);
        if (data.sizes) data.sizes.forEach(size => formData.append('sizes', size));
        if (data.colors) data.colors.forEach(color => formData.append('colors', color));
        if (data.images) data.images.forEach(image => formData.append('images', image));

        const response = await api.post('/products/createProduct', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    async updateProduct(id: string, data: Partial<CreateProductData>): Promise<{ success: boolean; product: Product }> {
        const response = await api.put(`/products/${id}`, data);
        return response.data;
    },

    async deleteProduct(id: string): Promise<{ success: boolean; message: string }> {
        const response = await api.delete(`/products/${id}`);
        return response.data;
    },

    async updateStock(id: string, stock: number): Promise<{ success: boolean; product: Product }> {
        const response = await api.patch(`/products/${id}/stock`, { stock });
        return response.data;
    }
};


