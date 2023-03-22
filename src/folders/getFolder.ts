import { gql } from '@apollo/client';

import {getClient} from '../lib/apollo';
import { Folder } from '../types';

const getFolderGql = gql`query getFolder($id: ID!) {
  Folder(id: $id) {
      id
      user_id
      place
      priority
      name
      icon
      color
      slug
      filter
  }
}`;

export async function getFolder(id: number): Promise<Folder> {
  const client = getClient();
  const serverResult = await client.query({
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    query: getFolderGql,
    variables: { id },
  }).then(result => {
      // console.log("zv apolloClient query result:", {...result.data});
      return result.data;
  }).catch(err => {
      return err;
      // console.log("zv apolloClient query error:", err.message);
  });
  return serverResult;
}
