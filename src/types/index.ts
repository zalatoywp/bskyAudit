// User profile types
export interface UserProfile {
  did: string;
  handle: string;
  displayName?: string;
  description?: string;
  avatar?: string;
  banner?: string;
  followersCount: number;
  followsCount: number;
  postsCount: number;
  createdAt: string;
  associated?: {
    lists: number;
    feedgens: number;
    starterPacks: number;
  };
}

export interface SearchResult {
  did: string;
  handle: string;
  displayName?: string;
  avatar?: string;
}

export interface FollowerInfo {
  did: string;
  handle: string;
  displayName?: string;
  avatar?: string;
}

export interface BlockedUser {
  did: string;
  handle?: string;
  displayName?: string;
  avatar?: string;
  blockedDate: string;
}

export interface UserStats {
  accountCreated: string;
  handleChanges: number;
  followers: number;
  following: number;
  posts: number;
  lists: number;
  blockedBy: number;
  hasBlocked: number;
  feeds: number;
  starterPacks: number;
  handle: string;
  userRanking: number;
}