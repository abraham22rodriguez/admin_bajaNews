
const ASSET_URL = process.env.NEXT_PUBLIC_ASSET_URL ?? "http://localhost:5000";

export function uploadUrl(
  subfolder: string,
  fileName: string | null | undefined
): string | null {
  if (!fileName) return null;
  return `${ASSET_URL}/uploads/${subfolder}/${fileName}`;
}
