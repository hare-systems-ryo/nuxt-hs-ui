import { useRuntimeConfig } from '#imports';

type Prefix = `tw-` | ``;
export const GetPrefix = () => {
  const config: any = useRuntimeConfig().public.hsui;
  const prefix = config?.prefix || '';
  if (prefix === 'tw-') return 'tw-';
  return '';
};
const checkReg = /(^tw-| tw-|^!tw-| !tw-|:tw-)/;

export const RemovePrefix = (arg: string[]) => {
  const prefix = GetPrefix();
  // console.log(prefix);
  const ret = arg.reduce((ret, row) => {
    if ((prefix === '' && !checkReg.test(row)) || (prefix !== '' && checkReg.test(row))) {
      ret.push(row);
    }
    return ret;
  }, [] as string[]);
  return ret;
};
