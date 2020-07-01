import React, { useMemo } from 'react';

import Layout from '../components/layout';
import SEO from '../components/seo';
import { buildTranslator } from '../lib/i18n';

export default (props) => {
  const t = useMemo(() => buildTranslator(props.pageContext.locale, 'vote'), [props.pageContext.locale]);
  return (
    <Layout locale={props.pageContext.locale} location={props.location}>
      <SEO title={t('title')} />
      <h1>{t('vote')}</h1>
    </Layout>
  );
};
