import Stripe from 'stripe';
import Product from '@/app/components/Product';

const getProducts = async () => {
  const stripe = new Stripe(process.env.STRIPE_SECRET as string, {
    apiVersion: '2022-11-15',
  });

  const products = await stripe.products.list();

  const productWithPrices = await Promise.all(
    products.data.map(async (product) => {
      const prices = await stripe.prices.list({ product: product.id });
      return {
        id: product.id,
        name: product.name,
        price: prices.data[0].unit_amount,
        image: product.images[0],
        currency: prices.data[0].currency,
      };
    }),
  );

  return productWithPrices;
};

export default async function Home() {
  const products = await getProducts();

  return (
    <main>
      {products.map((product) => (
        <Product
          key={product.id}
          name={product.name}
          image={product.image}
          price={product.price}
        />
      ))}
    </main>
  );
}
