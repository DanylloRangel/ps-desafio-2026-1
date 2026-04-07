import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Image src="/assets/images/logo.png" alt="Logo" width={100} height={100} />
        <div className ={styles.headerLinks}>
            <Link className={styles.headerLink} href= "#products">Produtos</Link>
            <Link className={styles.headerLink} href="/">Categorias</Link>
            <Link className={styles.headerLink} href="/">Sobre nós</Link>
            <Link className={styles.headerLink} href="/">Contato</Link>
        </div>
      </div>
    </header>
  );
}