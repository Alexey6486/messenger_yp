import * as Handlebars from 'handlebars';
import template from './login-template.hbs?raw';
import { IDS, PAGES } from '@/constants';
import type { IFormState, ILoginForm } from '@/types';
import styles from '../styles.module.pcss';

export const GetLoginPage = (state: IFormState<ILoginForm>) => {
    const content = Handlebars.compile(template);
    return content({
        styles,
        state,
        buttonsId: IDS.FBT,
        formId: IDS.FLG,
        btn_type_auth: PAGES.AUTHORIZATION,
        btn_type_reg: PAGES.REGISTRATION,
    });
};
