# Multiselect Columns View

This Riot.js tag takes an array of elements and renders it in several columns. The columns width is calculated from the total container width, and inside each columns the items of the array are stacked following the order in the array, filling one column after the other from left to right. The selected Nodes, and their respective Ids are saved and exposed by triggering the `selected-nodes` event, on the passed Observer.

Notes:
- You can specify the column width that will be used to calculate how many columns, if you do that, remember to override the style `multiselect-columns-view .column ul`, and set the `column_width` param to the amount of pixels you want.

## Usage

You can also check the basic usage on the `public/index.html` file.

- Remember to add riot.js to the page
- Remember to load the file at js/selected-nodes-storage.js with the <script></script>
- Remember to load the file at js/multiselect-columns-view.js with the <script></script>
- Remember to mount the tag

```html

<script src="riot.js"></script>

<multiselect-columns-view
    name_attribute="label-attribute-name-within-data-hash"
    select_all_message="select-all-label-text"
    debug="true"
    json_columns_array=""
    column_width="200"
></multiselect-tree-view>

<!-- Generic selected nodes storage class. Handles add/remove logic -->
<script src="/js/selected-nodes-storage.js"></script>

<!-- Include observer class -->
<script src="/js/multiselect-columns-observer.js"></script>

<!-- Main tag file -->
<script src="/js/multiselect-columns-view.js"></script>

<script>
    riot.mount('multiselect-columns-view', { 
        observer: new MultiselectColumnsObserver() // Implement your own and/or change the class name!!
    });
</script>
```

## Input Hash format

The tag expects each item to have an `id` attribute, and name or label attribute to show in the checkbox label. You can set this last one as a param

```javascript

[{
  id: 101,
  label: 'an-option-label',
  ...
}, {
  id: 102,
  label: 'other-option-label'
  ...
},
...
]

```

There are two ways of feeding the array data to the tag:

1- (preferred) Pass it as a tag param in json format
2- Save a global variable called multiselectColumnsViewDataHash with the array data as a JSON string