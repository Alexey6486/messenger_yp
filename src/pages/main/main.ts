import * as Handlebars from 'handlebars';
import template from './main-template.hbs?raw';
import type { IMainPageState } from '@/types';
import { formatContentLength } from "@/pages/main/utils";
import { DATASET, IDS } from '@/constants';
import styles from './styles.module.pcss';

export const GetMainPage = (state: IMainPageState, openedDropDownId: string | null) => {
    const content = Handlebars.compile(template);
    return content({
        styles,
        state,
        fnc: formatContentLength,
        chatsId: IDS.CHATS_LIST_ID,
        dataset: DATASET.CHAT,
        ddTop: {
            id: 'ddTop',
            dataset: DATASET.DD,
            buttonText: 'M',
            openedDropDownId,
            direction: 'bottom',
            options: [
                {
                    id: '1',
                    text: 'opt t1',
                },
                {
                    id: '2',
                    icon: '',
                    text: 'opt t2',
                },
            ],
        },
        ddBottom: {
            id: 'ddBottom',
            dataset: DATASET.DD,
            buttonText: 'T',
            openedDropDownId,
            direction: 'top',
            options: [
                {
                    id: '1',
                    text: 'opt b1',
                },
            ],
        },
    });
};
