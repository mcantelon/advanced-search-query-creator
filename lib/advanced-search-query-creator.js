(function(exports) {

  exports.AdvancedSearchView = Backbone.View.extend({

    initialize: function(data) {
      this.data = data;
      this.rows = [];
      this.fields = [];
      this.optionElements = {};
    },

    addSelect: function(name, label, attributes, options) {
      this.fields.push(name);
      this.optionElements[name] = this.createElement('select', label, attributes, options);
    },

    createElement: function(type, label, attributes, options) {
      var $el = $('<' + type + '>');

      for(var key in attributes) {
        $el.attr(key, attributes[key]);
      }

      for(var value in options) {
        $el.append(
          $('<option></option>').val(value).html(options[value])
        );
      }

      return $el;
    },

    generateBlankRow: function() {
      var row = {};

      for(var fieldIndex in this.fields) {
        var fieldName = this.fields[fieldIndex]
        row[fieldName] = '';
      }

      return row;
    },

    addBlankRow: function() {
      this.rows.push(this.generateBlankRow());
    },

    deleteRow: function(delIndex) {
      var newRows = [];

      for(var rowIndex in this.rows) {
        if (rowIndex != delIndex) {
          newRows.push(this.rows[rowIndex]);
        }
      }

      this.rows = newRows;
    },

    render: function() {
      var self = this;

      // if no data provided, create blank row
      if (this.data == undefined) {
        this.rows = [];
        this.addBlankRow();
      }

      var $el = $('<div></div>');

      // add each row
      for(var rowIndex in this.rows) {
        var $row = $('<div style="clear:both"></div>');

        // add each field 
        for(var fieldIndex in this.fields) {
          var fieldName = this.fields[fieldIndex];
          var value = this.rows[rowIndex][fieldName];
          var $fieldContainer = $('<div style="float:left"></div>');
          var $field = $(this.optionElements[fieldName]).clone();
          $fieldContainer.append($field);
          $row.append($fieldContainer);
        }

        // add button to delete row
        var $rowDelEl = $('<div style="float:left">x</div>');
        $rowDelEl.click(function() {
          self.deleteRow(rowIndex);
          self.render();
        });
        $row.append($rowDelEl);

        $el.append($row);
      }

      var $addBlankEl = $('<div style="clear:both">Add New</div>');
      $addBlankEl.click(function() {
        self.addBlankRow();
        self.render();
      });
      $el.append($addBlankEl);

      $(this.el)
        .empty()
        .append($el);

      return this;
    }
  });

})(typeof exports === 'undefined' ? this['advancedSearch'] = {} : exports);
