import routesMap from './routesMap'
// import jwt from 'jsonwebtoken'

export const isServer = typeof window === 'undefined'
export const isProduction = process.env.NODE_ENV === 'production'

// VERIFICATION MOCK:
// since middleware is syncrhonous you must use a jwt package that is sync
// like the one imported above. For now we will mock both the client + server
// verification methods:

// NOTE ON COOKIES:
// we're doing combination cookies + jwTokens because universal apps aren't
// single page apps (SPAs). Server-rendered requests, when triggered via
// direct visits by the user, do not have headers we can set. That's the
// takeaway.
