import classNames from "classnames";
import { FC } from "react";
import { trpc } from "../utils/trpc";
import styles from '../styles/CartButton.module.css';
import fonts from '../styles/Typography.module.css';

type Props = {
  id: string,
  added: boolean,
  setAdded: (type: boolean) => void;
}

export const CartButton: FC<Props> = ({ id, added, setAdded }) => {
  const addMutation = trpc.cart.addNewItem.useMutation();

  const handleAdd = (phoneId: string) => {
    addMutation.mutate(phoneId);
  };

  return (
    <button
      onClick={() => {
        setAdded(!added);
        handleAdd(id);
      }}
      className={classNames(`${fonts.buttons} ${styles.card__addToCart}`, {
        card__addToCartActive: added,
      })}
    >
      {added ? 'Added' : 'Add to cart'}
    </button>
  );
};