import { useParams } from "react-router";
import { Link } from "react-router";
import { BodHeader } from "./components/header";
import { Products } from "./components/products";
import styles from "./BodDetalje.module.scss";

export default function BodDetalje() {
  const { id } = useParams();

  // Midlertidig fake data
  const fakeBooths = {
    1: {
      name: "Jens' Grøntsager",
      address: "Grønnevej 12",
      distance: 2.5,
    },
    2: {
      name: "Marias Frugt",
      address: "Æblevej 8",
      distance: 4.1,
    },
    3: {
      name: "Lokal Vejbod",
      address: "Markvej 22",
      distance: 6.3,
    },
  };

  const bod = fakeBooths[id] || {
    name: "Ukendt Bod",
    address: "Ingen adresse",
    distance: 0,
  };

  return (
    <div className={styles.BodDetalje}>
      <header className={styles.BodDetaljeHeader}>
        <Link className={styles.Btn + " " + styles.BtnSecondary} to="/forside">
          Tilbage
        </Link>
      </header>

      <main className={styles.BodDetaljeMain}>
        <BodHeader
          title={bod.name}
          isOpen={true}
          isClosed={false}
          adresse={bod.address}
          distance={bod.distance}
        />

        <section className={styles.BodDetaljeSection}>
          <Products title="Produkter" />
        </section>
      </main>
    </div>
  );
}
