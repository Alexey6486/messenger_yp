import * as Handlebars from 'handlebars';
import template from './main-template.hbs?raw';
import type { IMainPageState } from '@/types';
import styles from './styles.module.pcss';

export const GetMainPage = (state: IMainPageState) => {
    const content = Handlebars.compile(template);
    return content({
        styles,
        state,
    });
};
