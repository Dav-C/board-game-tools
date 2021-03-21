//  on page load - check for an active tool menu and set it to visible
if (localStorage.getItem('activeTool')) {
    let activeTool= localStorage.getItem('activeTool');
    $(activeTool).css({'display': 'inline'});
}


// Open and Close the add session modal box on user_home.html
$('#OpenCreateToolSessionModalBtn').click(function() {
    'use strict';
    $('#CreateToolSessionFormWrapper').css({'visibility': 'visible', 'opacity': '1'});
});
$('#CreateToolSessionFormCancelBtn').click(function() {
    'use strict';
    $('#CreateToolSessionFormWrapper').css({'visibility': 'hidden', 'opacity': '0'});
});

// Open and Close the tool selection menu on tool_session_detail.html
$('#OpenToolSelectionMenuBtn').click(function() {
    'use strict';
    $('#ToolSelectionMenu').css({'top': '0', 'visibility': 'visible'});
});
$('#CloseToolSelectionMenuBtn').click(function() {
    'use strict';
    $('#ToolSelectionMenu').css({'top': '-90vh', 'visibility': 'hidden'});
});

// Open and Close various forms for adding tools via the tool selection menu on tool_session_detail.html
$('#AddHpTrackerOpenFormBtn').click(function() {
    'use strict';
    $('#AddHpTrackerForm').trigger('reset');
    $('#AddHpTrackerFormWrapper').css({'visibility': 'visible', 'opacity': '1'});
    $('#ToolSelectionMenuCover').css({'display': 'inline', 'position': 'absolute', 'opacity': '70%'});
});
$('#AddHpTrackerFormCancelBtn').click(function() {
    'use strict';
    $('#AddHpTrackerFormWrapper').css({'visibility': 'hidden', 'opacity': '0'});
    $('#ToolSelectionMenuCover').css({'display': 'none', 'position': 'absolute', 'opacity': '0'});
});

// Set active tool windows to visible and reloads the page so newly added tools are loaded from the database
function setActiveTool(activeToolWrapperClass) {
    'use strict';
    // Hide the menu and set local storage to carry through the reload
    $('#ToolSelectionMenu').css({'top': '-90vh', 'visibility': 'hidden'});
    localStorage.setItem('activeTool', activeToolWrapperClass);
    // Wait for the menu to close then reload the page
    setTimeout(function(){
        window.location.reload(true);
        }, 500);
}

// Set the Hp Trackers to the active tool
$("#OpenHpTrackersBtn").click(function () {
    'use strict';
    setActiveTool('#HpTrackersViewWrapper.tool-body');
});

// controls ajax requests when submitting forms that create new tools
function newToolsFormSubmit(form, form_wrapper, tool_view_btn) {
    'use strict';
    $(form).submit(function (e) {
        // preventing from page reload and default actions
        e.preventDefault();
        // serialize the form data.
        let serializedData = $(form).serialize();
        // make POST ajax call
        $.ajax({
            type: 'POST',
            url: $(form).attr('action'),
            data: serializedData,
            success: function () {
                // remove the dark menu cover and hide the form
                $('#ToolSelectionMenuCover').css({'display': 'none', 'position': 'absolute', 'opacity': '0'});
                $(form_wrapper).css({'visibility': 'hidden', 'opacity': '0'});
                $(tool_view_btn).addClass('button-visible');
                console.log('ajaxSuccess');
            },
            error: function (response) {
                console.log(response["responseJSON"]["error"]);
            }
        });
    });
}

// ajax function calls for adding new tools
$("#AddHpTrackerForm").submit(newToolsFormSubmit(
    '#AddHpTrackerForm',
    '#AddHpTrackerFormWrapper',
    '#OpenHpTrackersBtn'
));




// {#ajax call for HpValueForm#}
$('.hp-value-change-form').submit(function(e) {
    'use strict';
    e.preventDefault();
    let data_id = $(this).attr("data-id");
    // serialize the form data.
    let serializedData = $(this).serialize();
    // make POST ajax call
    $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: serializedData,
        success: function (response) {
            let form_instance = JSON.parse(response['form_instance']);
            let fields = form_instance[0]['fields'];
            $("#" + data_id + "-HpValue").empty().prepend(fields.hp_value);
            console.log('ajaxSuccess');
        },
        error: function (response) {
            console.log(response["responseJSON"]["error"]);
        }
    });
});



// {#control timeout before hp_value increase or decrease is submitted#}
localStorage.setItem('hp_change_value', '0');
let timeoutHandler;

function timeoutControl(element) {
    'use strict';
    clearTimeout(timeoutHandler);
    // select the closest for to the clicked button
    let selector = $(element).closest('.hp-value-change-form');

    // assign the unique django object id to a variable
    let data_id = selector.attr("data-id");

    // get the hp change value from local storage
    let hp_change_value = parseInt(localStorage.getItem('hp_change_value'));

    // get the current hp value being provided by django context
    let hp_initial_value = parseInt($("#" + data_id + "-HpValue").text());

    // calculate the amount to be entered into the hp value change form
    let hp_add_subtract_value = hp_initial_value + hp_change_value;

    // After a 2 second delay submit the form and reset the change value to 0
    timeoutHandler = setTimeout(function () {
        $('#' + data_id + '-HpValueInput input').val(hp_add_subtract_value);
        $('#' + data_id + '-HpValueForm').submit();
        $('#' + data_id + '-HpValueChange').css({'display': 'none'});
        $('#' + data_id + '-HpValueChangeCover').css({'display': 'none'});
        localStorage.setItem('hp_change_value', '0');
    }, 2000);
}
// increase the hp value with each button click - value is not submitted until
// after a 2 second delay via timeoutControl()
$('.hp-value-change-btn.increase').click(function (e) {
    'use strict';
    let selector = $(this).closest('.hp-control-box');
    let hp_change_value = parseInt(localStorage.getItem('hp_change_value'));
    hp_change_value++;
    localStorage.setItem('hp_change_value', hp_change_value.toString());
    $(selector.find('.hp-change-value')).css({'display': 'inline'});
    $(selector.find('.hp-change-value-cover')).css({'display': 'inline'});
    $(selector.find('.hp-change-value')).empty().prepend(hp_change_value);
    timeoutControl(this);

});

// decrease the hp value with each button click - value is not submitted until
// after a 2 second delay via timeoutControl()
$('.hp-value-change-btn.decrease').click(function (e) {
    'use strict';
    let selector = $(this).closest('.hp-control-box');
    let hp_change_value = parseInt(localStorage.getItem('hp_change_value'));
    hp_change_value--;
    localStorage.setItem('hp_change_value', hp_change_value.toString());
    $(selector.find('.hp-change-value')).css({'display': 'inline'});
    $(selector.find('.hp-change-value-cover')).css({'display': 'inline'});
    $(selector.find('.hp-change-value')).empty().prepend(hp_change_value);
    timeoutControl(this);

});

console.log('this application has been brought to you by David Cates.');




















// DATA DUMP
// {#ajax call for HpValueForm#}
//                     function changeHpValue(form) {
//                         'use strict';
//                         $(form).submit(function (e) {
//                             // preventing from page reload and default actions
//                             e.preventDefault();
//                             // serialize the form data.
//                             let serializedData = $(form).serialize();
//                             // make POST ajax call
//                             $.ajax({
//                                 type: 'POST',
//                                 url: '{% url 'hp_change_value' hp_tracker.id %}',
//                                 data: serializedData,
//                                 success: function (response) {
//                                     let form_instance = JSON.parse(response['form_instance']);
//                                     let fields = form_instance[0]['fields'];
//                                     $('#{{hp_tracker.id}}-HpValue').empty().prepend(fields.hp_value);
//                                     console.log('ajaxSuccess');
//                                 },
//                                 error: function (response) {
//                                     console.log(response["responseJSON"]["rror"]);
//                                 }
//                             });
//                         });
//                     }
//
//                     {#control timeout before hp_value increase or decrease is submitted#}
//                     let hp_add_subtract_value = $('#{{hp_tracker.id}}-HpValue').text(),
//                         hp_change_value = 0,
//                         timeoutHandler;
//                     function timeoutControl() {
//                         clearTimeout(timeoutHandler);
//                         timeoutHandler = setTimeout(function () {
//                             $('#{{ hp_tracker.id }}-HpValueInput input').val(hp_change_value);
//                             $('#{{ hp_tracker.id }}-HpValueForm').submit();
//                             $('#{{hp_tracker.id}}-HpChangeValue').css({'display': 'none'});
//                             $('#{{hp_tracker.id}}-HpChangeValueCover').css({'display': 'none'});
//                             hp_change_value = 0;
//                             $('#{{hp_tracker.id}}-HpChangeValue').empty().prepend(hp_change_value);
//                         }, 2000);
//                     }
//                     {#increase the hp value#}
//                     $('#{{ hp_tracker.id }}-HpValueIncreaseBtn').click(function (e) {
//                         'use strict';
//                         hp_add_subtract_value++;
//                         hp_change_value++;
//                         $('#{{hp_tracker.id}}-HpChangeValue').css({'display': 'inline'});
//                         $('#{{hp_tracker.id}}-HpChangeValueCover').css({'display': 'inline'});
//                         $('#{{hp_tracker.id}}-HpChangeValue').empty().prepend(hp_change_value);
//                         timeoutControl();
//                     });
//
//                     {#decrease the hp value#}
//                     $('#{{ hp_tracker.id }}-HpValueDecreaseBtn').click(function (e) {
//                         'use strict';
//                         hp_add_subtract_value--;
//                         hp_change_value--;
//                         $('#{{hp_tracker.id}}-HpChangeValue').css({'display': 'inline'});
//                         $('#{{hp_tracker.id}}-HpChangeValueCover').css({'display': 'inline'});
//                         $('#{{hp_tracker.id}}-HpChangeValue').empty().prepend(hp_change_value);
//                         timeoutControl();
//                     });
//
//                     {#submit HpValueForm#}
//                     $('#{{ hp_tracker.id }}-HpValueForm').on('submit', changeHpValue('#{{ hp_tracker.id }}-HpValueForm'));


