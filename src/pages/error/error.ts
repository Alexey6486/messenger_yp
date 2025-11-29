import * as Handlebars from 'handlebars';
import template from './error-template.hbs?raw';
import { DATASET, IDS } from '@/constants';
import type { IErrorPageState } from '@/types';
import styles from './styles.module.pcss';

export const GetErrorPage = (state: IErrorPageState) => {
    const content = Handlebars.compile(template);
    return content({
        styles,
        state,
        buttonsId: IDS.ERR,
        dataset: DATASET.PAGE_LINK,
    });
};
