import classNames from "classnames";
import { FC } from "react";
import { trpc } from "../utils/trpc";
import styles from '../styles/FavouriteButton.module.css';

type Props = {
  id: string,
  favorite: boolean,
  setFavorite: (type: boolean) => void;
}

export const FavouriteButton: FC<Props> = ({ id, favorite, setFavorite }) => {
  const addMutation = trpc.cart.addNewItem.useMutation();

  const handleAdd = (phoneId: string) => {
    addMutation.mutate(phoneId);
  };

  return (
    <button
      aria-label="add to favorites"
      onClick={() => {
        setFavorite(!favorite);
        handleAdd(id);
      }}
      className={classNames(`${styles.card__favoritesIcon}`, {
        card__favoritesIconActive: favorite,
      })}
    >
    </button>
  );
};