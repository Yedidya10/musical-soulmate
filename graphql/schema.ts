import './types/user'
import './types/subscriber'
import { builder } from './builder'

export const schema = builder.toSchema()
