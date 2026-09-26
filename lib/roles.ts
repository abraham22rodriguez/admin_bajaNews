export const ROLE_ADMIN = "ROLE_ADMIN";
export const ROLE_EDITOR = "ROLE_EDITOR";
export const ROLE_REDACTOR = "ROLE_REDACTOR";

export const ALL_ROLES = [ROLE_ADMIN, ROLE_EDITOR, ROLE_REDACTOR] as const;

export const ROLE_LABELS: Record<string, string> = {
  [ROLE_ADMIN]: "Administrador",
  [ROLE_EDITOR]: "Editor",
  [ROLE_REDACTOR]: "Redactor",
};

export function isAdmin(roles: string[]): boolean {
  return roles.includes(ROLE_ADMIN);
}

export function canDeletePosts(roles: string[]): boolean {
  return isAdmin(roles);
}

export function canEditPost(roles: string[], currentUserId: number, postAuthorId: number): boolean {
  if (roles.includes(ROLE_ADMIN) || roles.includes(ROLE_EDITOR)) return true;
  if (roles.includes(ROLE_REDACTOR)) return postAuthorId === currentUserId;
  return false;
}
