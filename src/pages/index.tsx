import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';

type QuoteItem = {
  name: string;
  title: string;
  imageUrl: string;
  profileUrl: string;
  quote: string;
};

const steveHaarQuote: QuoteItem = {
  name: 'Steve Haar',
  title: 'Senior Software Engineer',
  imageUrl: 'https://avatars.githubusercontent.com/u/2460465?s=460',
  profileUrl: 'https://stevehaar.com/',
  quote: `Code Shaper dramatically decreased the amount of time it
  took to build our large component library. Its templates minimize
  the learning curve for new engineers, allowing them to focus on
  innovation rather than worrying about consistency.`,
};

const chrisHassonQuote: QuoteItem = {
  name: 'Chris Hasson',
  title: 'Senior Software Engineer',
  imageUrl:
    'https://media.licdn.com/dms/image/D5603AQEkB2LR3p-jTA/profile-displayphoto-shrink_400_400/0/1677897564266?e=1720656000&v=beta&t=_auB-i7ap9DVFjArVJ8nYsc8IefTrddMbAu20gpWt3s',
  profileUrl: 'https://www.linkedin.com/in/christopherhasson/',
  quote: `Code Shaper is a companion for engineers seeking excellence
  in their craft. It ensures consistency and upholds best practices,
  making it an indispensable asset for any development team.`,
};

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
        <img
          className={styles.lightScreenshot}
          src="/img/screenshot.png"
          alt="Screenshot"
        />
        <img
          className={styles.darkScreenshot}
          src="/img/screenshot-dark-mode.png"
          alt="Screenshot"
        />
      </header>
    </div>
  );
}

function QuotesSection({
  name,
  title,
  imageUrl,
  profileUrl,
  quote,
}: QuoteItem) {
  return (
    <div className="container centered-column">
      <section className={styles.quotesSection}>
        <p className={styles.quote}>“{quote}”</p>
        <footer className={styles.quotedBy}>
          <div className="avatar text--center">
            <a
              className="avatar__photo-link avatar__photo"
              href={profileUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <img alt={`${name} Profile`} src={imageUrl} />
            </a>
            <div className="avatar__intro">
              <div className="avatar__name">{name}</div>
              <small className="avatar__subtitle">{title}</small>
            </div>
          </div>
        </footer>
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
        <QuotesSection {...steveHaarQuote} />
        <HomepageFeatures />
        <div className="spacer" />
        <QuotesSection {...chrisHassonQuote} />
        <GetStartedSection />
      </main>
    </Layout>
  );
}
