import * as Handlebars from 'handlebars';
import template from './profile-template.hbs?raw';
import type { IProfilePageState } from '@/types';
import { DATASET, ICONS, IDS } from '@/constants';
import styles from './styles.module.pcss';

export const GetProfilePage = (state: IProfilePageState | null) => {
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
            arrowLeft: ICONS.ARROW_LEFT,
        },
        pageLinks: {
            main: DATASET.PAGE_LINK,
        },
    });
};
