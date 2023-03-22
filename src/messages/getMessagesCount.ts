import { gql } from '@apollo/client';
import {getClient} from "../lib/apollo";

const gqlMessagesCount = gql`query getMessagesCount($page: Int, $perPage: Int, $filter: MessageFilter) {
  _allMessagesMeta(page: $page, perPage: $perPage, filter: $filter) {
      count
  }
}`;

export const getMessagesCount = async function (filter?: object) {
  const client = getClient();
  const result = await client.query({
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
    query: gqlMessagesCount,
    variables: {filter: filter},
  }).then(result => {
    // console.log("zv apolloClient gqlMessagesCount result:", {...result});
    return result.data;
  }).catch(err => {
    console.log("\n..zv apolloClient gqlMessagesCount error:", err.message);
  });
  return result?._allMessagesMeta?.count;
};