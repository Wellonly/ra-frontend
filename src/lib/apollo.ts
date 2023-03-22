import { ApolloClient, InMemoryCache, createHttpLink, split } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import { SubscriptionClient } from 'subscriptions-transport-ws';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

function createLink(host: string = '', data: string = '', authIdName = 'id') {
  const authLink = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            auth: sessionStorage.getItem(authIdName), /* localStorage.getItem('token') */
        }
    };
  });
  const httpLink = createHttpLink({
    uri: "".concat(host, data),
  });
  return authLink.concat(httpLink);
}

const appHttpLink = createLink(process.env.REACT_APP_DATA_HOST_URL, process.env.REACT_APP_DATA_PROVIDER);

const client = new ApolloClient({
  // uri: process.env.REACT_APP_DATA_HOST_URL,
  link: appHttpLink,
  cache: new InMemoryCache(),
  name: 'zv gql client',
  version: "zv-client-ver-1.0",
});

export function setWebSocketLink(token: string) {
  const wsLink = createWsLink(process.env.REACT_APP_DATA_HOST_URL, process.env.REACT_APP_SUBS_PROVIDER, token);
  const splitLink = split(
    (props) => {
      const { query } = props;
      const definition = getMainDefinition(query);
      const isWsLinkOrHttpLink = definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      // console.log('..zv splitLink: isWsOrHttp:', isWsLinkOrHttpLink, props, definition);
      return isWsLinkOrHttpLink;
    },
    wsLink,
    appHttpLink,
  );  
  client.setLink(splitLink);
}

export const getClient = () => {
  return client;
};

function createWsLink(host: string = '', subs: string = '', token: string) {
  const uri = "ws".concat(host.indexOf('http') === 0 ? host.substr(4): host.indexOf('ws') === 0 ? host.substr(2): '://'.concat(host), subs);
  // console.log('..zv: createWsLink uri:', uri);
  const subclient = new SubscriptionClient(uri, {
      reconnect: true,
      connectionParams: {auth: token},
  });
  return new WebSocketLink(subclient);
}
