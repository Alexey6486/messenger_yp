import * as Handlebars from 'handlebars';
import template from './main-template.hbs?raw';
import type { IMainPageState } from '@/types';
import { formatContentLength } from "@/pages/main/utils";
import { DATASET, IDS } from '@/constants';
import styles from './styles.module.pcss';

export const GetMainPage = (state: IMainPageState) => {
    const content = Handlebars.compile(template);
    return content({
        styles,
        state,
        fnc: formatContentLength,
        chatsId: IDS.CHATS_LIST_ID,
        dataset: DATASET.CHAT,
    });
};
