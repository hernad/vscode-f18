export type progressCallbackType = (num1: number, num2: number) => void;
export type revisionInfoType = {
    revision: string,
    execPath: string,
    execHash: string
    folderPath: string, 
    local: boolean, 
    url: string, 
    zipPath: string, 
    cleanup: boolean,
};
