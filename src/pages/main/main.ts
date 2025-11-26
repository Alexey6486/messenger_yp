import * as Handlebars from 'handlebars';
import template from './main-template.hbs?raw';
import type { IMainPageState } from '@/types';
import { formatContentLength } from '@/pages/main/utils/utils';
import { DATASET, ICONS, IDS, PAGES, CLASSES } from '@/constants';
import styles from './styles.module.pcss';

export const GetMainPage = (state: IMainPageState) => {
    const content = Handlebars.compile(template);
    return content({
        styles,
        state,
        fnc: formatContentLength,
        chatsId: IDS.CHATS_LIST_ID,
        chatsDataset: DATASET.CHAT,
        messageDataset: DATASET.MESSAGE,
        profileBtnDataset: DATASET.PAGE_LINK,
        profileLink: CLASSES.PL,
        submit: {
            id: 'send-message',
            type: 'send-message',
            icon: ICONS.ARROW_RIGHT,
        },
        ddNav: {
            id: 'ddNav',
            dataset: DATASET.DD,
            direction: 'bottom right',
            icon: ICONS.DOTS,
            options: [
                {
                    id: PAGES.AUTHORIZATION,
                    text: 'Авторизация',
                    icon: '',
                    dataset: DATASET.OPTION,
                },
                {
                    id: PAGES.REGISTRATION,
                    text: 'Регистрация',
                    icon: '',
                    dataset: DATASET.OPTION,
                },
                {
                    id: PAGES.ERROR,
                    text: 'Страница ошибки',
                    icon: '',
                    dataset: DATASET.OPTION,
                },
            ],
        },
        ddTop: {
            id: 'ddTop',
            dataset: DATASET.DD,
            direction: 'bottom left',
            icon: ICONS.DOTS,
            options: [
                {
                    id: 'add-user',
                    text: 'Добавить пользователя',
                    icon: ICONS.PLUS,
                    dataset: DATASET.OPTION,
                },
                {
                    id: 'remove-user',
                    text: 'Удалить пользователя',
                    icon: ICONS.CROSS,
                    dataset: DATASET.OPTION,
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
                    id: 'photo',
                    text: 'Фото или видео',
                    icon: ICONS.PHOTO,
                    dataset: DATASET.OPTION,
                },
                {
                    id: 'file',
                    text: 'Файл',
                    icon: ICONS.FILE,
                    dataset: DATASET.OPTION,
                },
                {
                    id: 'location',
                    text: 'Локация',
                    icon: ICONS.CENTER,
                    dataset: DATASET.OPTION,
                },
            ],
        },
    });
};
