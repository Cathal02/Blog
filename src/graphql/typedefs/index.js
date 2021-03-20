import { gql } from 'apollo-server-express';
import typeDefs from './baseDefs';
import user from './user';
import post from './post';
import comment from './comment';
import blog from './blog';
import followers from './followers';
export default [ typeDefs, user, post, comment, blog, followers ];
