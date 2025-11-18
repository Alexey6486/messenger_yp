import * as Handlebars from 'handlebars';
import template from './registration-template.html?raw';
import styles from './styles.module.pcss';

export const GetRegistrationPage = (state) => {
    const content = Handlebars.compile(template);
    console.log({ styles, state });
    return content({
        styles,
        state,
    });
};
