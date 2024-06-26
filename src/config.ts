import packageJson from '../package.json'
import { LogLevelDesc } from 'loglevel'
import pickBy from 'lodash/pickBy'
import mapKeys from 'lodash/mapKeys'

export const config = {
  API_URL: import.meta.env.VITE_API_URL,
  APP_NAME: import.meta.env.VITE_APP_NAME,
  LOG_LEVEL: 'trace' as LogLevelDesc,
  BUILD_VERSION: packageJson.version || import.meta.env.VITE_BUILD_VERSION,
  VOTING_START_DATE: import.meta.env.VITE_VOTING_START_DATE,
  VOTING_END_DATE: import.meta.env.VITE_VOTING_END_DATE,
  APPSTORE_LINK: import.meta.env.VITE_APPSTORE_LINK,
  PLAYSTORE_LINK: import.meta.env.VITE_PLAYSTORE_LINK,
  APK_LINK: import.meta.env.VITE_APK_LINK,
  DISCORD_LINK: import.meta.env.VITE_DISCORD_LINK,
  SUPPORT_LINK: import.meta.env.VITE_SUPPORT_LINK,
  WEB_VOTING_URL: import.meta.env.VITE_WEB_VOTING_URL,
} as const

Object.assign(config, _mapEnvCfg(import.meta.env))
Object.assign(config, _mapEnvCfg(document.ENV))

function _mapEnvCfg(env: ImportMetaEnv | typeof document.ENV): {
  [k: string]: string | boolean | undefined
} {
  return mapKeys(
    pickBy(env, (v, k) => k.startsWith('VITE_')),
    (v, k) => k.replace(/^VITE_/, ''),
  )
}
