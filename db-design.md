# 🇯🇵 Japan Travel Guide Database Design

This schema supports city data, food, attractions, travel tips, user posts, likes, comments, shares, and favorites.

---

## 🧑 Users

```sql
Users (
    user_id PK,
    username,
    email,
    password_hash,
    profile_pic_url,
    created_at
)

Cities (
    city_id PK,
    name,
    region,  -- e.g., Kanto, Kansai
    description,
    image_url
)


Foods (
    food_id PK,
    name,
    description,
    city_id FK -> Cities.city_id,
    image_url
)

Attractions (
    attraction_id PK,
    name,
    description,
    city_id FK -> Cities.city_id,
    image_url,
    category  -- e.g., historical, nature, entertainment
)

TravelTips (
    tip_id PK,
    title,
    content,
    city_id FK -> Cities.city_id,
    user_id FK -> Users.user_id,
    created_at
)

Posts (
    post_id PK,
    user_id FK -> Users.user_id,
    title,
    content,
    image_url,
    created_at
)

PostLikes (
    like_id PK,
    user_id FK -> Users.user_id,
    post_id FK -> Posts.post_id,
    liked_at
)

PostComments (
    comment_id PK,
    post_id FK -> Posts.post_id,
    user_id FK -> Users.user_id,
    comment_text,
    created_at
)

FavoriteCities (
    id PK,
    user_id FK -> Users.user_id,
    city_id FK -> Cities.city_id,
    favorited_at
)

FavoriteFoods (
    id PK,
    user_id FK -> Users.user_id,
    food_id FK -> Foods.food_id,
    favorited_at
)

FavoriteAttractions (
    id PK,
    user_id FK -> Users.user_id,
    attraction_id FK -> Attractions.attraction_id,
    favorited_at
)


AttractionComments (
    comment_id PK,
    user_id FK -> Users.user_id,
    attraction_id FK -> Attractions.attraction_id,
    comment_text,
    created_at
)
```
