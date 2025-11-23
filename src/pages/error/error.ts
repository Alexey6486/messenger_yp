import * as Handlebars from 'handlebars';
import template from './error-template.hbs?raw';
import type { IErrorPageState } from '@/types';
import { IDS } from "@/constants";
import styles from './styles.module.pcss';

export const GetErrorPage = (state: IErrorPageState) => {
    const content = Handlebars.compile(template);
    return content({
        styles,
        state,
        buttonsId: IDS.ERROR_RETURN_ID,
    });
};
