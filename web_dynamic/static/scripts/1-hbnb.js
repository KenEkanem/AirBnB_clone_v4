$(function (){
  let $amenChkbx = $('.amenities .popover input');
  let newMap = new Map();
  $amenChkbx.on('change', function (){
    let list = Array();
    if ($(this).prop('checked') === true)
      newMap.set($(this).data('id'), $(this).data('name'));
    else
      newMap.delete($(this).data('id'));
    for (item of newMap.values()){
      list.push(item);
    }
    amenStr = list.join(', ');
    if (amenStr.length > 30)
      amenStr = amenStr.slice(0, 30) + '...';
    if (list.length > 0){
      $('.amenities h4').text(amenStr);
    }
    else {
      $('.amenities h4').prop('outerHTML', '<h4>&nbsp;</h4>');
    }
  });
})
