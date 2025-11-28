import * as Handlebars from 'handlebars';
import template from './modal-template.hbs?raw';
import { PARTIALS_TYPES } from '@/constants';
import type { IModalState, TModalFields } from '@/types';

export const GetModal = (state: IModalState<TModalFields>, partialName: string) => {
    const content = Handlebars.compile(template);
    return content({
        state,
        partialName,
        partialType: PARTIALS_TYPES.MODAL,
    });
};
