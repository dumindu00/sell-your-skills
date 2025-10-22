import { v } from "convex/values";

import { internalMutation, mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { title } from "process";

export const create = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        subcategoryId: v.string(),

    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthenticated");
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) => q.eq("tokenIdentifier"  , identity.tokenIdentifier)
            )
            .unique();

            const profileId = await ctx.db.insert("profile", {
                title: args.title,
                userId: user?._id,
                published:false,
                clicks: 0,
                title: args.title
                headline: 
                education: 
                summary:
                clicks: 
                profileTheme: 
                
            })

        return profileId;

    },
})
