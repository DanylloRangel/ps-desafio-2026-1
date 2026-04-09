"use client";

import { api } from "@/services/api";
import { categoryType } from "@/types/category";
import { useEffect, useState } from "react";
import styles from "./Categories.module.css";
import { useRouter } from 'next/navigation';
import { useSearchParams } from "next/navigation";

export default function Categories() {
  const [categories, setCategories] = useState<categoryType[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCatergory = searchParams.get("category_id");

  useEffect(() => {
    async function getCategories() {
      const { response, error } = await api("GET", "/category");

      if (response) {
        setCategories(response as categoryType[]);
      } else {
        console.error(error?.message);
      }
    }
    getCategories();
  }, []);

  return (
    <section className="products" id="products">
      <div className={styles.container}>
        <h1 id="categorias" className={styles.title}>
          CATEGORIAS
        </h1>

        <div className={styles.productList}>
          <div className={styles.categoryCard} onClick={() => router.push("/", { scroll: false })}
            style={{ cursor: "pointer", border: !selectedCatergory ? "2px solid #3b82f6" : "none" }}
          >
            <h2>Todos</h2>
        </div>

        {categories.map((item) => (
          <div key={item.id} className={styles.categoryCard} onClick={() => router.push(`/?category_id=${item.id}`, {scroll:false})} 
              style={{ cursor: "pointer", border: selectedCatergory === String(item.id) ? "2px solid #3b82f6" : "none" }}
            >
              <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
} 