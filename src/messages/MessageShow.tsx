import React/* , { FC } */ from 'react';
import {
    Edit,
    SimpleForm,
    TextField,
} from 'react-admin';
// import { makeStyles } from '@material-ui/core/styles';
// import { makeStyles, Theme } from '@material-ui/core/styles';
// import { Styles } from '@material-ui/styles/withStyles';

import Separator from '../lib/Separator';
import { MessageFolderAsTitle } from './MessageFolderAsTitle';
import { MessageSectionTitle } from './MessageSectionTitle';
import TextFieldConfirmedShow from './TextFieldConfirmedShow';
import {MessageFolderSelect} from './MessageFolderSelect';

// styles 1 variant...
// export const styles: Styles<Theme, any> = {
//     inline: { display: 'inline-block', marginRight: 11 },
// };
// const useStyles = makeStyles(styles);
// or styles 2 variant...
// const useStyles = makeStyles({
//     inline: { display: 'inline-block', marginRight: 22 },
// });

//folders: all, exclude outbox & draft
const MessageShow = (props: any) => {
    // const classes = useStyles();
    // const translate = useTranslate();
    console.log('..zv MessageShow props:', props);
    const uid = props?.permissions?.id;

    return (
        <Edit title={<MessageFolderAsTitle uid={uid} />} {...props}>
            <SimpleForm >
                <MessageSectionTitle uid={uid} />
                <MessageFolderSelect uid={uid} />
                <TextField source="title" fullWidth />
                <Separator />
                <TextFieldConfirmedShow source="text" confirmField="readAt" uid={uid} fullWidth />
            </SimpleForm>
        </Edit>
    );
};

export default MessageShow;
