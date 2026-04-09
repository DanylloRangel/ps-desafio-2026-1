import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer id="footer" className={styles.footerArea}>
        <div className={styles.container}>
            <div className={styles.aboutSection}>
                <h3 className={styles.title}>Sobre nós</h3>
                <p className={styles.text}>
                    A Wolf Sport é a sua loja especializada em artigos esportivos. 
                    Nossa missão é entregar qualidade, estilo e performance para o seu jogo, 
                    seja no campo, na quadra ou na rua.
                </p>
            </div>

            <div className={styles.contactSection}>
                <h3 className={styles.title}>Contato</h3>
                <ul className={styles.list}>
                    <li><a>Instagram: </a><a className={styles.contactLink} href="/">@wolfsport</a></li>
                    <li><a>E-mail: </a><a className={styles.contactLink} href="/">suporte@wolfsport.com.br</a>
                    </li>
                </ul>
            </div>
        </div>
    </footer>
  );
}