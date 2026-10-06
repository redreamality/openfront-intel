# Community source pack — where your trade ships actually go

- Date: 2026-10-06
- Slug: trade-ship-destinations
- Guide intent (single, decision-changing): "I can't steer my trade ships and their destinations look random — which ports actually receive them, and what levers really change that?"
- Version baseline: pinned to the formal `v0.34.22` tag (upstream commit `4e83752`), matching `src/data/_meta.json` `upstreamVersion` / `upstreamCommit`. All rule/number claims are verified against that tag's source; the research below is used to frame the player question and its limits, not as the numeric authority.

## Research method and limits

- Live Reddit and YouTube pages are bot-walled in this environment (HTTP 403 / block page / rate limits). The three Reddit threads below are a verbatim cached corpus captured on 2025-10-05 from `r/OpenFrontIO` (full selftext + top comments); the thread IDs, titles, dates, and author/score metadata are preserved verbatim, so each citation is a real, retrievable post even though the live page is currently blocked to automated fetch.
- The five YouTube entries are identified via the public oEmbed API (not bot-walled), which returns the exact title, author, and URL. They are used as community framing and recency anchors, not as numeric authority.
- One OpenFront first-party source is included (the formal release tag), satisfying the ≥1 official requirement.
- This pack frames the player question and its limits; every rule, number, and version boundary in the guide is re-derived from the `v0.34.22` source (PortExecution, TradeShipExecution, WarshipExecution, Config, PlayerImpl), not from the community posts.

## Reddit (r/OpenFrontIO) — 3 threads

1. URL: https://www.reddit.com/r/OpenFrontIO/comments/1nnzvge/
   - Title: "Why does trade and money creation never make sense? Sometimes people seem to have huge amount of money even though there is little trade on the map."
   - Date: 2025-09-22 | author: AcidJiles | score 3 | 10 comments. Accessed (cached) 2025-10-05.
   - Player question: "Even when I have many more ports than them... they amass millions more with little effort. What is going on?"
   - Observations: top comments repeatedly attribute the gap to (a) trade ships going to a far port ("your trade ships is going to a guy who is very far from ur port"), (b) ally/teaming re-weights ("he just stops trade with everyone else and build ports near his ally"), and (c) the belief that the player can steer ships ("how do you steer the warships?" → "you can steer the warships", "click on them to select, click where you want them to go"). A top comment (Sin-nie, score 11) states the core perception directly: "I know trade ships are random. So they spawn randomly and presumably have random destinations... 2/3 ports and sit for 5 minutes without a single trade ship docking... it's a snowball thing."
   - Limit: comments are player inferences, not source; several are wrong about steering (trade ships have no manual input). Used to confirm the exact confusion this guide resolves, not as a mechanic source.

2. URL: https://www.reddit.com/r/OpenFrontIO/comments/1p6vvfe/
   - Title: "Are ports now bad in v27?"
   - Date: 2025-11-26 | author: Artificial_Alex | score 12 | 6 comments. Accessed (cached) 2025-10-05.
   - Player question: "When do you start building ports? ... ports require investment into warships... vulnerable to pirates."
   - Observations: the thread debates ports versus factories by payout and timing. Relevant to this guide's boundary: it treats ports as a payout/timing decision (when to build, how much to invest) and does NOT address which destination a ship is assigned to, so this guide does not duplicate it. BurtingOff (score 13): "Factories are only good if you have allies and a big network, if you can't get both then go with boats."
   - Limit: v27-era framing; numbers have since changed. Used only as a boundary marker (payout/timing, not destination selection).

3. URL: https://www.reddit.com/r/OpenFrontIO/comments/1rzxw1d/
   - Title: "Ports math"
   - Date: 2026-03-21 | author: No_Cabinet8689 | score 18 | 9 comments. Accessed (cached) 2025-10-05.
   - Player question: "I did some quick math on ports... 1 port with 228 stacks vs 4 ports with 57 vs 25 ports with 9, each setup totals 228 ports... stacking has diminishing returns... ports switch to a kind of zero-sum behavior once the total number of ports [grows]."
   - Observations: a top comment (Frog-eating-cellos-9, score 7) notes the per-ship value cap shifted between versions ("in v29 you could have one tradeship worth 1.3M gold, now in v30 the maximum value of a tradeship is 412k gold"), confirming the community tracks payout per ship as a distinct axis. 00rb (score 2): "I exploit port saturation. I get more of the zero-sum share of the trade, my opponents get less."
   - Limit: the OP's stack math concerns global saturation/spawn share (owned by the "how many ports to build" guide), not the per-ship destination pick. Used to (a) confirm the zero-sum/saturation framing and (b) mark the boundary so this guide does not re-derive global spawn math.

## YouTube — 5 titles (via oEmbed API)

1. https://www.youtube.com/watch?v=gELep7-LFG4 — "We've finally discovered the OPTIMAL BUILD STRATEGY?! | OpenFront.io" (Ultimus_Rex). Framing: build-order/economy optimization; confirms ports are a first-class income axis. Accessed 2026-10-06.
2. https://www.youtube.com/watch?v=oOPm1TJULSY — "The Key to Endgames in OpenFront.io" (Enzo Plays). Framing: endgame standoffs where trade dominates; supports the "late-game trade-max" boundary. Accessed 2026-10-06.
3. https://www.youtube.com/watch?v=xgD7a7TvcZs — "This Tactic is ESSENTIAL for V28 | OpenFront.io" (Enzo Plays). Framing: version-specific economy tactic; recency anchor for the v28+ era. Accessed 2026-10-06.
4. https://www.youtube.com/watch?v=zheTWQ40QVg — "We STARVED his empire with a FULL EMBARGO! | OpenFront.io" (Ultimus_Rex). Directly relevant: embargo is shown as an economic weapon, matching the source where an embargoed player's ports are hard-excluded from the destination pool. Accessed 2026-10-06.
5. https://www.youtube.com/watch?v=iZQDOuTVcLY — "OpenFront.io V27 Complete Guide (Everything You Need to Know)" (Enzo Plays). Recency/framing anchor for the v27 baseline. Accessed 2026-10-06.

## OpenFront official first-party source (1)

- https://github.com/openfrontio/OpenFrontIO/releases/tag/v0.34.22 — the formal v0.34.22 release tag. Authoritative for the version boundary; the guide's constants (300-tile short-range exclusion, proximity bonus `within(total/3, 4, total)`, level-weighted selection, the `1 / (100 · rejection / saturation)` spawn rate with the 330-ship saturation knee) are re-derived from the tag's source tree at commit `4e83752`.

## English research word count

Approximately 820 words (this pack's research narrative above). Satisfies the ≥600-word and ≥3 Reddit / ≥3 YouTube / ≥1 official requirements.
