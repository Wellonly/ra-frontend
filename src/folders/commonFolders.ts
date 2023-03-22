
export const INBOX_FIELD_NAME = 'inbox_id';
export const OUTBOX_FIELD_NAME = 'folder_id';

export const BOT_UID = 1;

/**
 * PLACEs are equal COMMON_FOLDER_IDs; all above id numbers are means a user defined folder
 */
export enum PLACE {
  trash  = 0, //out; invisible; MUST BE ZERO
  outbox = 1, //out
  draft  = 2, //out; exclusive folder, or MessageFolderSelect logic break, see its note
  basket = 3, //out 
  inbox  = 4, //in
  
  last        // undefined or bad, must be last
};

export const USER_FOLDERS_START_ID = PLACE.last;

export function isInward(place: PLACE) {
  return place === PLACE.inbox;
}
export function isOutward(place: PLACE) {
  return place !== PLACE.inbox;
}