import { OrderBoard } from "../OrderBoard";
import { Container } from "./styles";
import { ordersMock } from "../../mocks/orders";



export function Orders(){
  return (
    <Container>
      <OrderBoard
        icon="🕒"
        title="Fila de Espera"
        orders={ordersMock}
      />
      <OrderBoard
        icon="🧑‍🍳"
        title="Em Preparo"
        orders={[]}
      />
      <OrderBoard
        icon="✅"
        title="Pronto"
        orders={[]}
      />
    </Container>
  );
}
