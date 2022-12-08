import { FC } from 'react';
import { trpc } from '../utils/trpc';
import styles from '../styles/FavouriteButton.module.css';

type Props = {
  id: string;
};

export const FavouriteButton: FC<Props> = ({ id }) => {
  const utils = trpc.useContext();
  const deleteMutation = trpc.favourites.removeFavorite.useMutation({
    onSettled: () => {
      utils.invalidate();
    },
  });

  const addMutation = trpc.favourites.addNewFavorite.useMutation({
    onSettled: () => {
      utils.invalidate();
    },
  });

  const { data, isLoading } = trpc.favourites.getFav.useQuery(id);

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
        {
          !data ? handleAdd(id) : handleDelete(id);
        }
      }}
      className={
        data
          ? `${styles.card__favoritesIconActive}`
          : `${styles.card__favoritesIcon}`
      }
    ></button>
  );
};
