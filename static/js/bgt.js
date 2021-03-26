//  on page load - check for an active tool menu and set it to visible
if (localStorage.getItem('activeTool')) {
    let activeTool= localStorage.getItem('activeTool');
    $(activeTool).css({'display': 'flex'});
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
    $('#ToolSessionPageHeader').css({'display': 'none'});
});
$('#CloseToolSelectionMenuBtn').click(function() {
    'use strict';
    $('#ToolSelectionMenu').css({'top': '-90vh', 'visibility': 'hidden'});
    setTimeout(function(){
    $('#ToolSessionPageHeader').css({'display': 'flex'});
    window.location.reload(true);
    }, 275);
});

// reveal the dark cover over the menu when add tool forms are opened
function openMenuCover() {
    $('#ToolSelectionMenuCover').css({
    'display': 'inline',
    'position': 'absolute',
    'opacity': '70%'
    });
}
// close the dark cover over the menu when add tool forms are closed
function closeMenuCover() {
    $('#ToolSelectionMenuCover').css({
    'display': 'none',
    'position': 'absolute',
    'opacity': '0'
    });
}
// Open and Close various forms for adding tools via the tool selection menu on
// tool_session_detail.html
$('#AddHpTrackerOpenFormBtn').click(function() {
    'use strict';
    $('#AddHpTrackerForm').trigger('reset');
    $('#AddHpTrackerFormWrapper').css({'visibility': 'visible', 'opacity': '1'});
    openMenuCover();
});
$('#AddHpTrackerFormCancelBtn').click(function() {
    'use strict';
    $('#AddHpTrackerFormWrapper').css({'visibility': 'hidden', 'opacity': '0'});
    closeMenuCover();
});
$('#AddDieGroupOpenFormBtn').click(function() {
    'use strict';
    $('#AddDieGroupForm').trigger('reset');
    $('#AddDieGroupFormWrapper').css({'visibility': 'visible', 'opacity': '1'});
    openMenuCover();
});
$('#AddDieGroupFormCancelBtn').click(function() {
    'use strict';
    $('#AddDieGroupFormWrapper').css({'visibility': 'hidden', 'opacity': '0'});
    closeMenuCover();
});

// Set active tool windows to visible and reloads the page so newly added tools
// are loaded from the database
function setActiveTool(activeToolWrapperClass) {
    'use strict';
    // Hide the menu and set local storage to carry through the reload
    $('.tool-body').css({'display': 'none'});
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
// Set the Die Groups to the active tool
$("#OpenDieGroupsBtn").click(function () {
    'use strict';
    setActiveTool('#DieGroupsViewWrapper.tool-body');
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
                $('#ToolSelectionMenuCover').css({
                    'display': 'none',
                    'position': 'absolute',
                    'opacity': '0'
                });
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
$("#AddDieGroupForm").submit(newToolsFormSubmit(
    '#AddDieGroupForm',
    '#AddDieGroupFormWrapper',
    '#OpenDieGroupsBtn'
));


// HP TRACKER CONTROL

// {#control timeout before hp_value increase or decrease is submitted#}
localStorage.setItem('hp_change_value', '0');
let timeoutHandler;

function timeoutControl(element) {
    'use strict';
    clearTimeout(timeoutHandler);
    // select the closest for to the clicked button
    let selector = $(element).closest('.hp-change-value-form');

    // assign the unique django object id to a variable
    let data_id = selector.attr("data-id");

    // get the hp change value from local storage
    let hp_change_value = parseInt(localStorage.getItem('hp_change_value'));

    // get the current hp value being provided by django context
    let hp_initial_value = parseInt($("#" + data_id + "-HpValue").text());

    // calculate the amount to be entered into the hp value change form
    let hp_add_subtract_value = hp_initial_value + hp_change_value;

    // get the title of the hp tracker to submit with the form so its not set
    // to an empty string when the form posts.
    let title_box = $("#" + data_id + "-HpTrackerTitle");

    // After a 2 second delay submit the form and reset the change value to 0
    timeoutHandler = setTimeout(function () {
        $('#' + data_id + '-HpValueInput input').val(hp_add_subtract_value);
        $('#' + data_id + '-HpTrackerTitleInput input').val(title_box.text());
        $('#' + data_id + '-HpChangeValueForm').submit();
        $('#' + data_id + '-HpValueChange').css({'display': 'none'});
        $('#' + data_id + '-HpValueChangeCover').css({'display': 'none'});
        localStorage.setItem('hp_change_value', '0');
    }, 2000);
}

// decrease the hp value with each button click - value is not submitted until
// after a 2 second delay via timeoutControl()
$('.hp-value-change-btn.decrease').click(function () {
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

// increase the hp value with each button click - value is not submitted until
// after a 2 second delay via timeoutControl()
$('.hp-value-change-btn.increase').click(function () {
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



// change the title of an hp tracker
$('.hp-tracker-title').click(function() {
    'use strict';
    let selector = $(this).closest('form');
    let data_id = selector.attr("data-id");
    let hp_tracker_title_box = $("#" + data_id + "-HpTrackerTitle");
    let hp_tracker_title_input = $('#' + data_id + '-HpTrackerTitleInput');
    let hp_value_increase_btn = $('#' + data_id + '-HpValueIncreaseBtn');
    let hp_value_decrease_btn = $('#' + data_id + '-HpValueDecreaseBtn');
    let confirm_hp_title_change_btn = $('#' + data_id + '-ConfirmHpTitleChangeBtn');
    let cancel_hp_title_change_btn = $('#' + data_id + '-CancelHpTitleChangeBtn');
    let hp_tracker_value_change_buttons = $('.hp-value-change-btn');
    let hp_value_input = $('#' + data_id + '-HpValueInput input');
    let hp_value = parseInt($("#" + data_id + "-HpValue").text());
    let hp_tracker_delete_btn = $('#' + data_id + '-HpTrackerDeleteBtn');



    function revealHpTitleChangeBtns() {
        hp_tracker_title_box.css({'display': 'none'});
        hp_tracker_title_input.css({'display': 'inline', 'background-color': '#555555'});
        hp_value_increase_btn.css({'display': 'none'});
        hp_value_decrease_btn.css({'display': 'none'});
        confirm_hp_title_change_btn.css({'display': 'inline'});
        cancel_hp_title_change_btn.css({'display': 'inline'});
        hp_tracker_delete_btn.css({'display': 'inline'});
        hp_tracker_value_change_buttons.prop('disabled', true);
    }

    function hideHpTitleChangeBtns() {
        hp_tracker_title_box.css({'display': 'inline'});
        hp_tracker_title_input.css({'display': 'none'});
        hp_value_increase_btn.css({'display': 'inline'});
        hp_value_decrease_btn.css({'display': 'inline'});
        confirm_hp_title_change_btn.css({'display': 'none'});
        cancel_hp_title_change_btn.css({'display': 'none'});
        hp_tracker_delete_btn.css({'display': 'none'});
        hp_tracker_value_change_buttons.prop('disabled', false);
    }

    revealHpTitleChangeBtns();
    hp_tracker_title_input.children('input').val(hp_tracker_title_box.text());
    hp_tracker_title_input.children('input').focus();
    hp_value_input.val(hp_value);
    // title_box.not(this).prop('disabled', true);

    // reveal title, hide input and re-enable buttons if user clicks cancel
    cancel_hp_title_change_btn.click(function() {
        hideHpTitleChangeBtns();
        });
});

// ajax for HpChangeValueForm
$('.hp-change-value-form').submit(function(e) {
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
            console.log(response)
            let form_instance = JSON.parse(response['form_instance']);
            let fields = form_instance[0]['fields'];
            // display the new hp_value
            $("#" + data_id + "-HpValue").empty().prepend(fields.hp_value);
            // reset the title box and display the value
            $("#" + data_id + "-HpTrackerTitle").css({'display': 'inline'});
            $("#" + data_id + "-HpTrackerTitle").empty().prepend(fields.title);
            $('#' + data_id + '-HpTrackerTitleInput').css({'display': 'none'});
            $('#' + data_id + '-HpValueIncreaseBtn').css({'display': 'inline'});
            $('#' + data_id + '-HpValueDecreaseBtn').css({'display': 'inline'});
            $('#' + data_id + '-ConfirmHpTitleChangeBtn').css({'display': 'none'});
            $('#' + data_id + '-CancelHpTitleChangeBtn').css({'display': 'none'});
            $('#' + data_id + '-HpTrackerDeleteBtn').css({'display': 'none'});
            $('.hp-value-change-btn').prop('disabled', false);
            console.log('ajaxSuccess');
        },
        error: function (response) {
            console.log(response["responseJSON"]["error"]);
        }
    });
});

// DICE CONTROL

// ajax for rolling an entire dice group
$('.die-group-roll-all-btn').click(function(e) {
    'use strict';
    e.preventDefault();
    // let group_data_id = $(this).attr("data-id");
    $.ajax({
        type: 'GET',
        url: $(this).parent().attr('href'),
        success: function (response) {
            let new_die_values = JSON.parse(response.die_group_dice);
            let new_die_group_sums = JSON.parse(response.die_group_sums);
            $.each(new_die_values, function(index){
                let target_div_id = new_die_values[index].pk.toString() + '-rolledValue';
                let die_rolled_value = new_die_values[index].fields.rolled_value
                $('#' + target_div_id ).text(die_rolled_value);
            });
            $.each(new_die_group_sums, function(index){
                let target_div_id = new_die_group_sums[index].pk.toString() + '-dieGroupSum';
                $('#' + target_div_id ).text('Sum: ' + new_die_group_sums[index].die_group_sum_value);
            });
            console.log('ajaxSuccess');
        },
        error: function (response) {
        //     console.log(response["responseJSON"]["error"]);
            console.log(response["responseJSON"]["error"]);
        }
    });
});

// ajax for rolling a single die
$('.die-roll-btn').click(function(e) {
    console.log($(this).parent().attr('href'))
    'use strict';
    e.preventDefault();
    $.ajax({
        type: 'GET',
        url: $(this).parent().attr('href'),
        success: function (response) {
            let new_die_value = JSON.parse(response.rolled_die_value);
            let target_div_id = new_die_value[0].pk.toString() + '-rolledValue';
            let die_rolled_value = new_die_value[0].fields.rolled_value;
            $('#' + target_div_id ).text(die_rolled_value);
            console.log('ajaxSuccess');
        },
        error: function (response) {
        //     console.log(response["responseJSON"]["error"]);
            console.log(response["responseJSON"]["error"]);
        }
    });
});

// open the add die form
$('.die-group-add-die-open-form-btn').click(function() {
    let data_id = $(this).attr('data-id');
    let form_wrapper = $('#' + data_id + '-dieGroupAddNewDieFormWrapper');
    form_wrapper.css({'visibility': 'visible', 'opacity': '100%'});
});
// close the add die form
    $('.add-die-form-done-btn').click(function() {
    let data_id = $(this).attr('data-id');
    let form_wrapper = $('#' + data_id + '-dieGroupAddNewDieFormWrapper');
    form_wrapper.css({'visibility': 'hidden', 'opacity': '0'});
});

console.log('this application has been brought to you by David Cates.');


