import {
  formatPosts as coreFormatPosts,
} from '@bellaos/core';
import type { Actor, Memory } from "./types.ts";

export const formatPosts = ({
    messages,
    actors,
    conversationHeader = true,
}: {
    messages: Memory[];
    actors: Actor[];
    conversationHeader?: boolean;
}) => {
  return coreFormatPosts({ messages, actors, conversationHeader })
}
