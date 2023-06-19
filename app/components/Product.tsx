import Image from 'next/image';

type PageProps = {
  name: string;
  image: string;
  price: number | null;
};

export default function Product({ name, image, price }: PageProps) {
  return (
    <div>
      <Image src={image} alt={name} width={400} height={400} priority={true} />
      <h1>{name}</h1>
      <p>{price}</p>
    </div>
  );
}
