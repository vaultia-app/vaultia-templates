import tokensData from './tokens.json';

export const tokens = tokensData;

export const PRIMITIVE_TOKENS = tokensData.primitive;
export const SEMANTIC_TOKENS = tokensData.semantic;

export type DesignTokens = typeof tokensData;
export default tokens;
