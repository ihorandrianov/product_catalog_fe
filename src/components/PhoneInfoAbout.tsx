import React from 'react';
import typography from '../styles/Typography.module.css';
import classNames from 'classnames';
import styles from '../styles/TechSpecs.module.css';
import { PhoneDetails } from '@prisma/client';
import info from '../styles/PhoneInfoAbout.module.css';

type Props = {
  phone: PhoneDetails;
};

type Description = {
  title: string;
  text: string;
};

export const PhoneInfoAbout: React.FC<Props> = ({ phone }) => {
  return (
    <article>
      <h1 className={classNames(typography.h3, styles.title)}>About</h1>
      <div className={styles.divider}></div>
      {phone &&
        phone.description.map((description) => (
          <div key={description?.title} className={info.position}>
            <h3 className={info.infoTitle}>{description?.title}</h3>
            <div className={info.infoAbout}>{description?.text}</div>
          </div>
        ))}
    </article>
  );
};
