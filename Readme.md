
Assume the customers around a campus order 5000 orders a day from 50 local restaurants. Each order contains one or multiple products. For eg, 2 burritos, a soda, and a side of chips.

Design a full stack application which returns an infinite-scrolling list of trending products to the user.
A product can be qualified as trending if it is purchased at least once in last 48 hours
Each product should be displayed with two tags:
a recent purchase tag: 5 purchased recently
a time tag ordered 3 min ago
Use a heuristic to determine which trending products gets returned higher. Base heuristic on both recency and number of recent purchases.

Data
For sample data, you may use Sample Orders ((https://
 docs.google.com/spreadsheets/d/
 1xseIrLzIUY3a7Rq1TcHziTqEu98zcv3BwmF67eCYzbg/edit?usp=sharing) ), or generate your own.

Note: Remember to insert your own random timestamps to fit within 48 hours window.

