import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
    users: defineTable({
        fullName: v.string(),
        username: v.string(),
        title: v.string(),
        about: v.string(),
        portfolioUrls: v.optional(v.array(v.string())),
        profileImageUrl: v.optional(v.string()),
        favoritedStudentIds: v.optional(v.array(v.string())),
        tokenIdentifier: v.string(),
        customTag: v.optional(v.string()),
        stripeAccountId: v.optional(v.string()),
        stripeAccountSetupComplete: v.optional(v.boolean()),
    })
        .index("by_token", ["tokenIdentifier"])
        .index("by_username", ["username"]),
    reviews: defineTable({
        authorId: v.id("users"),
        studentId: v.id("users"),
        profileId: v.id("profiles"),
        comment: v.string(),
        communication_level: v.number(),
        recommend_to_a_friend: v.number(),
        service_as_described: v.number(),
    })
        .index("by_studentId", ["studentId"])
        .index("by_profileId", ["profileId"]),
    skills: defineTable({
        skill: v.string(),
        userId: v.id("users"),
    })
        .index("by_userId", ["userId"]),
    languages: defineTable({
        language: v.string(),
        userId: v.id("users"),
    })
        .index("by_userId", ["userId"]),
    userFlags: defineTable({
        userId: v.id("users"),
        markingType: v.string(),
        description: v.string(),
    }),
    countries: defineTable({
        countryName: v.string(),
        userId: v.id("users"),
    })
        .index("by_userId", ["userId"]),
    profiles: defineTable({
        title: v.string(),
        description: v.string(),
        studentId: v.id("users"),
        subcategoryId: v.id("subcategories"),
        published: v.optional(v.boolean()),
        clicks: v.number(),
    })
        .index("by_studentId", ["studentId"])
        .index("by_subcategoryId", ["subcategoryId"])
        .index("by_published", ["published"])
        .searchIndex("search_title", {
            searchField: "title",
        }),
    offers: defineTable({
        profileId: v.id("profiles"),
        title: v.string(),
        description: v.string(),
        tier: v.union(
            v.literal("Basic"),
            v.literal("Standard"),
            v.literal("Premium")
        ),
        price: v.number(),
        delivery_days: v.number(),
        revisions: v.number(),
        stripePriceId: v.string(),
    })
        .index("by_profileId", ["profileId"])
        .index("by_tier", ["tier"])
        .index("by_profileId_tier", ["profileId", "tier"]),
    orders: defineTable({
        offerId: v.id("offers"),
        profileId: v.id("profiles"),
        buyerId: v.id("users"),
        fulfillmentStatus: v.string(),
        fulfilmentTime: v.optional(v.number()),
    })
        .index("by_buyerId", ["buyerId"])
        .index("by_profileId", ["profileId"]),
    gigMedia: defineTable({
        storageId: v.id("_storage"),
        format: v.string(),
        profileId: v.id("profiles"),
    })
        .index("by_profileId", ["profileId"])
        .index("by_storageId", ["storageId"]),
    categories: defineTable({
        name: v.string(),
    }),
    subcategories: defineTable({
        categoryId: v.id("categories"),
        name: v.string(),
    })
        .index("by_category", ["categoryId"])
        .index("by_name", ["name"]),
    faq: defineTable({
        question: v.string(),
        answer: v.string(),
        profileId: v.id("profiles"),
    }),
    messages: defineTable({
        userId: v.id("users"),
        text: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
        seen: v.boolean(),
        conversationId: v.id("conversations"),
    })
        .index('by_conversationId', ['conversationId']),
    conversations: defineTable({
        participantOneId: v.id("users"),
        participantTwoId: v.id("users"),
    })
        .index('by_participantOneId', ['participantOneId', 'participantTwoId'])
        .index('by_participantTwoId', ['participantTwoId', 'participantOneId']),
    userFavorites: defineTable({
        userId: v.id("users"),
        profileId: v.id("profiles"),
    })
        .index("by_gig", ["profileId"])
        .index("by_user_gig", ["userId", "profileId"])
        .index("by_user", ["userId"]),
});



























































// import { v } from "convex/values";
// import { defineSchema, defineTable } from "convex/server";

// export default defineSchema({
//   // --------------------
//   // Users table
//   // --------------------
//   users: defineTable({
//     fullName: v.string(),
//     username: v.string(),
//     title: v.string(),           // e.g., "Computer Science Student"
//     about: v.string(),           // bio or summary
//     profileImageUrl: v.optional(v.string()),
//     portfolioUrls: v.optional(v.array(v.string())), // GitHub, live projects
//     tokenIdentifier: v.string(), // auth token for login
//     location: v.optional(v.string()), // city/country
//     website: v.optional(v.string()),  // personal website
//     contactEmail: v.optional(v.string()), // for recruiters
//   })
//     .index("by_token", ["tokenIdentifier"])
//     .index("by_username", ["username"]),

//   // --------------------
//   // Profile table
//   // --------------------
//   profile: defineTable({
//     userId: v.id("users"),
//     title: v.string(),
//     headline: v.string(),       // headline/title of profile
//     education: v.string(),       // school/institute
//     summary: v.string(),         // longer description
//     published: v.optional(v.boolean()),
//     clicks: v.number(),          // track profile views
//     profileTheme: v.optional(v.string()), // optional color/theme for profile display
//   })
//     .index("by_userId", ["userId"])
//     .index("by_published", ["published"])
//     .searchIndex("search_headline", { searchField: "headline" }),

//   // --------------------
//   // Skills table
//   // --------------------
//   skills: defineTable({
//     profileId: v.id("profile"),
//     skill: v.string(),
//     proficiency: v.optional(v.number()), // 1-5 rating
//     endorsementCount: v.optional(v.number()), // peer endorsements
//   }).index("by_profileId", ["profileId"]),

//   // --------------------
//   // Languages table
//   // --------------------
//   languages: defineTable({
//     profileId: v.id("profile"),
//     language: v.string(),
//     proficiency: v.optional(v.union(v.literal("Basic"), v.literal("Intermediate"), v.literal("Fluent"), v.literal("Native"))),
//   }).index("by_profileId", ["profileId"]),

//   // --------------------
//   // Projects table
//   // --------------------
//   projects: defineTable({
//     profileId: v.id("profile"),
//     title: v.string(),
//     description: v.string(),
//     link: v.optional(v.string()),  // project URL or GitHub link
//     startDate: v.optional(v.string()),
//     endDate: v.optional(v.string()),
//     status: v.union(v.literal("Ongoing"), v.literal("Completed")),
//     mediaUrls: v.optional(v.array(v.string())), // images, videos, docs
//     projectType: v.optional(v.string()),       // e.g., "Research", "App", "Hackathon"
//   }).index("by_profileId", ["profileId"]),

//   // --------------------
//   // Reviews / Endorsements table
//   // --------------------
//   reviews: defineTable({
//     authorId: v.id("users"), // who wrote the review
//     profileId: v.id("profile"),   // profile being reviewed
//     comment: v.string(),
//     rating: v.optional(v.number()), // 1-5 stars
//     createdAt: v.optional(v.string()), // date of review
//   }).index("by_profileId", ["profileId"]),

//   // --------------------
//   // Achievements / Certificates
//   // --------------------
//   achievements: defineTable({
//     profileId: v.id("profile"),
//     title: v.string(),
//     description: v.string(),
//     date: v.optional(v.string()),
//     link: v.optional(v.string()),   // certificate URL
//     issuingOrganization: v.optional(v.string()),
//   }).index("by_profileId", ["profileId"]),
// });
