import React, { FC, Fragment, ReactElement } from 'react';
import { MenuItemLink, useQueryWithStore, useTranslate } from 'react-admin';
import MailIcon from '@material-ui/icons/Email';
import LoadingIcon from '@material-ui/icons/SubdirectoryArrowRight';
import ErrorIcon from '@material-ui/icons/Error';

import { Folder } from '../types';
import { PLACE, INBOX_FIELD_NAME, OUTBOX_FIELD_NAME} from '../folders/commonFolders';

const inwardFolders = [PLACE.inbox];
const outwardFolders = [PLACE.outbox, PLACE.draft];

interface Props {
  dense: boolean;
  sidebarIsOpen: boolean;
  onMenuClick: () => void;
  place: PLACE;
}

const MenuMail: FC<Props> = (props) => {
  const {sidebarIsOpen, dense, onMenuClick, place } = props;
  const searchField = place === PLACE.inbox ? INBOX_FIELD_NAME: OUTBOX_FIELD_NAME;
  const { loaded, error, data } = useQueryWithStore({
      type: 'getList',
      resource: 'folders',
      payload: {
        filter: {
            priority_gt: 0,
            metrics: searchField,
            place_or: place === PLACE.inbox ? inwardFolders: outwardFolders,
        },
      },
  });
  if (!loaded) { return <LoadingOrErrorItem {...props} icon={<LoadingIcon/>} name="spell.loading" />; }
  if (error || !data) { return <LoadingOrErrorItem {...props} icon={<ErrorIcon/>} name="spell.error" />; }
  // console.log('..zv: folders data:', searchField, place, data);

  return (
    <Fragment>
        { data.map((fold: Folder) => {
            return (
              <MenuItemLink
                  key={fold.id}
                  to={`/messages?filter=${JSON.stringify({folder: +fold.id})}`}
                  primaryText={fold.name}
                  leftIcon={< MailIcon />}
                  onClick={onMenuClick}
                  sidebarIsOpen={sidebarIsOpen}
                  dense={dense}
              />
            );
        })}
    </Fragment>
  );
}

interface LEProps extends Props {
  icon: ReactElement;
  name: string;
  to?: string;
}
const LoadingOrErrorItem: FC<LEProps> = (props: LEProps) => {
  const translate = useTranslate();
  return (
    <MenuItemLink
        to={props.to || `/`}
        primaryText={translate(props.name)}
        leftIcon={ props.icon }
        onClick={props.onMenuClick}
        sidebarIsOpen={props.sidebarIsOpen}
        dense={props.dense}
    />
  );
}

export default MenuMail;
