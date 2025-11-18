import * as Handlebars from 'handlebars';
import template from './login-template.hbs?raw';
import { EPages } from '../../enum';
import styles from './styles.module.pcss';

export const GetLoginPage = (state) => {
    const content = Handlebars.compile(template);
    console.log({ styles, state });
    return content({
        styles,
        state,
        page: EPages.REGISTRATION,
    });
};
