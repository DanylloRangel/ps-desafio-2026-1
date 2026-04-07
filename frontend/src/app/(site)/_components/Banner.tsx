import Image from "next/image";
import styles from "./Banner.module.css";

export default function Banner() {
  return (
    <section className={styles.container}>
      <Image className={styles.bannerImage} src="/assets/images/banner1.png" alt="Banner" fill />
    </section>
  );
}