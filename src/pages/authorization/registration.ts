import * as Handlebars from 'handlebars';
import template from './registration-template.hbs?raw';
import {IDS, PAGES} from '@/constants';
import type { IFormState, IRegistrationForm } from '@/types';
import styles from './styles.module.pcss';

export const GetRegistrationPage = (state: IFormState<IRegistrationForm>) => {
    const content = Handlebars.compile(template);
    return content({
        styles,
        state,
        buttonsId: IDS.FORM_BUTTONS_ID,
        btn_type_auth: PAGES.AUTHORIZATION,
        btn_type_reg: PAGES.REGISTRATION,
    });
};
