import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloClient, ApolloError, FetchType } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'

export function getClient(): ApolloClient<NormalizedCacheObject> {
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000',
  })

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  })
  return client
}
