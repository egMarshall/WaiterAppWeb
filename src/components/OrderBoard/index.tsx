import { useState } from 'react';

import { toast } from 'react-toastify';

import { Order } from '../../Types/Order';
import { api } from '../../utils/api';
import { OrderModal } from '../OrderModal';
import { Board, OrdersContainer } from './styles';

interface OrderBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onOrderStatusChange: (orderId: string, status: Order['status']) => void;
}

export function OrderBoard({ icon, title, orders, onCancelOrder, onOrderStatusChange }: OrderBoardProps) {
  const [modalVisibility, setModalVisibilty] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order) {
    setModalVisibilty(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setModalVisibilty(false);
    setSelectedOrder(null);
  }

  async function handleCancelOrder() {
    setIsLoading(true);

    await api.delete(`/orders/${selectedOrder?._id}`)

    toast.success(`Pedido da mesa ${selectedOrder?.table} cancelado com sucesso!`);

    onCancelOrder(selectedOrder!._id);
    setIsLoading(false);
    setModalVisibilty(false);
  }

  async function handleChangeOrderStatus() {
    setIsLoading(true);

    const status = selectedOrder?.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';

    await api.patch(`/orders/${selectedOrder?._id}`, { status });

    toast.success(`Status da mesa ${selectedOrder?.table} atualizado com sucesso!`);
    onOrderStatusChange(selectedOrder!._id, status);
    setIsLoading(false);
    setModalVisibilty(false);
  }

  return (
    <Board>
      <OrderModal
        visible={modalVisibility}
        order={selectedOrder}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        isLoading={isLoading}
        onChangeOrderStatus={handleChangeOrderStatus}
      />

    <header>
      <span>{icon}</span>
      <strong>{title}</strong>
      <span>({orders.length})</span>
    </header>

    {orders.length > 0 && (
      <OrdersContainer>
      {orders.map((order: Order) =>(
        <button type="button" key={order._id} onClick={() => handleOpenModal(order)}>
          <strong>Mesa {order.table}</strong>
          <span>{order.products.length} itens</span>
        </button>
      ))}
    </OrdersContainer>
    )}
  </ Board>
  )
}
