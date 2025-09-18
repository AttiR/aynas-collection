// Use environment variable for API URL, with fallbacks for different environments
const API_BASE_URL = process.env.REACT_APP_API_URL ||
                     (process.env.NODE_ENV === 'production'
                       ? 'https://aynas-collection-api.azurewebsites.net/api'
                       : 'http://localhost:5136/api');

export interface CartItemDto {
  productId: number;
  quantity: number;
  unitPrice: number;
  size?: string;
  color?: string;
}

export interface CheckoutRequest {
  items: CartItemDto[];
  shippingFirstName: string;
  shippingLastName: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZipCode: string;
  shippingCountry: string;
  shippingPhone: string;
  notes?: string;
}

export interface PaymentIntentRequest {
  amount: number;
  orderNumber: string;
}

export interface PaymentIntentResponse {
  clientSecret: string;
  paymentIntentId: string;
}

export interface OrderDto {
  id: number;
  orderNumber: string;
  status: string;
  totalAmount: number;
  orderDate: string;
  orderItems: OrderItemDto[];
}

export interface OrderItemDto {
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

class PaymentService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  async createOrder(checkoutRequest: CheckoutRequest): Promise<OrderDto> {
    const response = await fetch(`${API_BASE_URL}/orders/checkout`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(checkoutRequest),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create order');
    }

    return response.json();
  }

  async createPaymentIntent(request: PaymentIntentRequest): Promise<PaymentIntentResponse> {
    const response = await fetch(`${API_BASE_URL}/orders/payment-intent`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to create payment intent');
    }

    return response.json();
  }

  async confirmPayment(orderNumber: string, paymentIntentId: string, status: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/orders/payment-confirmation`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({
        orderNumber,
        paymentIntentId,
        status,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to confirm payment');
    }
  }

  async getUserOrders(): Promise<OrderDto[]> {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch orders');
    }

    return response.json();
  }

  async getOrderById(orderId: number): Promise<OrderDto> {
    const response = await fetch(`${API_BASE_URL}/orders/${orderId}`, {
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to fetch order');
    }

    return response.json();
  }
}

export const paymentService = new PaymentService();
