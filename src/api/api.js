import Firebase from 'firebase';

const connection = new Firebase('https://hacker-news.firebaseio.com/v0/');

export class HackerNewsAPI {
  fetchTopStories() {
    return new Promise((resolve) => {
      this.topStoriesIdsRef().once('value', snapshot => {
        const topStoriesIds = snapshot.val().splice(0, 20);

        resolve(topStoriesIds);
      });
    });
  }

  fetchItems(items = []) {
    return new Promise(resolve => {
      const promises = [];

      items.forEach(itemId => {
        promises.push(new Promise((resolveItem) => {
          this.itemRef(itemId).on('value', value => {
            const item = value.val();

            resolveItem(item);
          });
        }));
      });

      Promise.all(promises).then(resolve);
    });
  }

  fetchUser(userId) {
    if (!userId) {
      return Promise.reject();
    }

    return new Promise(resolve => {
      this.userRef(userId).on('value', value => {
        const item = value.val();

        resolve(item);
      });
    });
  }

  topStoriesIdsRef() {
    return connection.child('topstories/');
  }

  itemRef(itemId) {
    return connection.child(`item/${itemId}`);
  }

  userRef(userId) {
    return connection.child(`user/${userId}`);
  }
}

let instance;
export default function getApiInstance() {
  if (!instance) {
    instance = new HackerNewsAPI();
  }
  return instance;
}
