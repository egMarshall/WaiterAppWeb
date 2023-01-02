import { Order } from '../../Types/Order';
import { Board, OrdersContainer } from './styles';

interface OrderBoardProps {
  icon: string;
  title: string;
  orders: Order[];
}

export function OrderBoard({ icon, title }: OrderBoardProps) {
  return (
    <Board>
    <header>
      <span>{icon}</span>
      <strong>{title}</strong>
      <span>(1)</span>
    </header>

    <OrdersContainer>
      <button type="button">
        <span>Mesa 2</span>
        <span>(2)</span>
      </button>
    </OrdersContainer>
  </ Board>
  )
}
