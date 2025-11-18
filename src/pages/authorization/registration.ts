import * as Handlebars from 'handlebars';
import template from './registration-template.hbs?raw';
import { EPages } from '../../enum';
import styles from './styles.module.pcss';

export const GetRegistrationPage = (state) => {
    const content = Handlebars.compile(template);
    console.log({ styles, state });
    return content({
        styles,
        state,
        page: EPages.AUTHORIZATION,
    });
};
