import { gql } from '@apollo/client';
import useGqlQuery, { QueryOptions, UseQueryValue } from '../lib/useGqlQuery';

// work only in React.Component
const gqlFolders = gql`query getFolders($page: Int, $perPage: Int, $sortField: String, $sortOrder: String, $filter: MessageFilter) {
  allFolders(page: $page, perPage: $perPage, sortField: $sortField, sortOrder: $sortOrder, filter: $filter) {
      count
  }
}`;

const useFolders = (variables?: object, options: QueryOptions = {}): UseQueryValue => {
  return useGqlQuery(gqlFolders, variables, options);
}

export default useFolders;