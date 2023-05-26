import Products from '@/features/products/Products';
import { wrapper } from '@/store/store';
import { fetchProducts } from '@/features/products/productsThunks';

export default function Home() {
  return (
    <>
      <Products />
    </>
  );
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await store.dispatch(fetchProducts());
  return { props: {} };
});
