class FoodHeap {
  constructor() {
    this.data = [];
  }
  less(a, b) {
    if (a.rating !== b.rating) return a.rating < b.rating;
    return a.food > b.food;
  }
  push(val) {
    this.data.push(val);
    let i = this.data.length - 1;
    while (i > 0) {
      let p = (i - 1) >> 1;
      if (this.less(this.data[p], this.data[i])) {
        let tmp = this.data[i];
        this.data[i] = this.data[p];
        this.data[p] = tmp;
        i = p;
      } else break;
    }
  }
  pop() {
    if (this.data.length === 0) return null;
    const top = this.data[0];
    const end = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = end;
      let i = 0;
      while ((i << 1) + 1 < this.data.length) {
        let l = (i << 1) + 1, r = l + 1, best = l;
        if (r < this.data.length && this.less(this.data[l], this.data[r])) best = r;
        if (this.less(this.data[i], this.data[best])) {
          let tmp = this.data[i];
          this.data[i] = this.data[best];
          this.data[best] = tmp;
          i = best;
        } else break;
      }
    }
    return top;
  }
  peek() {
    return this.data.length > 0 ? this.data[0] : null;
  }
}

var FoodRatings = function(foods, cuisines, ratings) {
  this.foodMap = new Map();
  this.cuisineMap = new Map();

  for (let i = 0; i < foods.length; i++) {
    const food = foods[i];
    const cuisine = cuisines[i];
    const rating = ratings[i];

    this.foodMap.set(food, { cuisine, rating });

    if (!this.cuisineMap.has(cuisine)) {
      this.cuisineMap.set(cuisine, new FoodHeap());
    }
    this.cuisineMap.get(cuisine).push({ food, rating });
  }
};

FoodRatings.prototype.changeRating = function(food, newRating) {
  const entry = this.foodMap.get(food);
  entry.rating = newRating;
  this.cuisineMap.get(entry.cuisine).push({ food, rating: newRating });
};

FoodRatings.prototype.highestRated = function(cuisine) {
  const heap = this.cuisineMap.get(cuisine);
  while (heap.peek()) {
    const top = heap.peek();
    const cur = this.foodMap.get(top.food);
    if (top.rating === cur.rating) {
      return top.food;
    }
    heap.pop();
  }
  return '';
};

if (require.main === module) {
  const fs = require('fs');
  const raw = fs.readFileSync(0, 'utf-8').trim();
  if (raw) {
    const lines = raw.split(/\r?\n/).filter(Boolean);
    const methods = JSON.parse(lines[0]);
    const args = JSON.parse(lines[1]);
    let obj = null;
    const res = [];
    for (let i = 0; i < methods.length; i++) {
      if (methods[i] === 'FoodRatings') {
        obj = new FoodRatings(args[i][0], args[i][1], args[i][2]);
        res.push(null);
      } else if (methods[i] === 'changeRating') {
        obj.changeRating(args[i][0], args[i][1]);
        res.push(null);
      } else if (methods[i] === 'highestRated') {
        res.push(obj.highestRated(args[i][0]));
      }
    }
    console.log(JSON.stringify(res));
  }
}

module.exports = FoodRatings;
