class Twitter {
    constructor() {
        this.time = 0;
        this.tweets = new Map();
        this.following = new Map();
    }

    postTweet(userId, tweetId) {
        if (!this.tweets.has(userId)) {
            this.tweets.set(userId, []);
        }
        this.tweets.get(userId).push({ time: this.time++, tweetId });
    }

    getNewsFeed(userId) {
        let feed = [];
        if (this.tweets.has(userId)) {
            feed.push(...this.tweets.get(userId));
        }
        if (this.following.has(userId)) {
            for (let followeeId of this.following.get(userId)) {
                if (this.tweets.has(followeeId)) {
                    feed.push(...this.tweets.get(followeeId));
                }
            }
        }
        feed.sort((a, b) => b.time - a.time);
        return feed.slice(0, 10).map(t => t.tweetId);
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

var solve = function(ops, vals) {
    let obj = null;
    let res = [];
    for (let i = 0; i < ops.length; i++) {
        if (ops[i] === "Twitter") {
            obj = new Twitter();
            res.push(null);
        } else if (ops[i] === "postTweet") {
            obj.postTweet(vals[i][0], vals[i][1]);
            res.push(null);
        } else if (ops[i] === "getNewsFeed") {
            res.push(obj.getNewsFeed(vals[i][0]));
        } else if (ops[i] === "follow") {
            obj.follow(vals[i][0], vals[i][1]);
            res.push(null);
        } else if (ops[i] === "unfollow") {
            obj.unfollow(vals[i][0], vals[i][1]);
            res.push(null);
        }
    }
    return res;
};

if (require.main === module) {
    const fs = require('fs');
    try {
        const raw = fs.readFileSync(0, 'utf-8').trim();
        if (raw) {
            const lines = raw.split(/\r?\n/).filter(Boolean);
            let ops = JSON.parse(lines[0]);
            let vals = JSON.parse(lines[1]);
            console.log(JSON.stringify(solve(ops, vals)));
        }
    } catch (err) {
        console.error('Local runner error:', err.message);
    }
}

module.exports = solve;
