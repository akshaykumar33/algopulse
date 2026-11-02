const fs = require('fs');

class Twitter {
  constructor() {
    this.tweets = [];
    this.following = new Map();
    this.time = 0;
  }

  postTweet(userId, tweetId) {
    this.tweets.push({ time: ++this.time, userId, tweetId });
  }

  getNewsFeed(userId) {
    const follows = this.following.get(userId) || new Set();
    const res = [];
    for (let i = this.tweets.length - 1; i >= 0 && res.length < 10; i--) {
      const tw = this.tweets[i];
      if (tw.userId === userId || follows.has(tw.userId)) {
        res.push(tw.tweetId);
      }
    }
    return res;
  }

  follow(followerId, followeeId) {
    if (followerId === followeeId) return;
    if (!this.following.has(followerId)) {
      this.following.set(followerId, new Set());
    }
    this.following.get(followerId).add(followeeId);
  }

  unfollow(followerId, followeeId) {
    if (this.following.has(followerId)) {
      this.following.get(followerId).delete(followeeId);
    }
  }
}

function solve() {
  const lines = fs.readFileSync(0, 'utf-8').trim().split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  if (lines.length === 0) return;
  let ptr = 0;
  const t = parseInt(lines[ptr++], 10);
  const out = [];

  for (let tc = 0; tc < t; tc++) {
    if (ptr >= lines.length) break;
    const methods = JSON.parse(lines[ptr++]);
    const args = JSON.parse(lines[ptr++]);

    let tw = null;
    const row = [];
    for (let i = 0; i < methods.length; i++) {
      const m = methods[i];
      const a = args[i];
      if (m === 'Twitter') {
        tw = new Twitter();
        row.push('None');
      } else if (m === 'postTweet') {
        tw.postTweet(a[0], a[1]);
        row.push('None');
      } else if (m === 'getNewsFeed') {
        const feed = tw.getNewsFeed(a[0]);
        row.push(JSON.stringify(feed).replace(/,/g, ', '));
      } else if (m === 'follow') {
        tw.follow(a[0], a[1]);
        row.push('None');
      } else if (m === 'unfollow') {
        tw.unfollow(a[0], a[1]);
        row.push('None');
      }
    }
    out.push(row.join(' '));
  }
  console.log(out.join('\n'));
}

solve();
