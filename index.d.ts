
interface VueComputerMap<T> {
  [prop: string]: (newState: any, oldState: any) => T;
}
export type Getter<T> = (params: string[] | object) => VueComputerMap<T>;
export type Setter<T> = (state: object) => Promise<T>;
export type Vuebx<T> = (defaultState: object) => [Getter<T>, Setter<T>]
