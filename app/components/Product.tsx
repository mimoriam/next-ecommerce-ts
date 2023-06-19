import Image from 'next/image';
import formatPrice from '@/utils/format-price';
import { ProductType } from '@/types/ProductType';

export default function Product({ name, image, price }: ProductType) {
  return (
    <div>
      <Image
        src={image}
        alt={name}
        width={400}
        height={400}
        priority={true}
        className="h-96 w-full rounded-lg object-cover"
      />
      <div className="py-2 font-medium">
        <h1>{name}</h1>
        <h2 className="text-primary text-sm">{formatPrice(price)}</h2>
      </div>
    </div>
  );
}
