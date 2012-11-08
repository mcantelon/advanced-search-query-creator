function demo() {
  // create new form instance, providing a single row of default data
  var search = new advancedSearch.AdvancedSearchView({
    el: $('#search_form'),
    rows: [{
      'query': 'bob',
      'field': 'aipname'
    }]
  });

  if (search.urlParamsToData()) {
    alert('Setting row data from URL params...');
    search.rows = search.urlParamsToData();
  }

  // define op field
  search.addSelect('op', 'boolean operator', {title: 'boolean operator'}, {
    'and': 'and',
    'or': 'or',
    'not': 'not'
  });

  // define query field
  search.addInput('query', 'search query', {title: 'search query'});

  // default field name field
  search.addSelect('field', 'field name', {title: 'field name'}, {
    'aipname': 'AIP name',
    'filename': 'File name',
    'uuid': 'UUID'
  });

  // don't show first op field
  search.fieldVisibilityCheck = function(rowIndex, fieldName) {
    return rowIndex > 0 || fieldName != 'op';
  };

  search.render()

  // demonstrate conversion to URL params
  $('#search_submit_button').click(function (){
    window.location = window.location.pathname + '?' + search.toUrlParams();
  });
}
