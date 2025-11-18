import * as Handlebars from 'handlebars';
import template from './login.html?raw';
import styles from './styles.module.pcss';

export const GetLoginPage = (state) => {
    const content = Handlebars.compile(template);
    console.log({ styles, state });
    return content({
        styles,
        state,
    });
};
