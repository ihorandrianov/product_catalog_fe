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
  const utils = trpc.useContext();
  const deleteMutation = trpc.favourites.removeFavorite.useMutation({
    onSettled: () => {
      utils.invalidate()
    }
  });

  const addMutation = trpc.favourites.addNewFavorite.useMutation();

  const handleAdd = (phoneId: string) => {
    addMutation.mutate(phoneId);
  };

  const handleDelete = (phoneId: string) => {
    deleteMutation.mutate(phoneId);
  };

  return (
    <button
      aria-label="add to favorites"
      onClick={() => {
        setFavorite(!favorite);
        {favorite ? handleAdd(id) : handleDelete(id)}

      }}
      className={favorite ? `${styles.card__favoritesIconActive}` : `${styles.card__favoritesIcon}`}
    >
    </button>
  );
};