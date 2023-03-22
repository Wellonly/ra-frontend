import {
  useQueryWithStore,
} from 'react-admin';

export function getOneRecord(resource: string, payload: object) {
  return () => useQueryWithStore({ type: 'getOne', resource, payload });
};
