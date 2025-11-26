import * as Handlebars from 'handlebars';
import template from './profile-template.hbs?raw';
import type { IProfilePageState } from '@/types';
import { DATASET, ICONS } from '@/constants';
import styles from './styles.module.pcss';

export const GetProfilePage = (state: IProfilePageState | null) => {
    const content = Handlebars.compile(template);
    return content({
        styles,
        state,
        icons: {
            arrowLeft: ICONS.ARROW_LEFT,
        },
        pageLinks: {
            main: DATASET.PAGE_LINK,
        },
    });
};
