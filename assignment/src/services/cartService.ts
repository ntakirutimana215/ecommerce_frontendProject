import api from './api';

export interface CartProduct {
    product: {
        _id: string;
        name: string;
        price: number;
        stock: number;
        images?: string[];
    };
    quantity: number;
    selectedSize?: string;
    selectedColor?: string;
}

export interface Cart {
    _id: string;
    user: string;
    products: CartProduct[];
    createdAt: string;
    updatedAt: string;
}

export const cartService = {
    async getCart(): Promise<Cart> {
        const response = await api.get('/cart');
        // Ensure products array exists and filter out any null products
        const cartData = response.data;
        if (cartData.products) {
            cartData.products = cartData.products.filter((item: CartProduct) => 
                item.product && item.product._id
            );
        }
        return cartData;
    },

    async addToCart(productId: string, quantity: number = 1): Promise<Cart> {
        const response = await api.post('/cart/add', { productId, quantity });
        return response.data;
    },

    async removeFromCart(productId: string): Promise<Cart> {
        const response = await api.delete(`/cart/${productId}`);
        return response.data;
    },

    async updateCartItem(productId: string, quantity: number): Promise<Cart> {
        const response = await api.put(`/cart/${productId}`, { quantity });
        return response.data;
    },

    async clearCart(): Promise<{ message: string }> {
        const response = await api.delete('/cart');
        return response.data;
    }
};