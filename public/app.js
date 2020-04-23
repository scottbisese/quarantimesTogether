'use strict';
console.log('chart.js is running');

  //event listener
  $('select').change(hideElement);
  let $section = $('<section>').attr('data-keyword', story.category);
  
  //hidey filter gafiltafish
   function hideElement() { 
   let value = $(this).val(); 
   console.log(value);
    {  
     $('section').hide();    
     $(`section.${value}`).slideDown(888); 
     }                                       
  }