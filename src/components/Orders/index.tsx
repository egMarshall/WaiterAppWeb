import { Order } from "../../Types/Order";
import { OrderBoard } from "../OrderBoard";
import { Container } from "./styles";
import { ordersMock } from "../../mocks/orders";



export function Orders(){
  return (
    <Container>
      <OrderBoard
        icon="🕒"
        title="Fila de Espera"
      />
      <OrderBoard
        icon="🧑‍🍳"
        title="Em Preparo"
      />
      <OrderBoard
        icon="✅"
        title="Pronto"
      />
    </Container>
  );
}
