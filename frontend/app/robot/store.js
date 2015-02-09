// IMPORTS =========================================================================================
let Request = require("superagent");
let Reflux = require("reflux");
let Faker = require("faker");
let Helpers = require("../common/helpers");
let Actions = require("./actions");

// EXPORTS =========================================================================================
module.exports = Reflux.createStore({
  // this will set up listeners to all publishers in TodoActions, using onKeyname (or keyname) as callbacks
  listenables: [Actions],

  init() {
    this.state = {};
  },

  // called whenever we change a list. normally this would mean a database API call
  setState(state) {
    //localStorage.setItem(localStorageKey, JSON.stringify(list));
    // if we used a real database, we would likely do the below in a callback
    this.state = state;
    console.log("!!! state:", this.state);
    this.trigger(state); // sends the updated list to all listening components (TodoApp)
  },

  onAddRandom() {
    let robot = this.generateRandom(Helpers.maxId(this.state.models));
    console.log("!!! random robot:", robot);
    this.setState({
      models: this.state.models.concat([robot])
    });
  },

  getInitialState() {
    return {
      models: [],
    };

    /*
    var loadedList = localStorage.getItem(this.localStorageKey);
    if (!loadedList) {
      // If no list is in localstorage, start out with a default one
      this.list = [{
        key: this.todoCounter += 1,
        created: new Date(),
        isComplete: false,
        label: "Rule the web"
      }];
    } else {
      this.list = JSON.parse(loadedList).map(item => {
        // just resetting the key property for each todo item
        item.key = this.todoCounter;
        this.todoCounter += 1;
        return item;
      });
    }
    return this.list;
    */
  },

  addRobot(data) {
    // TODO make model from data ?!
    console.debug(">>> robotStore.addRobot");
    console.debug(">>> Got data", data);
    this.setState({
      models: this.state.models.concat([data]),
    });
    /*
    //localStorage.setItem(localStorageKey, JSON.stringify(list));
    this.models = Helpers.addModel(this.state.models, data);
    Request
      .post("/robots")
      .set("Content-Type", "application/json")
      .send(JSON.stringify(data))
      .end(function(res) {
        if (res.ok) {
          alert("Yay got " + JSON.stringify(res.body));
          this.trigger(this.state.models);
        } else {
          // TODO pull data back ?!
          alert("Oh no! Error " + res.text);
        }
      });*/
  },

  editRobot(data) {
    // TODO make model from data ?!
    //localStorage.setItem(localStorageKey, JSON.stringify(list));
    console.log('edit Robot inm store');
    this.setState({
      models: this.state.models.concat([data]),
    });
    var robot = getModel(this.state.models, data.id);
    if (robot) {
      Helpers.updateModel(this.state.models, data);
      Request
        .put("/robots/" + data.id)
        .set("Content-Type", "application/json")
        .send(JSON.stringify(data))
        .end(function(res) {
          if (res.ok) {
            alert("Yay got " + JSON.stringify(res.body));
            this.trigger(this.state.models);
          } else {
            // TODO pull data back ?!
            alert("Oh no! Error " + res.text);
          }
        });
    } else {
      alert("Not found robot with id " + data.id + "!");
    }
  },

  //onRemoveItem(itemKey) {
  //  this.updateList(_.filter(this.list,function(item){
  //    return item.key!==itemKey;
  //  }));
  //},

  //onToggleItem(itemKey) {
  //  var foundItem = getItemByKey(this.list,itemKey);
  //  if (foundItem) {
  //    foundItem.isComplete = !foundItem.isComplete;
  //    this.updateList(this.list);
  //  }
  //},

  //onToggleAllItems(checked) {
  //  this.updateList(_.map(this.list, function(item) {
  //    item.isComplete = checked;
  //    return item;
  //  }));
  //},

  //onClearCompleted() {
  //  this.updateList(_.filter(this.list, function(item) {
  //    return !item.isComplete;
  //  }));
  //},

  // HELPERS ---------------------------------------------------------------------------------------
  generateRandom(maxId=0) {
    return {
      id: maxId + 1,
      fullname: Faker.name.findName(),
    };
  },
});
