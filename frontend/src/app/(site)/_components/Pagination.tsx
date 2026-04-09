import styles from './Pagination.module.css';
import Link from "next/link";

export default function Pagination({ totalProducts, productPerPage, currentPage, setCurrentPage }: { totalProducts: number; productPerPage: number; currentPage: number; setCurrentPage: (page: number) => void }) {
    
    let pages: number[] = [];

    for(let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++){
        pages.push(i);
    }

    const previusPage = () => {
        if (currentPage > 1){

            setCurrentPage(currentPage - 1);
        }
    }

    const nextPage = () => {
        if (currentPage < pages.length){

            setCurrentPage(currentPage + 1);
        }

    }

    return (
        <div className={styles.container}>
            {currentPage > 1?(
                <button className={styles.prev} onClick={previusPage}>
                    <Link className={styles.Link} href= "#products">{'<'}</Link> 
                </button>
            ):(
                <button className={styles.prev} onClick={previusPage} disabled>{'<'} </button>
            )}
            <span className={styles.page}>{currentPage}</span>
            {currentPage < pages.length?(
                <button className={styles.next} onClick={nextPage}>
                    <Link className={styles.Link} href= "#products">{'>'}</Link>
                </button>
            ):(
                <button className={styles.next} onClick={nextPage} disabled>{'>'}</button>
            )}
        </div>
    );
}