import * as Handlebars from 'handlebars';
import template from './main-template.hbs?raw';
import type { IMainPageState } from '@/types';
import { formatContentLength } from '@/pages/main/utils/utils';
import { DATASET, ICONS, IDS, PAGES, CLASSES, DD_ACTIONS, PARTIALS_TYPES } from '@/constants';
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
        profileLink: CLASSES.PRL,
        submit: {
            id: 'send-message',
            type: 'send-message',
            icon: {
                partialName: ICONS.IconArrowRight,
                partialType: PARTIALS_TYPES.ICON,
            },
        },
        ddNav: {
            id: 'ddNav',
            dataset: DATASET.DD,
            direction: 'bottom right',
            icon: {
                partialName: ICONS.IconDots,
                partialType: PARTIALS_TYPES.ICON,
            },
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
            icon: {
                partialName: ICONS.IconDots,
                partialType: PARTIALS_TYPES.ICON,
            },
            options: [
                {
                    id: DD_ACTIONS.ADD_USER_MODAL,
                    text: 'Добавить пользователя',
                    icon: {
                        partialName: ICONS.IconPlus,
                        partialType: PARTIALS_TYPES.ICON,
                    },
                    dataset: DATASET.OPTION,
                },
                {
                    id: DD_ACTIONS.REMOVE_USER_MODAL,
                    text: 'Удалить пользователя',
                    icon: {
                        partialName: ICONS.IconCross,
                        partialType: PARTIALS_TYPES.ICON,
                    },
                    dataset: DATASET.OPTION,
                },
            ],
        },
        ddBottom: {
            id: 'ddBottom',
            dataset: DATASET.DD,
            buttonText: 'T',
            direction: 'top right',
            icon: {
                partialName: ICONS.IconPaperclip,
                partialType: PARTIALS_TYPES.ICON,
            },
            options: [
                {
                    id: 'photo',
                    text: 'Фото или видео',
                    icon: {
                        partialName: ICONS.IconPhoto,
                        partialType: PARTIALS_TYPES.ICON,
                    },
                    dataset: DATASET.OPTION,
                },
                {
                    id: 'file',
                    text: 'Файл',
                    icon: {
                        partialName: ICONS.IconFile,
                        partialType: PARTIALS_TYPES.ICON,
                    },
                    dataset: DATASET.OPTION,
                },
                {
                    id: 'location',
                    text: 'Локация',
                    icon: {
                        partialName: ICONS.IconCenter,
                        partialType: PARTIALS_TYPES.ICON,
                    },
                    dataset: DATASET.OPTION,
                },
            ],
        },
    });
};
