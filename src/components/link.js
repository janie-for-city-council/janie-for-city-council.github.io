import React from 'react';
import { Link } from 'gatsby';
import { getLocalizedPath } from '../lib/i18n';
export default (props) => <Link {...props} to={getLocalizedPath(props.to)} />;