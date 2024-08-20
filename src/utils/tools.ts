/**
 * 参数处理
 * @param {*} params  参数
 */
export const tansParams = (params: { [x: string]: any }) => {
  let result: string = "";
  for (const propName of Object.keys(params)) {
    const value: string = params[propName];
    const part: string = `${encodeURIComponent(propName)}=`;
    if (value !== null && value !== "" && typeof value !== "undefined") {
      if (typeof value === "object") {
        for (const key of Object.keys(value)) {
          if (
            value[key] !== null &&
            value[key] !== "" &&
            typeof value[key] !== "undefined"
          ) {
            const params: string = `${propName}[${key}]`;
            const subPart: string = `${encodeURIComponent(params)}=`;
            result += `${subPart + encodeURIComponent(value[key])}&`;
          }
        }
      } else {
        result += `${part + encodeURIComponent(value)}&`;
      }
    }
  }
  return result;
};
