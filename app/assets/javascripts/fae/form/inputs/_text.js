/* global Fae */

'use strict';

Fae.form.text = {

  init: function() {
    this.slugger();
  },

  slugger: function() {
    var $slugger = $('.slug').closest('form').find('.slugger');
    var $slug = $slugger.closest('form').find('.slug');
    var $select_slugger = $('.select.slugger');
    this._prep_slug($slug, $slugger, $select_slugger);
  },

  _prep_slug: function($slug, $slugger, $select_slugger) {
    var slug_text = null;
    var _this = this;

    if ($slug.val() !== '') {
      $slugger.removeClass('slugger');
    } else {
      $slugger.keyup(function(){
        slug_text = _this._digest_slug($slugger);
        $slug.val(slug_text);
      });
      if ($select_slugger.length) {
        $select_slugger.change(function(){
          slug_text = _this._digest_slug($slugger);
          $slug.val(slug_text);
        });
      };
    }
  },

  _digest_slug: function($slugger) {
    var slug_text = []
    $slugger.each(function() {
      var $this = $(this);
      if ($this.val().length > 0) {
        if ($this.is("input")) {
          slug_text.push($this.val());
        } else {
          slug_text.push($this.find("option:selected").text());
        }
      }
    })
    slug_text = slug_text
      .join(' ')
      .toLowerCase()
      .replace(/(\\)|(\')|(\.)/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/(-$)|(^-)/g, '');
    return slug_text;
  },

};