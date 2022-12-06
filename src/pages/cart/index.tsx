import { FC } from 'react';
import { trpc } from '../../utils/trpc';

const AddToCart: FC = () => {
  const cartMutation = trpc.cart.addItem.useMutation();
  const { data, isLoading } = trpc.cart.getCart.useQuery();
  const handleClick = () => {
    cartMutation.mutate({
      id: 'apple-iphone-11-64gb-black',
      quantity: 3,
    });
  };

  if (isLoading) {
    return <>Loading</>;
  }

  return (
    <>
      <p>{JSON.stringify(data)}</p>
      <button onClick={handleClick}>add to cart</button>
    </>
  );
};

export default AddToCart;
