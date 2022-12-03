import { PhoneDetails } from '@prisma/client';
import { FC } from 'react';
import typography from '../styles/Typography.module.css';
import styles from '../styles/TechSpecs.module.css';
import classNames from 'classnames';

type Props = {
  phone: PhoneDetails;
};

const requiredKeys: Partial<keyof PhoneDetails>[] = [
  'screen',
  'resolution',
  'processor',
  'ram',
  'capacity',
  'camera',
  'zoom',
  'cell',
];

export const TechSpecs: FC<Props> = ({ phone }) => {
  return (
    <article>
      <h1 className={classNames(typography.h3, styles.title)}>Tech specs</h1>
      <div className={styles.divider}></div>
      <ul className={styles.list}>
        {requiredKeys.map((key) => (
          <li key={key} className={styles.listItem}>
            <div className={classNames(styles.name, typography.bodyText)}>
              {key}
            </div>
            <div className={typography.bodyText}>
              {Array.isArray(phone[key])
                ? (phone[key] as string[]).join(', ')
                : (phone[key] as string)}
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
};
