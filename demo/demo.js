function demo() {
  // create new form instance, providing a single row of default data
  var search = new advancedSearch.AdvancedSearchView({
    el: $('#search_form'),
    rows: [{
      'query': 'bob',
      'field': 'aipname'
    }]
  });

  // define search op field
  search.addSelect('op', {title: 'boolean operator'}, {
    'and': 'and',
    'or': 'or',
    'not': 'not'
  });

  // define search text field
  search.addInput('query', {title: 'search query'});

  // define search field name field
  search.addSelect('field', {title: 'field name'}, {
    'aipname': 'AIP name',
    'filename': 'File name',
    'uuid': 'UUID'
  });

  // define field visibility logic (in this case don't show first op field)
  search.fieldVisibilityCheck = function(rowIndex, fieldName) {
    return rowIndex > 0 || fieldName != 'op';
  };

  // with fields and field visibility defined, search form state can be
  // derived from URL parameter (making it easy to initialize the search
  // form after a page reload
  if (search.urlParamsToData()) {
    alert('Setting row data from URL params...');
    search.rows = search.urlParamsToData();
  }

  // render search form
  search.render()

  // demonstrate conversion to URL params
  $('#search_submit_button').click(function (){
    window.location = window.location.pathname + '?' + search.toUrlParams();
  });
}
