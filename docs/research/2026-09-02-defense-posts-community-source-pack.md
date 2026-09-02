# Defense Posts community source pack

Date collected: 2026-09-02
Topic decision: when a Defense Post changes a player's decision, where to place it, how much depth to buy, and when a second line is better than stacking one tile.

## Research note

The repeated player question is not simply “what does a Defense Post do?” It is a decision question with four parts: whether the first 50,000 Gold is worth spending, whether the post should sit on the border or behind it, whether several posts stack, and how a defender should respond when the attacker has a much larger population. Reddit supplied the clearest language for the uncertainty. One player could tell that the building mattered but could not tell whether the effect was circular, national, or limited to a local area. Another described a row of posts that appeared to do almost nothing against a much larger army, while seeming useful against a small attack. A third had received contradictory answers about stacking. Those are three different symptoms of the same usability gap: players need a map-placement and timing rule, not another isolated tooltip.

The YouTube sample added a useful but deliberately limited practical frame. Three videos used “defensemaxxing” as a challenge or strategy, showing that a player may spend a large share of the build budget on survivability and accept some lost territory if the core survives. The descriptions and visible match framing repeatedly treated posts as time-buying tools. They also showed the danger of copying a spectacle: a build that works as a content challenge is not automatically correct in a normal lobby with a short front, a different map, or an opponent who can simply route around the defended tile. The videos had no available transcript in the opened pages, so they cannot support exact values, formulas, or claims about hidden engine behavior.

The guide therefore turns the repeated signal into a falsifiable decision framework. First identify the route the opponent must use, then draw the 30-tile coverage around a candidate post, then compare the cost and 50-tick construction window with the time the route is expected to remain relevant. A post is valuable when it forces the attacker to spend more time or more units before reaching something important. It is low value when the border will move before construction finishes, when the attacker can take a different route, or when the post itself is the first tile exposed. One finished post is enough to answer the local question; the guide does not promise that a line of posts creates an impenetrable wall.

Rules and numbers are bounded to the formal `v0.33.12` release and its source tag. Community posts and videos are evidence of demand and player language only. In particular, the source pack does not infer combat coefficients from a creator's result, and it does not treat a video title as proof of a meta. The official code shows a 30-tile search radius, a defense multiplier of 5, a speed multiplier of 3, a normal construction duration of 50 ticks, and the escalating cost formula `min(250000, (numUnits + 1) * 50000)`. The attack execution looks for one qualifying post owned by the defender and breaks after finding it, which is the relevant non-stacking boundary for a defended tile. The post execution also returns while construction is in progress. The current tagged execution has the naval automatic-fire block commented out, so this guide does not claim that a Defense Post currently auto-attacks Warships or Transports.

These observations produce two completion tests for the article. A reader should be able to decide “build now / move the post / save the Gold” from a border screenshot without memorising a universal build order, and should be able to explain why a second post belongs on another entrance or on a retreat line rather than on the same tile. The article includes two numeric scenarios with explicit assumptions, a placement table, failure and counterplay cases, map and mode adjustments, and links to the existing land-combat and building-timing answers.

## Reddit discussions

### 1. Defense post need some more tooltips

- URL: https://www.reddit.com/r/Openfront/comments/1kku8uk/defense_post_need_some_more_tooltips/
- Title: “Defense post need some more tooltips”
- Date: page displayed “about 1 year ago”; accessed 2026-09-02.
- Player question: Is the effect circular, local, or applied to the whole country, and how can its value be understood?
- Useful observation: The author understood that the building had an effect but could not quantify its area or practical consequence. This directly supports a guide about coverage geometry, route reading, and a short explanation of what a defended tile changes.
- Limitation: This is a request for clearer communication, not a rules test. It does not establish a number, a stacking rule, or a current version boundary. The Reddit page itself was blocked by the network policy; the post body was read through the RedditMedia/embed representation after opening the linked page.

### 2. Defence Posts

- URL: https://www.reddit.com/r/Openfront/comments/1nccuwe/defence_posts/
- Title: “Defence Posts”
- Date: page displayed “about 1 year ago”; accessed 2026-09-02.
- Player question: Are Defense Posts worth building, especially when a much larger opponent attacks?
- Useful observation: The author described a row of posts as barely slowing a larger army and as more noticeable against a small force. The repeated concern is whether the first post buys meaningful time and when a large population makes static defense a poor investment. This supports the guide’s “time and route” framing and its stop conditions.
- Limitation: The anecdotal battle has no reproducible map, force split, terrain, version, or tick log. It cannot be used to estimate damage, speed, or a universal population threshold.

### 3. Do defence posts stack?

- URL: https://www.reddit.com/r/Openfront/comments/1kopyw2/do_defence_posts_stack/
- Title: “Do defence posts stack?”
- Date: page displayed “about 1 year ago”; accessed 2026-09-02.
- Player question: Does placing multiple posts over the same area multiply the benefit?
- Useful observation: The author had received conflicting answers, showing that stacking is a high-intent search question and a likely source of wasted Gold. The guide resolves it using the tagged attack logic and recommends using a second post for another entrance or a depth line when coverage overlap alone adds no further multiplier.
- Limitation: The discussion is old relative to `v0.33.12` and contains player recollection rather than a controlled test. It is a demand signal, not an authoritative mechanic source.

## YouTube videos

### 1. This absolute madman just invented DEFENSEMAXXING! | OpenFront.io

- URL: https://www.youtube.com/watch?v=JhfNn-VdYt8
- Title: “This absolute madman just invented DEFENSEMAXXING! | OpenFront.io”
- Channel: Ultimus_Rex.
- Date: page displayed about 8 months ago; accessed 2026-09-02. Duration shown as 45:48; page displayed roughly 454K views.
- Player question/context: Can a deliberately defense-heavy build create a survivable position?
- Useful observation: The challenge premise makes the tradeoff visible: Gold spent on many Defense Posts is Gold not spent on expansion or offense. It is useful vocabulary for discussing survivability and opportunity cost.
- Limitation: The page had no available transcript. A challenge title and visible match footage cannot verify exact costs, coefficients, or whether the shown lobby used special settings.

### 2. I tried out DEFENSEMAXXING. | OpenFront.io

- URL: https://www.youtube.com/watch?v=5UuyQSXFaj4
- Title: “I tried out DEFENSEMAXXING. | OpenFront.io”
- Channel: Ultimus_Rex.
- Date: page displayed about 8 months ago; accessed 2026-09-02. Google’s visible result showed about 49:50; the YouTube page partially loaded a short preview.
- Player question/context: What happens when a player tests a Defense Post-focused plan in a real match?
- Useful observation: It supplies a second practical example of treating defense as a strategic investment rather than a one-click emergency. It helps the guide explain why the same structure can be correct in a long choke point and wasteful on an open border.
- Limitation: No transcript was available and the partial page did not expose a controlled rules explanation. It cannot prove that multiple posts stack or establish a damage threshold.

### 3. Become UNKILLABLE with DEFENSEMAXXING?!! | OpenFront.io

- URL: https://www.youtube.com/watch?v=HASOBLnRP7Q
- Title: “Become UNKILLABLE with DEFENSEMAXXING?!! | OpenFront.io”
- Channel: Ultimus_Rex.
- Date: page displayed about 1 year ago; accessed 2026-09-02. Duration shown as 28:37; page description was readable.
- Player question/context: Can survivability and a little lost territory preserve the core during a fullsend or MIRV-lunge-style crisis?
- Useful observation: The description explicitly frames survivability as valuable, accepts that a player may lose some territory, and describes slowing a fullsend as a meaningful result. This supports the guide’s retreat-line and “buy time for a response” scenarios.
- Limitation: The description is creator commentary, not a reproducible experiment. The page had no verifiable captions, and the phrase “new meta” is an opinion. Exact rules remain bound to official v0.33.12 sources.

## Official fact boundary

- Release: https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.33.12
- Tagged configuration: https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.33.12/src/core/configuration/Config.ts
- Tagged execution: https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.33.12/src/core/execution/DefensePostExecution.ts
- Tagged attack logic: https://raw.githubusercontent.com/openfrontio/OpenFrontIO/v0.33.12/src/core/execution/AttackExecution.ts

The official URLs were opened or fetched on 2026-09-02. `Config.ts` supplies the range, multipliers, cost formula, and construction duration. The tagged execution confirms that a post under construction returns without applying the finished behavior and that the current naval shell-attack block is commented out. The attack logic is used only to state the one-qualifying-post boundary. The formal Release is the version anchor; if a later Release changes these values, this guide requires a new fact check.
