// type Prefix = `tw-` | ``;
export const GetPrefix = (runtimeConfig: any) => {
  const config: any = runtimeConfig.public.hsui;
  const prefix = config?.prefix || '';
  if (prefix === 'tw-') return 'tw-';
  return '';
};
/* */
const checkReg = /(?:[ :!]|^|\n)tw-/;

export const RemovePrefix = (prefix: string, arg: string[]) => {
  // console.log(prefix);
  const ret = arg.reduce((ret, row) => {
    if ((prefix === '' && !checkReg.test(row)) || (prefix !== '' && checkReg.test(row))) {
      ret.push(row);
    }
    return ret;
  }, [] as string[]);
  return ret;
};
