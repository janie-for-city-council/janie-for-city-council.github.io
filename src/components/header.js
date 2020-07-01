import Link from './link';
import React, { useState, useCallback, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import styles from './header.module.css';
import Img from 'gatsby-image';
import { useStaticQuery, graphql } from 'gatsby';
import c from 'classnames';
import { buildTranslator, changeLocale, getBasePath } from '../lib/i18n';

const Header = ({ locale }) => {
  const t = useMemo(() => buildTranslator(locale, 'header'), [locale]);
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
    const pathname = getBasePath(locale, window.location.pathname);
    changeLocale(locale === 'es' ? 'en' : 'es', pathname);
  }, [locale]);
  return (
    <>
      <header className={styles.container}>
        <Link to="/" locale={locale} className={styles.logo}>
          <Img className={styles.logoImage} fluid={data.placeholderImage.childImageSharp.fluid} />
        </Link>
        <div className={c({ [styles.links]: true, [styles.overlay]: menuOpen })}>
          <div className={styles.linksList}>
            <button className={styles.menuClose} onClick={() => setMenuOpen(false)}>
              <FontAwesomeIcon icon={faTimes} size="2x" color="white" />
            </button>
            <Link to="https://secure.actblue.com/donate/seguirodriguezward5" className={c(styles.big, styles.contribute)} locale={locale}>{t('contribute')}</Link>
            <Link to="/" locale={locale}>{t('about')}</Link>
            <Link to="/issues" locale={locale}>{t('issues')}</Link>
            <Link to="/news" locale={locale}>{t('news')}</Link>
            <Link to="/covid-19" locale={locale}>{t('covid19')}</Link>
            <Link to="/vote" locale={locale}>{t('vote')}</Link>
            <Link to="/volunteer" className={c(styles.big, styles.volunteer)} locale={locale}>{t('volunteer')}</Link>
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
