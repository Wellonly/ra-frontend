import React, {Fragment} from "react";
import {
    FormDataConsumer,
    TextInput, useTranslate,
} from 'react-admin';
import ImagesInput from "../layout/ImagesInput";
import {Box, Button} from "@material-ui/core";
import { useForm } from 'react-final-form';

import {imagesFieldFormatter} from "./formatter";

export function ImagesWithContent({ imagesSource, contentSource, ...rest}: {imagesSource:string, contentSource:string}) {
  const form = useForm();
  const translate = useTranslate();
  return (
    <FormDataConsumer>
      {(formDataProps: any) => {
        return (
          <Fragment>
            <TextInput source={imagesSource} format={imagesFieldFormatter} fullWidth label=""/>
            <ImagesInput source={imagesSource} {...rest}/>
            <Box>
              <Button onClick={addImagesToArticle} color="secondary" variant='contained'>
                {translate('spell.addImagesToArticle')}:
              </Button>
            </Box>
            <TextInput multiline fullWidth source={contentSource} label="" />
          </Fragment>
        );
        function addImagesToArticle(e: any) {
          e.preventDefault();
          console.log('...zv: addImagesToArticle:', imagesSource, contentSource, '; props:', formDataProps, '; form:', form);
          const formImages = formDataProps.formData[imagesSource];
          if (Array.isArray(formImages)) {
            const text = formImages.reduce((acc, value) => {
                const iname = value.title ? value.title: value;
                if (!iname) return acc;
                return acc.concat(`<Image src="${iname}"/>\n`);
            },'');
            const recContent = formDataProps.formData[contentSource] || '';
            form.change(contentSource, text.concat(recContent));
          }
        }
      }}
    </FormDataConsumer>
  );
}