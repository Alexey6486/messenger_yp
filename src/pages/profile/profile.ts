import * as Handlebars from 'handlebars';
import template from './profile-template.hbs?raw';
import type { IProfilePageHbsState } from '@/types';
import { DATASET, ICONS, IDS, PARTIALS_TYPES } from '@/constants';
import styles from './styles.module.pcss';

export const GetProfilePage = (state: IProfilePageHbsState) => {
    const content = Handlebars.compile(template);
    return content({
        styles,
        state,
        isEditDisabled: !state?.isDataEdit,
        ids: {
            changeData: IDS.ACD,
            changePassword: IDS.ACP,
            logout: IDS.ALG,
            buttons: IDS.ABS,
            saveData: IDS.ASD,
            savePassword: IDS.ASP,
            cancel: IDS.ACL,
        },
        datasets: {
            account: DATASET.BTN,
        },
        icons: {
            arrowLeft: {
                partialName: ICONS.IconArrowLeft,
                partialType: PARTIALS_TYPES.ICON,
            },
        },
        pageLinks: {
            main: DATASET.PAGE_LINK,
        },
    });
};
