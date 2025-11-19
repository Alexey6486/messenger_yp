import * as Handlebars from 'handlebars';
import template from './login-template.hbs?raw';
import { PAGES } from '../../constants';
import type { ILoginState } from '../../types';
import styles from './styles.module.pcss';

export const GetLoginPage = (state: ILoginState) => {
    const content = Handlebars.compile(template);
    return content({
        styles,
        state,
        page: PAGES.REGISTRATION,
    });
};
