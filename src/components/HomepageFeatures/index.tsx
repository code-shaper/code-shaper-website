import styles from './styles.module.css';
import clsx from 'clsx';
import { CheckCheckIcon, FilesIcon, ZapIcon } from 'lucide-react';
import type { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react';
import React from 'react';

type ReactIconProps = SVGProps<SVGSVGElement>;
type ReactIconComponent = ForwardRefExoticComponent<
  Omit<ReactIconProps, 'ref'> & RefAttributes<SVGSVGElement>
>;

type FeatureItem = {
  title: string;
  Icon: ReactIconComponent;
  description: JSX.Element;
};

const featureList: FeatureItem[] = [
  {
    title: 'Speedy',
    Icon: ZapIcon,
    description: (
      <>
        Code Shaper saves you time whenever you start a new project. Build a
        robust starter repo in minutes and add more artifacts easily.
      </>
    ),
  },
  {
    title: 'Consistent',
    Icon: CheckCheckIcon,
    description: (
      <>
        By encapsulating best practices, the code you generate will be
        consistent and of high quality across projects and team members.
      </>
    ),
  },
  {
    title: 'Standardized',
    Icon: FilesIcon,
    description: (
      <>
        Team members joining your project will be immediately familiar with the
        folder structure, development & testing tools, and CI/CD pipeline.
        They’ll be productive faster.
      </>
    ),
  },
];

function Feature({ title, Icon, description }: FeatureItem) {
  return (
    <div className={styles.feature}>
      <div className={styles.featureTitleRow}>
        <Icon />
        <h3 className={styles.featureTitle}>{title}</h3>
      </div>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <div className="container">
      <section className={clsx('centered-column', styles.features)}>
        {featureList.map((props, idx) => (
          <Feature key={idx} {...props} />
        ))}
      </section>
    </div>
  );
}
