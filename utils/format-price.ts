const formatPrice = (amount: number | null) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount! / 100);
};

export default formatPrice;
