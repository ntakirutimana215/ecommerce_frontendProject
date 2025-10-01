import api from './api';

export interface OrderItem {
    product: string;
    quantity: number;
}

export interface Order {
    _id: string;
    user: string;
    items: OrderItem[];
    totalAmount: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export interface CreateOrderResponse {
    message: string;
    order: Order;
    skippedProducts?: string[];
}

export const orderService = {
    async createOrderFromCart(): Promise<CreateOrderResponse> {
        const response = await api.post('/order/create-from-cart');
        return response.data;
    },

    async getMyOrders(): Promise<Order[]> {
        const response = await api.get('/order/my-orders');
        return response.data;
    },

    async getAllOrders(): Promise<Order[]> {
        const response = await api.get('/order/all');
        return response.data;
    }
};

