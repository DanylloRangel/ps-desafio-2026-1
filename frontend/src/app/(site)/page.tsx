import Banner from "./_components/Banner";
import Categories from "./_components/Categories";
import Products from "./_components/Products";

export default async function Home() {
  return (
    <>
      <Banner />
      <Categories />
      <Products />
    </>
  );
}