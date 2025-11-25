import * as Handlebars from 'handlebars';
import template from './main-template.hbs?raw';
import type { IMainPageState } from '@/types';
import { formatContentLength } from '@/pages/main/utils/utils';
import { DATASET, ICONS, IDS } from '@/constants';
import styles from './styles.module.pcss';

export const GetMainPage = (state: IMainPageState) => {
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
            direction: 'bottom left',
            icon: ICONS.DOTS,
            options: [
                {
                    id: '1',
                    text: 'Добавить пользователя',
                    icon: ICONS.PLUS,
                },
                {
                    id: '2',
                    text: 'Удалить пользователя',
                    icon: ICONS.CROSS,
                },
            ],
        },
        ddBottom: {
            id: 'ddBottom',
            dataset: DATASET.DD,
            buttonText: 'T',
            direction: 'top right',
            icon: ICONS.PAPERCLIP,
            options: [
                {
                    id: '1',
                    text: 'Фото или видео',
                    icon: ICONS.PHOTO,
                },
                {
                    id: '2',
                    text: 'Файл',
                    icon: ICONS.FILE,
                },
                {
                    id: '3',
                    text: 'Локация',
                    icon: ICONS.CENTER,
                },
            ],
        },
    });
};
