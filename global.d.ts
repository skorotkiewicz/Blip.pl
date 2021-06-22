// These reference imports provide type definitions for things like styled-jsx and css modules
/// <reference types="next" />
/// <reference types="next/types/global" />

export type StringNullableListFilter = {
  equals?: Enumerable<string> | null
  has?: string | null
  hasEvery?: Enumerable<string>
  hasSome?: Enumerable<string>
  isEmpty?: boolean
}

export type BoolNullableListFilter = {
  equals?: Enumerable<boolean> | null
  has?: boolean | null
  hasEvery?: Enumerable<boolean>
  hasSome?: Enumerable<boolean>
  isEmpty?: boolean
}
