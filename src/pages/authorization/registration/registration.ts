import * as Handlebars from 'handlebars';
import template from './registration-template.hbs?raw';
import {IDS, PAGES} from '@/constants';
import type { IFormState, IRegistrationFormUi } from '@/types';
import styles from '../styles.module.pcss';

export const GetRegistrationPage = (state: IFormState<IRegistrationFormUi>) => {
    const content = Handlebars.compile(template);
    return content({
        styles,
        state,
        buttonsId: IDS.FORM_BUTTONS_ID,
        formID: IDS.FORM_REGISTRATION_ID,
        btn_type_auth: PAGES.AUTHORIZATION,
        btn_type_reg: PAGES.REGISTRATION,
    });
};
