import * as React from 'react';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
// import BoxIcon from '@material-ui/icons/AllInboxOutlined';
import UserIcon from '@material-ui/icons/People';
import FolderIcon from '@material-ui/icons/Folder';
import { FilterList, FilterListItem } from 'react-admin';
import {
    endOfYesterday,
    startOfWeek,
    subWeeks,
    startOfMonth,
    subMonths,
} from 'date-fns';

import { Folder, User } from '../types';
// import { PLACE, isOutward, OUTBOX_FIELD_NAME, INBOX_FIELD_NAME } from '../folders/commonFolders';

export const DateOfCreateFilter = () => (
    <FilterList label="resources.messages.fields.sentAt" icon={<AccessTimeIcon />}>
        <FilterListItem
            label="spell.today"
            value={{
                sentAt_gte: endOfYesterday().toISOString(),
                sentAt_lte: undefined,
            }}
        />
        <FilterListItem
            label="spell.thisWeek"
            value={{
                sentAt_gte: startOfWeek(new Date()).toISOString(),
                sentAt_lte: undefined,
            }}
        />
        <FilterListItem
            label="spell.lastWeek"
            value={{
                sentAt_gte: subWeeks(startOfWeek(new Date()), 1).toISOString(),
                sentAt_lte: startOfWeek(new Date()).toISOString(),
            }}
        />
        <FilterListItem
            label="spell.thisMonth"
            value={{
                sentAt_gte: startOfMonth(new Date()).toISOString(),
                sentAt_lte: undefined,
            }}
        />
        <FilterListItem
            label="spell.lastMonth"
            value={{
                sentAt_gte: subMonths(startOfMonth(new Date()),1).toISOString(),
                sentAt_lte: startOfMonth(new Date()).toISOString(),
            }}
        />
        <FilterListItem
            label="spell.last2Month"
            value={{
                sentAt_gte: undefined,
                sentAt_lte: subMonths(startOfMonth(new Date()),1).toISOString(),
            }}
        />
    </FilterList>
);

export const FolderFilter = ({ folders }: {folders: Folder[]}) => {
    return (
        <FilterList
            label="spell.folders"
            icon={<FolderIcon />}
        >
            {folders && folders.map(fold => (
                <FilterListItem
                    key={fold.id}
                    label={fold.name}
                    value={ {folder: fold.id }}
                />
            ))}
        </FilterList>
    );
};
//                    value={ fold.place === PLACE.delete ? {folder_id: fold.id, inbox_id: fold.id }
// :isOutward(fold.place) ? { folder_id: fold.id }: { inbox_id: fold.id }}


export const UserFilter = ({users/* , filterValues */}: {users: User[]/* , filterValues?: object */}) => {
    // const isOutward = filterValues && Reflect.has(filterValues, OUTBOX_ID_FIELD_NAME);
    // const isInward = filterValues && Reflect.has(filterValues, INBOX_ID_FIELD_NAME);
    return (
        <FilterList
            label="spell.users"
            icon={<UserIcon />}
        >
            {users && users.map(user => (
                <FilterListItem
                    key={user.id}
                    label={user.username}
                    value={{ user: user.id }}
                />
            ))}
        </FilterList>
    );
};
// value={isOutward ? { user_id: user.id }: isInward ? { to_id: user.id }: {user_id: user.id, to_id: user.id}}
