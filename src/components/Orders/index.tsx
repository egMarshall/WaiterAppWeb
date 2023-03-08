import { useState, useEffect } from "react";

import { Order } from "../../Types/Order";

import { OrderBoard } from "../OrderBoard";
import { Container } from "./styles";
import { ordersMock } from "../../mocks/orders";
import { api } from "../../utils/api";

export function Orders(){
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api.get('/orders')
      .then(( {data} ) => {
        console.log(data)
        setOrders(data);
    });

  },[]);

  const watingOrders = orders.filter(order => order.status === 'WAITING');
  const inProductionOrders = orders.filter(order => order.status === 'IN_PRODUCTION');
  const readyOrders = orders.filter(order => order.status === 'DONE');

  function handleCancelOrder(orderId: string) {
    setOrders(prevState => prevState.filter(order => order._id !== orderId));
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']) {
    setOrders(prevState => prevState.map(order => (
      order._id === orderId
        ? { ...order, status }
        : order
    )));
  }

  return (
    <Container>
      <OrderBoard
        icon="🕒"
        title="Fila de Espera"
        orders={watingOrders}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />
      <OrderBoard
        icon="🧑‍🍳"
        title="Em Preparo"
        orders={inProductionOrders}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />
      <OrderBoard
        icon="✅"
        title="Pronto"
        orders={readyOrders}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />
    </Container>
  );
}
