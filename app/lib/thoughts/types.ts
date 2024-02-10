import { getAllRelatedThoughts } from "./actions";

export type FetchedTypes = Awaited<ReturnType<typeof getAllRelatedThoughts>>;
