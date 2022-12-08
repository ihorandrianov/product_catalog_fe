import classNames from 'classnames';
import { FC } from 'react';
import { trpc } from '../utils/trpc';
import styles from '../styles/CartButton.module.css';
import fonts from '../styles/Typography.module.css';

type Props = {
  id: string;
};

export const CartButton: FC<Props> = ({ id }) => {
  const utils = trpc.useContext();
  const deleteMutation = trpc.cart.deleteItem.useMutation({
    onSettled: () => {
      utils.invalidate();
    },
  });

  const addMutation = trpc.cart.addNewItem.useMutation({
    onSettled: () => {
      utils.invalidate();
    },
  });

  const { data } = trpc.cart.isAdded.useQuery(id);

  const handleAdd = (phoneId: string) => {
    addMutation.mutate(phoneId);
  };

  const handleDelete = (phoneId: string) => {
    deleteMutation.mutate(phoneId);
  };
  return (
    <button
      onClick={() => {
        !data ? handleAdd(id) : handleDelete(id);
      }}
      className={classNames(
        `${fonts.buttons} ${styles.card__addToCart}`,
        data && styles.card__addToCartActive,
      )}
    >
      {data ? 'Added to cart' : 'Add to cart'}
    </button>
  );
};
