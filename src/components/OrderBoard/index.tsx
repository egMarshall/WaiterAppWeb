import { useState } from 'react';
import { Order } from '../../Types/Order';
import { OrderModal } from '../OrderModal';
import { Board, OrdersContainer } from './styles';

interface OrderBoardProps {
  icon: string;
  title: string;
  orders: Order[];
}

export function OrderBoard({ icon, title, orders }: OrderBoardProps) {
  const [modalVisibility, setModalVisibilty] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);

  function handleOpenModal(order: Order) {
    setModalVisibilty(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setModalVisibilty(false);
    setSelectedOrder(null);
  }

  return (
    <Board>
      <OrderModal
        visible={modalVisibility}
        order={selectedOrder}
        onClose={handleCloseModal}
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
