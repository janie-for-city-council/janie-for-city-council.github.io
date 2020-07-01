import React, { useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { buildTranslator } from '../lib/i18n';
import styles from './index.module.css';

export default (props) => {
  const data = useStaticQuery(graphql`
    query {
      family: file(relativePath: { eq: "family.jpg" }) {
        childImageSharp {
          fluid(maxHeight: 960) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      janie1: file(relativePath: { eq: "janie1.png" }) {
        childImageSharp {
          fluid(maxHeight: 545) {
            ...GatsbyImageSharpFluid
          }
        }
      }
      janie2: file(relativePath: { eq: "janie2.png" }) {
        childImageSharp {
          fluid(maxHeight: 410) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  const t = useMemo(() => buildTranslator(props.pageContext.locale, 'home'), [props.pageContext.locale]);
  return (
    <Layout locale={props.pageContext.locale} location={props.location}>
      <SEO title={t('title')} />
      <h1>{t('meetJanie')}</h1>
      <div className={styles.row}>
        <div className={styles.cell2x}>
          <h3>{t('backgroundIntro')}</h3>
          <p><strong>{t('background')}</strong></p>
          <p>{t('aboutP1')}</p>
          <p>{t('aboutP2')}</p>
        </div>
        <Img className={styles.cell1x} fluid={data.family.childImageSharp.fluid} />
      </div>
      <div className={styles.row}>
        <Img className={styles.cell1x} fluid={data.janie1.childImageSharp.fluid} />
        <div className={styles.cell2x}>
          <p>{t('aboutP3')}</p>
          <p>{t('aboutP4')} <strong>{t('aboutP4Strong')}</strong></p>
        </div>
      </div>
      <div className={styles.quoteContainer}>
        <div className={styles.quote}>
          <div className={styles.quoteText}>
            "{t('quote')}"
          </div>
          <div className={styles.quoteImage}>
            <Img fluid={data.janie2.childImageSharp.fluid} />
          </div>
        </div>
      </div>
    </Layout>
  );
};
