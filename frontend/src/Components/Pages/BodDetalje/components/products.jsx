import styles from "./products.module.scss";

export const Products = ({ title }) => {
  const products = [
    {
      subtitle: "Gulerødder",
      price: 25,
      unit: "kr/bundt",
    },
    {
      subtitle: "Spinat",
      price: 20,
      unit: "kr/pose",
    },
    {
      subtitle: "Æbler",
      price: 40,
      unit: "kr/kg",
    },
    {
      subtitle: "Basilikum",
      price: 15,
      unit: "kr/potte",
    },
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.productsGrid}>
        {products.map((product) => (
          <article className={styles.productCard} key={product.subtitle}>
            <h3 className={styles.productName}>{product.subtitle}</h3>

            <p className={styles.productPrice}>
              {product.price} {product.unit}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
};
