import Item from "./item";
import { resources, planejamento, estatistica, inventario, solutions, reports } from "../menus";
const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16 text-sm">
      <Item Links={planejamento} title="Cadastros" />
      <Item Links={solutions} title="Soluções" />
      <Item Links={reports} title="Relatórios" />
      <Item Links={estatistica} title="Estatística" />
    </div>
  );
};

export default ItemsContainer;