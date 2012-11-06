function demo() {
  var search = new advancedSearch.AdvancedSearchView({
    el: $('#search_form'),
    data: [{
      'op[]': 'or',
      'query[]': 'bob',
      'field[]': 'aipname'
    }]
  });

  search.addSelect('op[]', 'boolean operator', {title: 'boolean operator'}, {
    'and': 'and',
    'or': 'or',
    'not': 'not'
  });

  search.addInput('query[]', 'search query', {title: 'search query'});

  search.addSelect('field[]', 'field name', {title: 'field name'}, {
    'aipname': 'AIP name',
    'filename': 'File name',
    'uuid': 'UUID'
  });

  $('body').append(search.render());

  $('#url_conversion_button').click(function (){
    $('#url_result').text(search.toUrlParams());
  });
}
