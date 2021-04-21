/* eslint-disable no-shadow */
interface User {
  name: string,
  avatar?: string,
}
export interface UserInfo extends User {
  id: number,
}

export interface UserAvatar {
  albumId: number,
  id: number,
  title: string,
  url: string,
  thumbnailUrl: string
}

export enum SearchState {
  idle = 'idle',
  loading = 'loading',
  loaded = 'loaded',
  failed = 'failed'
}
