import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/undraw_into_the_night.svg').default,
    description: (
      <>
        Code Shaper was designed from the ground up to be easily installed and
        get you up and running in minutes.
      </>
    ),
  },
  {
    title: 'Modular and Extensible',
    Svg: require('@site/static/img/undraw_building_blocks.svg').default,
    description: (
      <>
        Build a custom stack with the technologies you prefer. Choose from the
        many off-the-shelf plugins or roll out your own.
      </>
    ),
  },
  {
    title: 'Monorepo Friendly',
    Svg: require('@site/static/img/undraw_programming.svg').default,
    description: (
      <>
        Designed to support monorepo-based projects for developer productivity
        and enterprise-grade quality.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
