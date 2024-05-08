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

function QuotesSection() {
  return (
    <div className="container">
      <section className={clsx('centered-column', styles.quotesSection)}>
        <p className={styles.quote}>
          “Code Shaper is a companion for engineers seeking excellence in their
          craft. It ensures consistency and upholds best practices, making it an
          indispensable asset for any development team.”
        </p>
        <div className="avatar">
          <a
            className="avatar__photo-link avatar__photo avatar__photo--sm"
            href="https://stevehaar.com/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <img
              alt="Steve Haar Profile"
              src="https://avatars.githubusercontent.com/u/2460465?s=460"
            />
          </a>
          <div className="avatar__intro">
            <p className={styles.quoteBy}>
              Steve Haar, Senior Software Engineer
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function GetStartedSection() {
  return (
    <div className="container">
      <section className={clsx('centered-column', styles.getStartedSection)}>
        <Link
          className={clsx('button button--primary button--lg', styles.cta)}
          to="/docs/getting-started/core-concepts"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={siteConfig.title} description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <QuotesSection />
        <HomepageFeatures />
        <GetStartedSection />
      </main>
    </Layout>
  );
}
