import Layout from "../../components/Layout/Layout";
import InventoryBrowser from "../../components/Inventory/InventoryBrowser";
import { Inventory } from "../../constants/inventory";

export default function CarsPage() {
  return (
    <Layout title="Inventory" description={`Browse all ${Inventory.length} cars in stock at CarMania.`}>
      <section className="page-head container-x">
        <span className="eyebrow">Inventory</span>
        <h1>Cars for sale</h1>
        <p>
          Every vehicle is inspected, priced transparently and ready for a test drive at our
          Nairobi showroom.
        </p>
      </section>
      <section className="container-x">
        <InventoryBrowser />
      </section>
    </Layout>
  );
}
