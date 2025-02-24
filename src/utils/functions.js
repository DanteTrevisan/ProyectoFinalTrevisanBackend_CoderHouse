/**
 * @param {number[]} ids
 * @returns {number}
 */

export default function generateId(ids){
    let maxId = 0;
    if(ids.length !== 0) maxId = Math.max(...ids)
    return maxId
}