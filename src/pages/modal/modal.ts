import * as Handlebars from 'handlebars';
import template from './modal-template.hbs?raw';
import { PARTIALS_TYPES } from '@/constants';
import styles from './styles.module.pcss';

export const GetModal = (state: any, partialName: string) => {
    const content = Handlebars.compile(template);
    return content({
        styles,
        state,
        partialName,
        partialType: PARTIALS_TYPES.MODAL,
    });
};
