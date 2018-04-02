riot.tag2('multiselect-columns-view', '<ul class="root"> <li class="floating-option"> <label for="{this.root.localName}-all"> <input id="{this.root.localName + \'-all\'}" name="{this.root.localName + \'-all\'}" type="checkbox" onclick="{selectUnselectAll}"> {select_all_message} </label> </li> <li class="column" each="{column in columns}"> <ul> <li each="{column.children}"> <label for="{name}" onclick="{showHideChildren}"> <input id="{this.root.localName + id}" name="{this.root.localName + id}" type="checkbox" onclick="{selectNode}"> {this[name_attribute]} </label> </li> </li> </li> </ul>', 'multiselect-columns-view ul.root,[data-is="multiselect-columns-view"] ul.root{ width: 100%; padding: 0; } multiselect-columns-view .column,[data-is="multiselect-columns-view"] .column{ display: inline-block; vertical-align: top; } multiselect-columns-view .column ul,[data-is="multiselect-columns-view"] .column ul{ padding: 0; width: 190px; } multiselect-columns-view .column ul li,[data-is="multiselect-columns-view"] .column ul li{ list-style: none; }', 'class="mtv-container"', function(opts) {
    this.instanceName = this.opts.instance_name || '-columns'
    this.column_width = parseInt(this.opts.column_width) || 200;
    this.rootChildren = JSON.parse(
      this.opts.json_columns_array ||
      multiselectColumnsViewDataHash
    );

    this.storage = new SelectedNodesStorage({
      debug: this.opts.debug,
      tagName: this.root.localName
    });

    this.observer = this.opts.observer;
    this.name_attribute = this.opts.name_attribute;
    this.select_all_message = this.opts.select_all_message;

    this.childrenIntoColumns = function () {
      const columnWidth = this.column_width;
      const width = this.root.querySelector('ul.root').offsetWidth - 20;
      var totalColumns = Math.round(width / columnWidth);
      var totalColumnsHasDecimal = (totalColumns % 1) > 0;
      totalColumns =  totalColumnsHasDecimal ? totalColumns + 1 : totalColumns;

      const allChildren = [...this.rootChildren].reverse();
      const childrenPerColumn = Math.round(allChildren.length / totalColumns);

      this.columns = [];

      for(var columnCounter = 0; columnCounter < totalColumns; columnCounter++) {
        this.columns.push({ children: []});
        let innerList = this.columns[columnCounter];
        let endChildrenLoopAt = childrenPerColumn;

        if (childrenPerColumn > allChildren.length) {
          endChildrenLoopAt = allChildren.length;
        }

        for(var childCounter = 0; childCounter < endChildrenLoopAt; childCounter++) {
          innerList.children.push(allChildren.pop());
        }
      }

      this.update();
    }

    this.on('mount', function (){
      this.childrenIntoColumns();

      window.addEventListener('resize', this.childrenIntoColumns.bind(this));
    })

    this.selectNode = function (e) {
      if (e.target.checked) {
        this.storage.addSelectedNode(e.item.id, e.item);
      } else {
        this.storage.removeSelectedNode(e.item.id);
      }

      this.observer.trigger('selected-update' + this.instanceName, {
        nodes: this.storage.selectedNodes(),
        ids: this.storage.selectedNodesIds()
      });
    }

    this.selectUnselectAll = function (e) {
      checkboxes = this.root.querySelectorAll('ul li input');

      checkboxes.forEach(function (checkbox) {
        if (e.target.checked && !checkbox.checked) {
          checkbox.click();
        } else if (!e.target.checked && checkbox.checked) {
          checkbox.click();
        }
      })
    }
});