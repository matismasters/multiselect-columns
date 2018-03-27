class MultiselectColumnsObserver {
  /* 
    This is just an example class without real code. Use as template
    for handling your callbacks from MultiselectColumnsObserver
  */

  constructor() {
    riot.observable(this);
    this.listenToSelectedUpdate();
  }

  listenToSelectedUpdate() {
    this.on('selected-update', function (data) {
      console.log('Nodes: ' + data.nodes);
      console.log('Ids: ' + data.ids);
    })
  }
}