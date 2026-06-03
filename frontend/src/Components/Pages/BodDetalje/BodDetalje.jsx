import { Link } from "react-router";
import { BodHeader } from "./components/header";
import { Products } from "./components/products";
import styles from "./BodDetalje.module.scss";

export default function BodDetalje() {
  return (
    <div className={styles.BodDetalje}>
      <header className={styles.BodDetaljeHeader}>
        <Link className={styles.Btn + " " + styles.BtnSecondary} to="/forside">
          Tilbage
        </Link>
      </header>
      <main className={styles.BodDetaljeMain}>
        <BodHeader
          title="Bod Detalje"
          isOpen={true}
          isClosed={false}
          adresse="123 Main Street"
          distance={5.2}
        />
        <section className={styles.BodDetaljeSection}>
          <Products title="Produkter" />
        </section>
      </main>
    </div>
  );
}
