import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import styles from "./header.module.css"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import c from "classnames"

const Header = ({ siteTitle }) => {
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
  `)
  return (
    <>
      <header className={styles.container}>
        <Link to="/" className={styles.logo}>
          <Img className={styles.logoImage} fluid={data.placeholderImage.childImageSharp.fluid} />
        </Link>
        <div className={c({ [styles.links]: true, [styles.overlay]: menuOpen })}>
          <div className={styles.linksList}>
            <div className={styles.menuClose} tabindex="0" role="button" ariaPressed="false" onClick={() => setMenuOpen(false)}>
              <FontAwesomeIcon icon={faTimes} size="2x" color="white" />
            </div>
            <Link className={c(styles.big, styles.contribute)} to="/contribute">Contribute</Link>
            <Link to="/about">About</Link>
            <Link to="/issues">Issues</Link>
            <Link to="/news">News</Link>
            <Link to="/covid-19">COVID-19</Link>
            <Link to="/vote">Vote</Link>
            <Link className={c(styles.big, styles.volunteer)} to="/volunteer">Volunteer</Link>
          </div>
        </div>
        <div className={styles.bars} tabindex="0" role="button" ariaPressed="false" onClick={() => setMenuOpen(true)}>
          <FontAwesomeIcon icon={faBars} size="2x" color="white" />
        </div>
      </header>
    </>
  )
}

export default Header
