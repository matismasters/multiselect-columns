# Multiselect Columns View

...

Notes:

...
 
## Usage

You can also check the basic usage on the `public/index.html` file.

- Remember to add riot.js to the page
- Remember to load the file at js/multiselect-tree.js with the <script></script>
- Remember to mount the tag

```html

<script src="riot.js"></script>

<multiselect-columns-view
    name_attribute="label-attribute-name-within-data-hash"
    debug="false"
    json_nodes_hash=""
></multiselect-tree-view>

<!-- Generic selected nodes storage class. Handles add/remove logic -->
<script src="/js/selected-nodes-storage.js"></script>

<!-- Main tag file -->
<script src="/js/multiselect-columns-view.js"></script>

<script>
    riot.mount('multiselect-columns-view', { 
        observer: new MultiselectColumnsObserver() // Implement your own and/or change the class name!!
    });
</script>
```

## Input Hash format

```javascript
```