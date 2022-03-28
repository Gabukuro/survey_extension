
export async function getItem(key: string): Promise<any> {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get(key, function (items) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                reject(chrome.runtime.lastError.message);
            } else {
                resolve(items[key]);
            }
        });
    });

}

export function setItem(key: string, value: any): void {
    chrome.storage.local.set({ [key]: value }, () => {
        console.log(`${key} stored`);
    });
    console.log(`${key} stored`, getItem(key));
}