import * as Handlebars from 'handlebars';
import template from './registration-template.hbs?raw';
import { PAGES } from '../../constants';
import type { IRegistrationState } from '../../types';
import styles from './styles.module.pcss';

export const GetRegistrationPage = (state: IRegistrationState) => {
    const content = Handlebars.compile(template);
    return content({
        styles,
        state,
        page: PAGES.AUTHORIZATION,
    });
};
