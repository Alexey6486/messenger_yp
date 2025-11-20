import * as Handlebars from 'handlebars';
import template from './login-template.hbs?raw';
import { PAGES } from '@/constants';
import type { IFormState, ILoginForm } from '@/types';
import styles from './styles.module.pcss';

export const GetLoginPage = (state: IFormState<ILoginForm>) => {
    const content = Handlebars.compile(template);
    return content({
        styles,
        state,
        page: PAGES.REGISTRATION,
    });
};
