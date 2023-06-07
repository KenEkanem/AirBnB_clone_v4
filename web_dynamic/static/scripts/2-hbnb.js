$(function (){
  let $amenChkbx = $('.amenities .popover input');
  let newMap = new Map();
  $amenChkbx.prop('checked', false);
  $amenChkbx.on('change', function (){
    if ($(this).prop('checked') === true)
      newMap.set($(this).data('id'), $(this).data('name'));
    else
      newMap.delete($(this).data('id'));
    let list = new Array(...newMap.values());
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
  $.ajax({
    type: 'GET',
    url: 'http://0.0.0.0:5001/api/v1/status/',
    success: function (api_status){
      if (api_status.status === 'OK')
        $('#api_status').addClass('available');
      else
        $('#api_status').removeClass('available');
    }
  });
});
