import Firebase from 'firebase';

const connection = new Firebase('https://hacker-news.firebaseio.com/v0/');

export class HackerNewsAPI {
  constructor() {
    this.fetchTopStories = this.fetchRef.bind(this, this.topStoriesIdsRef());
    this.fetchAskStories = this.fetchRef.bind(this, this.askStoriesRef());
    this.fetchShowStories = this.fetchRef.bind(this, this.showStoriesRef());
    this.fetchJobStories = this.fetchRef.bind(this, this.jobStoriesRef());
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

  fetchRef(connectionRef) {
    return new Promise((resolve) => {
      connectionRef.once('value', snapshot => {
        const topStoriesIds = snapshot.val().splice(0, 20);

        resolve(topStoriesIds);
      });
    });
  }

  itemRef(itemId) {
    return connection.child(`item/${itemId}`);
  }

  userRef(userId) {
    return connection.child(`user/${userId}`);
  }

  topStoriesIdsRef() {
    return connection.child('topstories/');
  }

  askStoriesRef() {
    return connection.child('askstories/');
  }

  showStoriesRef() {
    return connection.child('showstories/');
  }

  jobStoriesRef() {
    return connection.child('jobstories/');
  }
}

let instance;
export default function getApiInstance() {
  if (!instance) {
    instance = new HackerNewsAPI();
  }
  return instance;
}
