import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <div className="container">
      <header className={clsx('hero', styles.hero)}>
        <h1 className={styles.tagline}>{siteConfig.tagline}</h1>
        <div className={styles.buttons}>
          <Link
            className={clsx('button button--primary button--lg', styles.cta)}
            to="/docs/getting-started/core-concepts"
          >
            Get Started
          </Link>
          <Link
            className={clsx('button button--secondary button--lg', styles.cta)}
            to="/docs/why-code-shaper"
          >
            Why Code Shaper
          </Link>
        </div>
        <img src="/img/screenshot.png" alt="Screenshot" />
      </header>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
