import Link from './link';
import React, { useState, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './header.module.css';
import Img from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';
import c from 'classnames';
import { buildTranslator, i18n, changeLocale } from '../lib/i18n';

const Header = () => {
  const t = useMemo(() => buildTranslator('header'), []);
  const [menuOpen, setMenuOpen] = useState(false);
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "header-logo.png" }) {
        childImageSharp {
          fluid(maxHeight: 80) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);
  const onSwitchLanguage = useCallback(() => {
    changeLocale(i18n.locale === 'es' ? 'en' : 'es');
  }, []);
  return (
    <>
      <header className={styles.container}>
        <Link to="/" className={styles.logo}>
          <Img className={styles.logoImage} fluid={data.placeholderImage.childImageSharp.fluid} />
        </Link>
        <div className={c({ [styles.links]: true, [styles.overlay]: menuOpen })}>
          <div className={styles.linksList}>
            <button className={styles.menuClose} onClick={() => setMenuOpen(false)}>
              <FontAwesomeIcon icon={faTimes} size="2x" color="white" />
            </button>
            <Link className={c(styles.big, styles.contribute)} to="/contribute">{t('contribute')}</Link>
            <Link to="/about">{t('about')}</Link>
            <Link to="/issues">{t('issues')}</Link>
            <Link to="/news">{t('news')}</Link>
            <Link to="/covid-19">{t('covid19')}</Link>
            <Link to="/vote">{t('vote')}</Link>
            <Link className={c(styles.big, styles.volunteer)} to="/volunteer">{t('volunteer')}</Link>
            <button className={styles.switchLanguage} onClick={onSwitchLanguage}>
              {t('switchLanguage')}
            </button>
          </div>
        </div>
        <button className={styles.bars} onClick={() => setMenuOpen(true)}>
          <FontAwesomeIcon icon={faBars} size="2x" color="white" />
        </button>
      </header>
    </>
  )
}

export default Header;
