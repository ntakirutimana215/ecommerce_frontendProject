import api from './api';

export interface DashboardStats {
    totalSales: number;
    totalOrders: number;
    totalUsers: number;
    totalProducts: number;
    revenue: number;
    orders: number;
}

export interface Order {
    _id: string;
    user: {
        _id: string;
        fullname: string;
        email: string;
    } | null;   
    items: Array<{
        product: {
            _id: string;
            name: string;
            price: number;
        } | null;
        quantity: number;
    }>;
    totalAmount: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}


export interface User {
    _id: string;
    fullname: string;
    email: string;
    userRole: string;
    createdAt: string;
}

export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    images: string[]; 
}

export interface RevenueData {
    date: string;
    revenue: number;
    orders: number;
}

export const dashboardService = {
    // Get dashboard statistics
    async getDashboardStats(): Promise<DashboardStats> {
        const response = await api.get('/dashboard/stats');
        return response.data;
    },

    // Get all orders
    async getAllOrders(): Promise<Order[]> {
        const response = await api.get('/order/all');
        return response.data;
    },

    // Update order status
// Update order status
        async updateOrderStatus(orderId: string, status: string): Promise<Order> {
        const response = await api.put(`/order/update-status/${orderId}`, { status }); // ✅ PUT
        return response.data;
        },

    // Get all users
    async getAllUsers(): Promise<User[]> {
        const response = await api.get('/users');
        return response.data.users;
    },

    // Get all products
    async getAllProducts(): Promise<Product[]> {
        const response = await api.get('/products');
        return response.data;
    },

    // Create product
    async createProduct(productData: Partial<Product>): Promise<Product> {
        const response = await api.post('/products', productData);
        return response.data.product;
    },

    // Update product
    async updateProduct(productId: string, productData: Partial<Product>): Promise<Product> {
        const response = await api.put(`/products/${productId}`, productData);
        return response.data.product;
    },

    // Delete product
    async deleteProduct(productId: string): Promise<{ message: string }> {
        const response = await api.delete(`/products/${productId}`);
        return response.data;
    },

    // Get revenue analytics
    async getRevenueAnalytics(): Promise<RevenueData[]> {
        const response = await api.get('/dashboard/revenue');
        return response.data;
    }
};

