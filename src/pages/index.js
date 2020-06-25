import React, { useMemo } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { buildTranslator } from '../lib/i18n';
import styles from './index.module.css';

export default () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "family.png" }) {
        childImageSharp {
          fluid(maxHeight: 545) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  const t = useMemo(() => buildTranslator('home'), []);
  return (
    <Layout>
      <SEO title={t('title')} />
      <div className={styles.meetJanie}>{t('meetJanie')}</div>
      <div className={styles.mainAboutContainer}>
        <div className={styles.mainAboutText}>
          <h3>Janie Seguí Rodriguez - Candidate for City Council in Pawtucket’s Ward 5 District</h3>
          <strong>{t('background')}</strong>
          <p>{t('aboutP1')}</p>
          <p>{t('aboutP2')}</p>
          <p>{t('aboutP3')}</p>
          <p>{t('aboutP4')} <strong>{t('aboutP4Strong')}</strong></p>
        </div>
        <Img className={styles.familyImage} fluid={data.placeholderImage.childImageSharp.fluid} />
      </div>
    </Layout>
  );
};
