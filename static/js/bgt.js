//  on page load - check for an active tool menu and set it to visible
if (localStorage.getItem('activeTool')) {
    let activeTool= localStorage.getItem('activeTool');
    $(activeTool).css({'display': 'flex'});
}

// control messages that popup after certain actions (such as creating a tool)
let messageControl = {
    display_success_message: function(message_wrapper, message) {
        'use strict';
        let message_timeout_success;
        clearTimeout(message_timeout_success);
        $(message_wrapper).empty().prepend(
            '<div class="message-box success fade_out_quick">' + message + '</div>'
        ).css({'display': 'inline'});
        message_timeout_success = setTimeout(function () {
            $(message_wrapper).css({'display': 'none'}).empty();
        }, 2000);
    },

    display_error_message: function(message_wrapper, message) {
        'use strict';
        let message_timeout_error;
        clearTimeout(message_timeout_error);
        $(message_wrapper).empty().prepend(
            '<div class="message-box error fade_out">' + message + '</div>'
        ).css({'display': 'inline'});
        message_timeout_error = setTimeout(function () {
            $(message_wrapper).css({'display': 'none'}).empty();
        }, 6000);
    }
};

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
    $('body, html').addClass('no_scroll');
    openToolPageCover();
});

$('#CloseToolSelectionMenuBtn').click(function() {
    'use strict';
    $('#ToolSelectionMenu').css({'top': '-80vh', 'visibility': 'hidden'});
    setTimeout(function(){
    $('#ToolSessionPageHeader').css({'display': 'flex'});
    window.location.reload(true);
    }, 275);
});

// reveal the dark cover over the menu when add tool forms are opened
function openMenuCover() {
    'use strict';
    $('#ToolSelectionMenuCover').css({
    'display': 'inline',
    'position': 'absolute',
    'opacity': '70%'
    });
}
// close the dark cover over the menu when add tool forms are closed
function closeMenuCover() {
    'use strict';
    $('#ToolSelectionMenuCover').css({
    'display': 'none',
    'position': 'absolute',
    'opacity': '0'
    });
}
// Open and Close various forms for adding tools via the tool selection menu on
// tool_session_detail.html
$('#createPlayerOpenFormBtn').click(function() {
    'use strict';
    $('#createPlayerForm').trigger('reset');
    $('#createPlayerFormWrapper').css({'visibility': 'visible', 'opacity': '1'});
    openMenuCover();
});
$('#createPlayerFormCancelBtn').click(function() {
    'use strict';
    $('#createPlayerFormWrapper').css({'visibility': 'hidden', 'opacity': '0'});
    closeMenuCover();
});
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
$('#createResourceGroupOpenFormBtn').click(function() {
    'use strict';
    $('#createResourceGroupForm').trigger('reset');
    $('#createResourceGroupFormWrapper').css({'visibility': 'visible', 'opacity': '1'});
    openMenuCover();
});
$('#createResourceGroupFormCancelBtn').click(function() {
    'use strict';
    $('#createResourceGroupFormWrapper').css({'visibility': 'hidden', 'opacity': '0'});
    closeMenuCover();
});
$('#createGameTimerOpenFormBtn').click(function() {
    'use strict';
    $('#createGameTimerForm').trigger('reset');
    $('#createGameTimerFormWrapper').css({'visibility': 'visible', 'opacity': '1'});
    openMenuCover();
});
$('#createGameTimerFormCancelBtn').click(function() {
    'use strict';
    $('#createGameTimerFormWrapper').css({'visibility': 'hidden', 'opacity': '0'});
    closeMenuCover();
});
$('#createDrawBagOpenFormBtn').click(function() {
    'use strict';
    $('#createDrawBagForm').trigger('reset');
    $('#createDrawBagFormWrapper').css({'visibility': 'visible', 'opacity': '1'});
    openMenuCover();
});
$('#createDrawBagFormCancelBtn').click(function() {
    'use strict';
    $('#createDrawBagFormWrapper').css({'visibility': 'hidden', 'opacity': '0'});
    closeMenuCover();
});
$('#createScoringGroupOpenFormBtn').click(function() {
    'use strict';
    $('#createScoringGroupForm').trigger('reset');
    $('#createScoringGroupFormWrapper').css({'visibility': 'visible', 'opacity': '1'});
    openMenuCover();
});
$('#createScoringGroupFormCancelBtn').click(function() {
    'use strict';
    $('#createScoringGroupFormWrapper').css({'visibility': 'hidden', 'opacity': '0'});
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
$("#OpenPlayersBtn").click(function () {
    'use strict';
    setActiveTool('#playersViewWrapper.tool-body');
});
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

// Set the Resource Groups to the active tool
$("#openResourceGroupsBtn").click(function () {
    'use strict';
    setActiveTool('#resourceGroupsViewWrapper.tool-body');
});

// Set Game Times to the active tool
$("#openGameTimersBtn").click(function () {
    'use strict';
    setActiveTool('#gameTimersViewWrapper.tool-body');
});

// Set the Draw Bags to the active tool
$("#openDrawBagsBtn").click(function () {
    'use strict';
    setActiveTool('#drawBagsViewWrapper.tool-body');
});

// Set the Scoring Groups to the active tool
$("#openScoringGroupsBtn").click(function () {
    'use strict';
    setActiveTool('#scoringGroupsViewWrapper.tool-body');
});

// controls ajax requests when submitting forms that create new tools
function newToolsFormSubmit(form, form_wrapper, tool_view_btn) {
    'use strict';
    $(form).submit(function (e) {
        // prevent page reload and default actions
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
                messageControl.display_success_message('#toolCreatedSuccessMessageWrapper', 'created successfully');
                $(form_wrapper).css({'visibility': 'hidden', 'opacity': '0'});
                $(tool_view_btn).addClass('button-visible');
                console.log('ajaxSuccess');
            },
            error: function(response) {
                let error_text = response.responseText
                    .replace('{','').replace('}','').replace(':','').replace('error','').replaceAll('"','');
                messageControl.display_error_message('#errorMessageWrapper', error_text);
            }
        });
    });
}

// ajax function calls for adding new tools
$("#createPlayerForm").submit(newToolsFormSubmit(
    '#createPlayerForm',
    '#createPlayerFormWrapper',
    '#OpenPlayersBtn'
));

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
$("#createResourceGroupForm").submit(newToolsFormSubmit(
    '#createResourceGroupForm',
    '#createResourceGroupFormWrapper',
    '#openResourceGroupsBtn'
));
$("#createGameTimerForm").submit(newToolsFormSubmit(
    '#createGameTimerForm',
    '#createGameTimerFormWrapper',
    '#openGameTimersBtn'
));

$("#createDrawBagForm").submit(newToolsFormSubmit(
    '#createDrawBagForm',
    '#createDrawBagFormWrapper',
    '#openDrawBagsBtn'
));

$("#createScoringGroupForm").submit(newToolsFormSubmit(
    '#createScoringGroupForm',
    '#createScoringGroupFormWrapper',
    '#openScoringGroupsBtn'
));

// reveal the dark cover over the tool page when various forms are opened
function openToolPageCover() {
    'use strict';
    $('#toolPageDarkCover').css({
    'display': 'inline',
    'position': 'absolute',
    'opacity': '70%'
    });
}
// close the dark cover over the tool page
function closeToolPageCover() {
    'use strict';
    $('#toolPageDarkCover').css({
    'display': 'none',
    'position': 'absolute',
    'opacity': '0'
    });
}


// --------------- HP TRACKER CONTROL ---------------

// control timeout before hp_value increase or decrease is submitted
localStorage.setItem('hp_change_value', '0');
let hpTrackerTimeoutHandler;

function timeoutControl(element) {
    'use strict';
    clearTimeout(hpTrackerTimeoutHandler);
    // select the closest for to the clicked button
    let selector = $(element).closest('.hp-change-value-form');

    // assign the unique django object id to a variable
    let data_id = '#' + selector.attr("data-id");

    // get the hp change value from local storage
    let hp_change_value = parseInt(localStorage.getItem('hp_change_value'));

    // get the current hp value being provided by django context
    let hp_initial_value = parseInt($(data_id + "-HpValue").text());

    // calculate the amount to be entered into the hp value change form
    let hp_add_subtract_value = hp_initial_value + hp_change_value;

    // get the title of the hp tracker to submit with the form so its not set
    // to an empty string when the form posts.
    let title_box = $(data_id + "-HpTrackerTitle");

    // After a 2 second delay submit the form and reset the change value to 0
    hpTrackerTimeoutHandler = setTimeout(function () {
        $(data_id + '-HpValueInput input').val(hp_add_subtract_value);
        $(data_id + '-HpTrackerTitleInput input').val(title_box.text());
        $(data_id + '-HpChangeValueForm').submit();
        $(data_id + '-HpValueChange').css({'display': 'none'});
        $(data_id + '-HpValueChangeCover').css({'display': 'none'});
        localStorage.setItem('hp_change_value', '0');
    }, 2000);
}

// decrease the hp value with each button click - value is not submitted until
// after a 2 second delay via timeoutControl()
$('.hp-value-change-btn.decrease').click(function () {
    'use strict';
    let selector = $(this).closest('.hp-tracker-control-box');
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
    let selector = $(this).closest('.hp-tracker-control-box');
    let hp_change_value = parseInt(localStorage.getItem('hp_change_value'));
    hp_change_value++;
    localStorage.setItem('hp_change_value', hp_change_value.toString());
    $(selector.find('.hp-change-value')).css({'display': 'inline'});
    $(selector.find('.hp-change-value-cover')).css({'display': 'inline'});
    $(selector.find('.hp-change-value')).empty().prepend(hp_change_value);
    timeoutControl(this);

});

// reveal editing options for an hp tracker - change title/delete
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
        hp_tracker_title_input.css({'display': 'flex', 'background-color': '#555555'});
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
            let form_instance = JSON.parse(response['form_instance']);
            let fields = form_instance[0]['fields'];
            // display the new hp_value
            $("#" + data_id + "-HpValue").empty().prepend(fields.hp_value);
            // reset the title box and display the value
            $("#" + data_id + "-HpTrackerTitle").css({'display': 'inline'})
                                                .empty()
                                                .prepend(fields.title);
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
            messageControl.display_error_message('#errorMessageWrapper', 'Uh oh, status ' + response.status);
        }
    });
});

// --------------- DICE CONTROL ---------------

diceControl = {
    dice_funcs: {
        open_add_die_form: function(this_value) {
            let data_id = "#" + $(this_value).attr('data-id');
            let form_wrapper = $(data_id + '-dieGroupAddNewDieFormWrapper');
            form_wrapper.css({'visibility': 'visible', 'opacity': '100%'});
            $('body, html').addClass('no_scroll');
            openToolPageCover();
        },
        close_add_die_form: function(this_value) {
            let data_id = "#" + $(this_value).attr('data-id');
            let form_wrapper = $(data_id + '-dieGroupAddNewDieFormWrapper');
            form_wrapper.css({'visibility': 'hidden', 'opacity': '0'});
            window.location.reload(true);
            closeToolPageCover();
        }
    }
};

// reveal editing options for a die group - change title/delete
$('.die-group-title').click(function() {
    'use strict';
    let selector = $(this).closest('form');
    let data_id = selector.attr("data-id");
    let die_group_title_box = $("#" + data_id + "-dieGroupTitle");
    let die_group_title_input = $('#' + data_id + '-dieGroupTitleInput');
    let confirm_die_group_title_change_btn = $('#' + data_id + '-confirmDieGroupTitleChangeBtn');
    let cancel_die_group_title_change_btn = $('#' + data_id + '-cancelDieGroupTitleChangeBtn');
    let die_group_add_die_open_form_btn = $('.die-group-add-die-open-form-btn');
    let die_group_delete_btn = $('#' + data_id + '-dieGroupDeleteBtn');
    let rolled_die_value = $('.die-rolled-value.' + data_id);
    let die_delete_btn = $('.delete-btn-small.' + data_id);
    let die_group_roll_all_form = $('.die-group-roll-all-form');

    function revealDieGroupTitleChangeBtns() {
        die_group_title_box.css({'display': 'none'});
        die_group_title_input.css({'display': 'inline', 'background-color': '#555555'});
        die_group_add_die_open_form_btn.css({'display': 'none'});
        confirm_die_group_title_change_btn.css({'display': 'inline'});
        cancel_die_group_title_change_btn.css({'display': 'inline'});
        die_group_delete_btn.css({'display': 'inline'});
        rolled_die_value.css({'display': 'none'});
        die_delete_btn.css({'display': 'inline'});
        die_group_roll_all_form.css({'display': 'none'});
    }

    function hideDieGroupTitleChangeBtns() {
        die_group_title_box.css({'display': 'inline'});
        die_group_title_input.css({'display': 'none'});
        die_group_roll_all_form.css({'display': 'inline'});
        die_group_add_die_open_form_btn.css({'display': 'inline'});
        confirm_die_group_title_change_btn.css({'display': 'none'});
        cancel_die_group_title_change_btn.css({'display': 'none'});
        die_group_delete_btn.css({'display': 'none'});
        rolled_die_value.css({'display': 'flex'});
        die_delete_btn.css({'display': 'none'})
        die_group_roll_all_form.css({'display': 'inline'});
    }

    revealDieGroupTitleChangeBtns();
    die_group_title_input.children('input').val(die_group_title_box.text().trim());
    die_group_title_input.children('input').focus();

    // reveal title, hide input and re-enable buttons if user clicks cancel
    cancel_die_group_title_change_btn.click(function() {
        hideDieGroupTitleChangeBtns();
        });
});

// ajax for changing die group title
$('.die-group-update-form').submit(function(e) {
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
            // reset the title box and display the value
            $("#" + data_id + "-dieGroupTitle").css({'display': 'inline'})
                                                .empty()
                                                .prepend(fields.title);
            $('#' + data_id + '-dieGroupTitleInput').css({'display': 'none'});
            $('.die-group-roll-all-form').css({'display': 'inline'});
            $('.die-group-add-die-open-form-btn').css({'display': 'inline'});
            $('#' + data_id + '-confirmDieGroupTitleChangeBtn').css({'display': 'none'});
            $('#' + data_id + '-cancelDieGroupTitleChangeBtn').css({'display': 'none'});
            $('#' + data_id + '-dieGroupDeleteBtn').css({'display': 'none'});
            $('.delete-btn-small.' + data_id).css({'display': 'none'});
            $('.die-rolled-value.' + data_id).css({'display': 'flex'});
            console.log('ajaxSuccess');
        },
        error: function (response) {
            console.log(response["responseJSON"]["error"]);
            messageControl.display_error_message('#errorMessageWrapper', 'Uh oh, status ' + response.status);
        }
    });
});

// roll an entire dice group
$('.die-group-roll-all-form').submit(function(e) {
    'use strict';
    e.preventDefault();
    $.ajax({
        type: 'GET',
        url: $(this).attr('action'),
        success: function (response) {
            let die_values = JSON.parse(response.die_group_dice);
            let die_group_sum = JSON.parse(response.die_group_sum);
            $.each(die_values, function(index){
                let target_div_id = die_values[index].pk.toString() + '-rolledValue';
                let die_rolled_value = die_values[index].fields.rolled_value;
                $('#' + target_div_id ).text(die_rolled_value);
            });
            let group_sum_target_div_id = die_group_sum[0].id + '-dieGroupSum';
            let group_dice_sum = die_group_sum[0].group_dice_sum;
            if (group_dice_sum === 'null' || group_dice_sum === 'None') {
                $('#' + group_sum_target_div_id).text('0');
            } else {
                $('#' + group_sum_target_div_id).text(group_dice_sum);
            }
            console.log('ajaxSuccess');
        },
        error: function (response) {
            console.log(response["responseJSON"]["error"]);
            messageControl.display_error_message('#errorMessageWrapper', 'Uh oh, status ' + response.status);
        }
    });
});

// roll a single die
$('.die-roll-btn').click(function(e) {
    'use strict';
    e.preventDefault();
    $.ajax({
        type: 'GET',
        url: $(this).parent().attr('href'),
        success: function (response) {
            let new_die_value = JSON.parse(response.rolled_die_value);
            let die_group_sum = JSON.parse(response.die_group_sum);
            let target_div_id = new_die_value[0].pk.toString() + '-rolledValue';
            let die_rolled_value = new_die_value[0].fields.rolled_value;
            $('#' + target_div_id ).text(die_rolled_value);
            let group_sum_target_div_id = die_group_sum[0].id + '-dieGroupSum';
            let group_dice_sum = die_group_sum[0].group_dice_sum;
            if (group_dice_sum === 'null' || group_dice_sum === 'None') {
                $('#' + group_sum_target_div_id).text('0');
            } else {
                $('#' + group_sum_target_div_id).text(group_dice_sum);
            }
            console.log('ajaxSuccess');
        },
        error: function (response) {
            console.log(response["responseJSON"]["error"]);
            messageControl.display_error_message('#errorMessageWrapper', 'Uh oh, status ' + response.status);
        }
    });
});

// open the add die form
$('.die-group-add-die-open-form-btn').click(function() {
    'use strict';
    diceControl.dice_funcs.open_add_die_form(this);
});
// close the add die form and reload the die groups
$('.create-custom-object-form-done-btn.die').click(function() {
    'use strict';
    diceControl.dice_funcs.close_add_die_form(this);
});

// ajax for adding a custom die via the #dieGroupAddDieStandardForm
$('.create-custom-object-form.die').submit(function(e) {
    'use strict';
    e.preventDefault();
    let serialized_data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: serialized_data,
        success: function (response) {
            messageControl.display_success_message('#dieAddedSuccessMessageWrapper', 'die added!');
            console.log('ajaxSuccess');
        },
        error: function(response) {
            let error_text = response.responseText
                .replace('{','').replace('}','').replace(':','').replace('error','').replaceAll('"','');
            messageControl.display_error_message('#errorMessageWrapper', error_text);
        }
    });
});

// ajax for quickly adding a common die via the #dieGroupAddDieStandardForm
$('.common-object-quick-create-btn.die-create').click(function(e) {
    'use strict';
    e.preventDefault();
    let data_id = $(this).parent('div').attr('data-id')
    let form = $('#' + data_id + '-dieGroupAddDieStandardForm');
    let selected_die_num_sides = $(this).attr('data-num-sides').toString();
    $('#' + data_id + '-addDieStandardNumSidesInput input').val(selected_die_num_sides)
    let serialized_data = form.serialize();
    $.ajax({
        type: 'POST',
        url: form.attr('action'),
        data: serialized_data,
        success: function (response) {
            messageControl.display_success_message('#dieAddedSuccessMessageWrapper', 'die added!');
            console.log('ajaxSuccess');
        },
        error: function(response) {
            let error_text = response.responseText
                .replace('{','').replace('}','').replace(':','').replace('error','').replaceAll('"','');
            messageControl.display_error_message('#errorMessageWrapper', error_text);
        }
    });
});


// --------------- RESOURCE CONTROL ---------------

let resourceTimeoutHandler;
let resource_change_value = 0;
let productionModifierTimeoutHandler;
let production_modifier_change_value = 0;

resourceControl = {
    resource_funcs: {
        open_create_resource_form: function(this_value) {
            let data_id = '#' + $(this_value).attr('data-id');
            let form_wrapper = $(data_id + '-resourceGroupCreateResourceFormWrapper');
            form_wrapper.css({'visibility': 'visible', 'opacity': '100%'});
            $('body, html').addClass('no_scroll');
            openToolPageCover();
        },
        close_create_resource_form: function(this_value) {
            let data_id = '#' + $(this_value).attr('data-id');
            let form_wrapper = $(data_id + '-resourceGroupCreateResourceFormWrapper');
            form_wrapper.css({'visibility': 'hidden', 'opacity': '0'});
            window.location.reload(true);
            closeToolPageCover();
        },
        reveal_resource_title_change_and_delete_btn: function(data_id_value) {
            let data_id = '#' + data_id_value;
            $(data_id + '-resourceName').css({'display':'none'});
            $(data_id + '-resourceNameInputWrapper').removeClass('absolute-hidden').children('input').focus();
            $(data_id + '-resourceDeleteButton').css({'display':'inline'});
            $(data_id + '-resourceImageBox').css({'display':'none'});
            $(data_id + '-confirmChangeBtn').css({'display':'inline'});
            $(data_id + '-cancelChangeBtn').css({'display':'inline'});
        },
        hide_resource_title_change_and_delete_btn: function(data_id_value) {
            let data_id = '#' + data_id_value;
            $(data_id + '-resourceName').css({'display':'inline'});
            $(data_id + '-resourceNameInputWrapper').addClass('absolute-hidden');
            $(data_id + '-resourceDeleteButton').css({'display':'none'});
            $(data_id + '-resourceImageBox').css({'display':'inline'});
            $(data_id + '-confirmChangeBtn').css({'display':'none'});
            $(data_id + '-cancelChangeBtn').css({'display':'none'});
        },
        resourceValueChangeTimeoutControl: function(
            element, form_class, input_field_id, value_change_id, object_quantity_box_id) {
            'use strict';
            clearTimeout(resourceTimeoutHandler);
            let form = $(element).closest(form_class);
            let data_id = '#' + form.attr("data-id");
            let initial_qty = parseInt($(data_id + object_quantity_box_id).text());
            let add_subtract_value = initial_qty + resource_change_value;
            resourceTimeoutHandler = setTimeout(function () {
                $(data_id + input_field_id).val(add_subtract_value);
                $(form).submit();
                resource_change_value = 0;
            }, 2000);
        },
        resource_increase_value: function(this_value, value_change_id, object_quantity_box_id) {
            'use strict';
            let data_id = '#' + $(this_value).attr('data-id');
            resource_change_value++;
            $(data_id + object_quantity_box_id).css({'display': 'none'});
            $(data_id + value_change_id).empty().prepend(resource_change_value).css({'display': 'inline'});
        },

        resource_decrease_value: function(this_value, value_change_id, object_quantity_box_id) {
            'use strict';
            let data_id = '#' + $(this_value).attr('data-id');
            resource_change_value--;
            $(data_id + object_quantity_box_id).css({'display': 'none'});
            $(data_id + value_change_id).empty().prepend(resource_change_value).css({'display': 'inline'});
        },
        productionModifierValueChangeTimeoutControl: function(
            element, form_class, input_field_id, value_change_id, object_quantity_box_id) {
            'use strict';
            clearTimeout(productionModifierTimeoutHandler);
            let form = $(element).closest(form_class);
            let data_id = '#' + form.attr("data-id");
            let initial_qty = parseInt($(data_id + object_quantity_box_id).text());
            let add_subtract_value = initial_qty + production_modifier_change_value;
            productionModifierTimeoutHandler = setTimeout(function () {
                $(data_id + input_field_id).val(add_subtract_value);
                $(form).submit();
                production_modifier_change_value = 0;
            }, 2000);
        },
        production_modifier_increase_value: function(this_value, value_change_id, object_quantity_box_id) {
            'use strict';
            let data_id = '#' + $(this_value).attr('data-id');
            production_modifier_change_value++;
            $(data_id + object_quantity_box_id).css({'display': 'none'});
            $(data_id + value_change_id).empty().prepend(production_modifier_change_value).css({'display': 'inline'});
        },
        production_modifier_decrease_value: function(this_value, value_change_id, object_quantity_box_id) {
            'use strict';
            let data_id = '#' + $(this_value).attr('data-id');
            production_modifier_change_value--;
            $(data_id + object_quantity_box_id).css({'display': 'none'});
            $(data_id + value_change_id).empty().prepend(production_modifier_change_value).css({'display': 'inline'});
        },
        calculate_resource_production_value: function(data_id_value) {
            let data_id = '#' + data_id_value;
            let resource_qty = parseInt($(data_id + '-resourceQtyBox').text());
            let production_qty = parseInt($(data_id + '-productionModifierQtyBox').text());
            let new_resource_qty = (resource_qty + production_qty);
            return new_resource_qty;
        }
    },
};

// reveal editing options for a resource group box
$('.resource-group-title').click(function() {
    'use strict';
    let selector = $(this).closest('form');
    let data_id = selector.attr("data-id");
    let resource_group_title_box = $("#" + data_id + "-resourceGroupTitle");
    let resource_group_title_input = $("#" + data_id + '-resourceGroupTitleInput');
    let confirm_resource_group_title_change_btn = $("#" + data_id + '-confirmResourceGroupTitleChangeBtn');
    let cancel_resource_group_title_change_btn = $("#" + data_id + '-cancelResourceGroupTitleChangeBtn');
    let resource_group_add_resource_open_form_btn = $('.resource-group-add-resource-open-form-btn');
    let resource_group_delete_btn = $("#" + data_id + '-resourceGroupDeleteBtn');
    let resource_delete_btn = $('.delete-btn-small.' + data_id);
    let resource_group_produce_all_form = $('.resource-group-produce-all-form');


    function revealResourceGroupTitleChangeBtns() {
        resource_group_title_box.css({'display': 'none'});
        resource_group_title_input.css({'display': 'inline', 'background-color': '#555555'});
        resource_group_produce_all_form.css({'display': 'none'});
        resource_group_add_resource_open_form_btn.css({'display': 'none'});
        confirm_resource_group_title_change_btn.css({'display': 'inline'});
        cancel_resource_group_title_change_btn.css({'display': 'inline'});
        resource_group_delete_btn.css({'display': 'inline'});
        resource_delete_btn.css({'display': 'inline'});
    }

    function hideResourceGroupTitleChangeBtns() {
        resource_group_title_box.css({'display': 'inline'});
        resource_group_title_input.css({'display': 'none'});
        resource_group_produce_all_form.css({'display': 'inline'});
        resource_group_add_resource_open_form_btn.css({'display': 'inline'});
        confirm_resource_group_title_change_btn.css({'display': 'none'});
        cancel_resource_group_title_change_btn.css({'display': 'none'});
        resource_group_delete_btn.css({'display': 'none'});
        resource_delete_btn.css({'display': 'none'});
    }

    revealResourceGroupTitleChangeBtns();
    resource_group_title_input.children('input').val(resource_group_title_box.text().trim());
    resource_group_title_input.children('input').focus();

    // reveal title, hide input and re-enable buttons if user clicks cancel
    cancel_resource_group_title_change_btn.click(function() {
    hideResourceGroupTitleChangeBtns();
    });
});

// update a resource group title and hide editing controls
$('.resource-group-update-form').submit(function(e) {
    'use strict';
    // preventing from page reload and default actions
    e.preventDefault();
    let data_id = '#' + $(this).attr("data-id");
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
            // reset the title box and display the value
            $(data_id + '-resourceGroupTitle').css({'display': 'inline'})
                                                .empty()
                                                .prepend(fields.title);
            $(data_id + '-resourceGroupTitleInput').css({'display': 'none'});
            $('.resource-group-produce-all-form').css({'display': 'inline'});
            $('.resource-group-add-resource-open-form-btn').css({'display': 'inline'});
            $(data_id + '-confirmResourceGroupTitleChangeBtn').css({'display': 'none'});
            $(data_id + '-cancelResourceGroupTitleChangeBtn').css({'display': 'none'});
            $(data_id + '-resourceGroupDeleteBtn').css({'display': 'none'});
            console.log('ajaxSuccess');
        },
        error: function (response) {
            console.log(response["responseJSON"]["error"]);
            messageControl.display_error_message('#errorMessageWrapper', 'Uh oh, status ' + response.status);
        }
    });
});

// open the create resource form
$('.resource-group-add-resource-open-form-btn').click(function() {
    'use strict';
    resourceControl.resource_funcs.open_create_resource_form(this);
});

// close the create resource form and reload the resource groups
$('.create-custom-object-form-done-btn.resource').click(function(){
    'use strict';
    resourceControl.resource_funcs.close_create_resource_form(this);
});

// ajax for quickly adding a common resource via the #resourceGroupCreateResourceForm
$('.common-object-quick-create-btn.resource-create').click(function(e) {
    'use strict';
    e.preventDefault();
    let data_id = "#" + $(this).parent('div').attr('data-id');
    let form = $(data_id + '-resourceGroupCreateResourceForm');
    let resource_name = $(this).attr('data-name').toString();
    $(data_id + '-createResourceNameField input').val(resource_name);
    let serialized_data = form.serialize();
    $.ajax({
        type: 'POST',
        url: form.attr('action'),
        data: serialized_data,
        success: function (response) {
            messageControl.display_success_message('#resourceCreatedSuccessMessageWrapper', 'resource added!');
            console.log('ajaxSuccess');
        },
        error: function(response) {
            let error_text = response.responseText
                .replace('{','').replace('}','').replace(':','').replace('error','').replaceAll('"','');
            messageControl.display_error_message('#errorMessageWrapper', error_text);
        }
    });
});

// ajax for adding a resource
$('.create-custom-object-form.resource').submit(function(e) {
    'use strict';
    e.preventDefault();
    let serialized_data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: serialized_data,
        success: function (response) {
            messageControl.display_success_message('#resourceCreatedSuccessMessageWrapper', 'resource added!');
            console.log('ajaxSuccess');
        },
        error: function(response) {
            let error_text = response.responseText
                .replace('{','').replace('}','').replace(':','').replace('error','').replaceAll('"','');
            messageControl.display_error_message('#errorMessageWrapper', error_text);
        }
    });
});

// open the resource name change form and reveal the individual resource
// delete buttons
$('.resource-name-box').click(function(){
    'use strict';
    resourceControl.resource_funcs.reveal_resource_title_change_and_delete_btn($(this).attr('data-id'));
});
// hide the resource name change form and hide the individual resource
// delete buttons
$('.resource-name-change-cancel-btn').click(function(){
    'use strict';
    resourceControl.resource_funcs.hide_resource_title_change_and_delete_btn($(this).attr('data-id'));
});
$('.resource-name-change-form').submit(function(e) {
    'use strict';
    e.preventDefault();
    let data_id = $(this).attr('data-id');
    let serialized_data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: serialized_data,
        success: function (response) {
            let form_instance = JSON.parse(response['form_instance']);
            let fields = form_instance[0]['fields'];
            // display the new resource_name
            $('#' + data_id + '-resourceName').empty().prepend(fields.name).css({'display': 'inline'});
            resourceControl.resource_funcs.hide_resource_title_change_and_delete_btn(data_id);
            console.log('ajaxSuccess');
        },
        error: function (response) {
            console.log(response["responseJSON"]["error"]);
            messageControl.display_error_message('#errorMessageWrapper', 'Uh oh, status ' + response.status);
        }
    });
});

// change the resource quantity with each button click - value is not submitted until
// after a 2 second delay via resourceTimeoutControl()
$('.resource-change-amt-btn.resource-increase').click(function() {
    'use strict';
    resourceControl.resource_funcs.resource_increase_value(
        this,
        '-resourceValueChange',
        '-resourceQtyBox'
    );
    resourceControl.resource_funcs.resourceValueChangeTimeoutControl(
    this,
    '.resource-qty-change-form',
    '-resourceQtyInput input',
    '-resourceValueChange',
    '-resourceQtyBox'
    );
});

$('.resource-change-amt-btn.resource-decrease').click(function() {
    'use strict';
    resourceControl.resource_funcs.resource_decrease_value(
        this,
        '-resourceValueChange',
        '-resourceQtyBox'
    );
    resourceControl.resource_funcs.resourceValueChangeTimeoutControl(
    this,
    '.resource-qty-change-form',
    '-resourceQtyInput input',
    '-resourceValueChange',
    '-resourceQtyBox'
    );
});

// changing resource qty
$('.resource-qty-change-form').submit(function(e) {
    'use strict';
    e.preventDefault();
    let data_id = '#' + $(this).attr('data-id');
    let serialized_data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: serialized_data,
        success: function (response) {
            let form_instance = JSON.parse(response['form_instance']);
            let fields = form_instance[0]['fields'];
            // display the new resource_quantity
            $(data_id + '-resourceQtyBox').empty().prepend(fields.quantity).css({'display': 'inline'});;
            $(data_id + '-resourceValueChange').css({'display': 'none'});
            console.log('ajaxSuccess');
        },
        error: function (response) {
            console.log(response["responseJSON"]["error"]);
            messageControl.display_error_message('#errorMessageWrapper', 'Uh oh, status ' + response.status);
        }
    });
});

// change the production modifier with each button click - value is not submitted until
// after a 2 second delay via resourceTimeoutControl()
$('.resource-change-amt-btn.modifier-increase').click(function() {
    'use strict';
    resourceControl.resource_funcs.production_modifier_increase_value(
        this,
        '-productionModifierValueChange',
        '-productionModifierQtyBox'
    );
    resourceControl.resource_funcs.productionModifierValueChangeTimeoutControl(
    this,
    '.resource-production-modifier-change-form',
    '-productionModifierQtyInput input',
    '-productionModifierValueChange',
    '-productionModifierQtyBox'
    );
});


$('.resource-change-amt-btn.modifier-decrease').click(function() {
    'use strict';
    resourceControl.resource_funcs.production_modifier_decrease_value(
        this,
        '-productionModifierValueChange',
        '-productionModifierQtyBox'
    );
    resourceControl.resource_funcs.productionModifierValueChangeTimeoutControl(
    this,
    '.resource-production-modifier-change-form',
    '-productionModifierQtyInput input',
    '-productionModifierValueChange',
    '-productionModifierQtyBox'
    );
});

// change production modifier
$('.resource-production-modifier-change-form').submit(function(e) {
    'use strict';
    e.preventDefault();
    let data_id = "#" + $(this).attr('data-id');
    let serialized_data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: serialized_data,
        success: function (response) {
            let form_instance = JSON.parse(response['form_instance']);
            let fields = form_instance[0]['fields'];
            // display the new production_modifier
            $(data_id + '-productionModifierQtyBox').empty().prepend(fields.production_modifier).css({'display': 'inline'});
            $(data_id + '-productionModifierValueChange').css({'display': 'none'});
            console.log('ajaxSuccess');
        },
        error: function (response) {
            console.log(response["responseJSON"]["error"]);
            messageControl.display_error_message('#errorMessageWrapper', 'Uh oh, status ' + response.status);
        }
    });
});

// produce resource
$('.produce-single-resource-btn').click(function(){
    let data_id = $(this).closest('form').attr('data-id')
    let form = $('#' + data_id + '-produceResourceForm')
    let new_resource_qty = resourceControl.resource_funcs.calculate_resource_production_value(data_id)
    $("#" + data_id + '-newResourceQtyInput input').val(new_resource_qty)
    form.submit();
})

$('.produce-resource-form').submit(function(e) {
    'use strict';
    e.preventDefault();
    let data_id = $(this).attr('data-id');
    let serialized_data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: serialized_data,
        success: function (response) {
            let form_instance = JSON.parse(response['form_instance']);
            let fields = form_instance[0]['fields'];
            // display the new production_modifier
            $("#" + data_id + '-resourceQtyBox').empty().prepend(fields.quantity).css({'display': 'inline'});
            console.log('ajaxSuccess');
        },
        error: function (response) {
            console.log(response["responseJSON"]["error"]);
            messageControl.display_error_message('#errorMessageWrapper', 'Uh oh, status ' + response.status);
        }
    });
});

// --------------- SCORING CONTROL ---------------

scoringControl = {
    scoring_funcs: {
        change_open_sub_group: function(sub_group_wrapper, this_value) {
            let data_id = $(this_value).parent().attr('data-id');
            $('#' + data_id + '-scoringGroupPlayersWrapper').addClass('absolute-hidden');
            $('#' + data_id + '-scoringGroupCategoriesWrapper').addClass('absolute-hidden');
            $('#' + data_id + '-scoringGroupScoresWrapper').addClass('absolute-hidden');
            $(sub_group_wrapper).removeClass('absolute-hidden');
        },
        open_create_scoring_category_forms_box: function(this_value) {
            let data_id = '#' + $(this_value).attr('data-id');
            let form_wrapper = $(data_id + '-scoringCategoryCreateFormWrapper');
            form_wrapper.css({'visibility': 'visible', 'opacity': '100%'});
            $('body, html').addClass('no_scroll');
            openToolPageCover();
        },
        close_create_scoring_category_forms_box: function(this_value) {
            let data_id = '#' + $(this_value).attr('data-id');
            let form_wrapper = $(data_id + '-scoringCategoryCreateFormWrapper');
            form_wrapper.css({'visibility': 'hidden', 'opacity': '0'});
            window.location.reload(true);
            closeToolPageCover();
        },
        open_player_score_input_area: function(this_value) {
            let data_id = '#' + $(this_value).attr('data-id');
            let input_area_wrapper = $(data_id + '-scoreCalcInputAreaWrapper');
            let all_input_areas = $('.score-calc-input-area-wrapper');
            let all_open_buttons = $('.score-calc-input-area-open-btn');
            let all_close_buttons = $('.score-calc-input-area-close-btn');
            let close_btn = $(this_value).parent().find('.score-calc-input-area-close-btn');
            all_close_buttons.addClass('absolute-hidden');
            all_open_buttons.removeClass('absolute-hidden');
            all_input_areas.addClass('absolute-hidden')
            input_area_wrapper.removeClass('absolute-hidden');
            $(this_value).addClass('absolute-hidden');
            close_btn.removeClass('absolute-hidden');
        },
        close_player_score_input_area: function(this_value) {
            let data_id = '#' + $(this_value).attr('data-id');
            let all_input_areas = $('.score-calc-input-area-wrapper');
            let all_open_buttons = $('.score-calc-input-area-open-btn');
            let all_close_buttons = $('.score-calc-input-area-close-btn');
            all_close_buttons.addClass('absolute-hidden');
            all_open_buttons.removeClass('absolute-hidden');
            all_input_areas.addClass('absolute-hidden')
        }
    }
}

// reveal editing options for a scoring group box
$('.scoring-group-title').click(function() {
    'use strict';
    let selector = $(this).closest('form');
    let data_id = selector.attr("data-id");
    let scoring_group_title_box = $("#" + data_id + "-scoringGroupTitle");
    let scoring_group_title_input = $("#" + data_id + '-scoringGroupTitleInput');
    let confirm_scoring_group_title_change_btn = $("#" + data_id + '-confirmScoringGroupTitleChangeBtn');
    let cancel_scoring_group_title_change_btn = $("#" + data_id + '-cancelScoringGroupTitleChangeBtn');
    let scoring_group_control_box_btn = $('.scoring-group-control-box-btn');
    let scoring_group_delete_btn = $("#" + data_id + '-scoringGroupDeleteBtn');


    function revealScoringGroupTitleChangeBtns() {
        scoring_group_title_box.css({'display': 'none'});
        scoring_group_title_input.css({'display': 'inline', 'background-color': '#555555'});
        scoring_group_control_box_btn.css({'display': 'none'});
        confirm_scoring_group_title_change_btn.css({'display': 'inline'});
        cancel_scoring_group_title_change_btn.css({'display': 'inline'});
        scoring_group_delete_btn.css({'display': 'inline'});
    }

    function hideScoringGroupTitleChangeBtns() {
        scoring_group_title_box.css({'display': 'inline'});
        scoring_group_title_input.css({'display': 'none'});
        scoring_group_control_box_btn.css({'display': 'inline'});
        confirm_scoring_group_title_change_btn.css({'display': 'none'});
        cancel_scoring_group_title_change_btn.css({'display': 'none'});
        scoring_group_delete_btn.css({'display': 'none'});
    }

        revealScoringGroupTitleChangeBtns();
        scoring_group_title_input.children('input').val(scoring_group_title_box.text().trim());
        scoring_group_title_input.children('input').focus();

        // reveal title, hide input and re-enable buttons if user clicks cancel
        cancel_scoring_group_title_change_btn.click(function() {
        hideScoringGroupTitleChangeBtns();
        });
});

// update a scoring group title and hide editing controls
$('.scoring-group-form').submit(function(e) {
    'use strict';
    // preventing from page reload and default actions
    e.preventDefault();
    let data_id = '#' + $(this).attr("data-id");
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
            // reset the title box and display the value
            $(data_id + '-scoringGroupTitle').css({'display': 'inline'})
                                                .empty()
                                                .prepend(fields.title);
            $(data_id + '-scoringGroupTitleInput').css({'display': 'none'});
            $('.scoring-group-control-box-btn').css({'display': 'inline'});
            $(data_id + '-confirmScoringGroupTitleChangeBtn').css({'display': 'none'});
            $(data_id + '-cancelScoringGroupTitleChangeBtn').css({'display': 'none'});
            $(data_id + '-scoringGroupDeleteBtn').css({'display': 'none'});
            console.log('ajaxSuccess');
        },
        error: function (response) {
            console.log(response["responseJSON"]["error"]);
            messageControl.display_error_message('#errorMessageWrapper', 'Uh oh, status ' + response.status);
        }
    })
});
$('.scoring-group-control-box-btn').click(function() {
    let sub_group_wrapper = $(this).attr('data-id');
    scoringControl.scoring_funcs.change_open_sub_group(sub_group_wrapper, $(this));
});

// add a scoring category
$('.scoring-group-add-category-open-form-btn').click(function() {
    scoringControl.scoring_funcs.open_create_scoring_category_forms_box(this);
})
// close the add scoring category form
$('.create-custom-object-form-done-btn.scoring_category').click(function() {
    scoringControl.scoring_funcs.close_create_scoring_category_forms_box(this);
})

// ajax for adding a scoring category
$('.create-custom-object-form.scoring-category').submit(function(e) {
    'use strict';
    e.preventDefault();
    let serialized_data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: serialized_data,
        success: function (response) {
            messageControl.display_success_message('#scoringPageSuccessMessageWrapper', 'category added!');
            console.log('ajaxSuccess');
        },
        error: function(response) {
            let error_text = response.responseText
                .replace('{','').replace('}','').replace(':','').replace('error','').replaceAll('"','');
            messageControl.display_error_message('#errorMessageWrapper', error_text);
        }
    });
});

// open a player's scoring input area, this will also close any other open
// scoring input areas
$('.score-calc-input-area-open-btn').click(function() {
   scoringControl.scoring_funcs.open_player_score_input_area($(this))
});
//  close all player scoring input areas
$('.score-calc-input-area-close-btn').click(function() {
   scoringControl.scoring_funcs.close_player_score_input_area($(this))
});

// calculate a player's score
$('.score-calc-form').submit(function(e) {
    'use strict';
    e.preventDefault();
    // identify form and count number of scoring categories (inputs)
    let data_id = $(this).attr('data-id');
    let form = $('#' + data_id + '-scoreCalcForm');
    let number_of_inputs = form.children().children('input').length;
    let scores_array = []
    // for each input, calculate the points earned/lost and add that number
    // to an array
    for (let i = (number_of_inputs-1); i >= 0; i-- ){
        let input = form.children().children('input');
        let item_count = $(input[i]).val();
        let points = $(input[i]).attr('data-points');
        let group = $(input[i]).attr('data-group');
        let rounding = $(input[i]).attr('data-rounding');
        let num_groups;
        if (rounding === 'up') {
            num_groups = Math.ceil(item_count / group);
        } else if (rounding === 'down') {
            num_groups = Math.floor(item_count / group);
        } else {
            num_groups = (item_count / group).toFixed(2);
        }
        let total_points = num_groups * points;
        scores_array.push(total_points);
    }
    // sum the point totals from all the scoring categories and submit the
    // final score value
    let final_score = scores_array.reduce((a, b) => a + b, 0);
    let player_score_form = $('#' + data_id + '-scoreCalcPlayerScoreForm');
    $(player_score_form).children().children('input').val(final_score);
    player_score_form.submit();
});

// ajax for updating a player's score with a calculated value
$('.score-calc-player-score-form').submit(function(e) {
    'use strict';
    e.preventDefault();
    let data_id = '#' + $(this).attr('data-id');
    let serialized_data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: serialized_data,
        success: function (response) {
            messageControl.display_success_message('#scoringPageSuccessMessageWrapper', 'scored!');
            let form_instance = JSON.parse(response['form_instance']);
            let fields = form_instance[0]['fields'];
            // display the player's new calculated score
            $(data_id + '-scoreCalcScoreValueBox').empty().prepend(fields.score).css({'display': 'inline'});
            console.log('ajaxSuccess');
        },
        error: function (response) {
            console.log(response["responseJSON"]["error"]);
            messageControl.display_error_message('#errorMessageWrapper', 'Uh oh, status ' + response.status);
        }
    });
});

// --------------- GAME TIMER CONTROL ---------------

let timer_running = false;
let run_timer;

gameTimerControl = {
    game_timer_funcs: {
        game_timer_start_stop: function(data_id_value, timer_run = 'not_running') {
            // let data_id = $(this_value).attr('data-id')
            let duration_window = $('#' + data_id_value + '-gameTimerDuration');
            let duration = duration_window.text().replaceAll(':', '');
            let timer_running = timer_run;
            let hour;
            let minute;
            let second;
            if (duration.trim().length === 5) {
                hour = parseInt(duration.substring(0, 1));
                minute = parseInt(duration.substring(1, 3));
                second = parseInt(duration.substring(3, 5));
            } else if (duration.trim().length === 6) {
                hour = parseInt(duration.substring(0, 2));
                minute = parseInt(duration.substring(2, 4));
                second = parseInt(duration.substring(4, 6));
            }
            let minute_display;
            let second_display;
            let duration_update_form = $('#' + data_id_value + '-gameTimerDurationUpdateForm');

            function get_and_update_duration_update_form(data_id_value, duration_value) {
                let form = $('#' + data_id_value + '-gameTimerDurationUpdateForm');
                let input = $(form).children().children('input');
                input.val(duration_value);
            }

            function game_timer_run(hr, min, sec) {
                get_and_update_duration_update_form(data_id_value, duration_window.text())
                if (sec <= 58) {
                    second = sec + 1;
                } else if (sec === 59) {
                    if (min === 59) {
                        hour = hr + 1;
                        minute = 0;
                    } else {
                        minute = min + 1;
                    }
                    second = 0;
                    duration_update_form.submit();
                }
                if (second <= 9) {
                    second_display = '0' + second;
                } else {
                    second_display = second;
                }
                if (minute <= 9) {
                    minute_display = '0' + minute;
                } else {
                    minute_display = minute;
                }
                duration_window.empty().text(
                    hour + ':' + minute_display + ':' + second_display
                );
                get_and_update_duration_update_form(data_id_value, duration_window.text())
                localStorage.setItem('game_timer_value', duration_window.text());
            }

            function game_timer_start() {
                localStorage.setItem('game_timer_status', 'running');
                localStorage.setItem('game_timer_id', data_id_value);
                run_timer = setInterval(function () {
                    game_timer_run(hour, minute, second)
                }, 1000);
            }
            function game_timer_stop() {
                localStorage.setItem('game_timer_status', 'not_running');
                clearInterval(run_timer);
            }
            if (timer_running === 'not_running') {
                game_timer_stop();
            }
            else if (timer_running === 'running') {
                game_timer_start();
            }
        },
        reset_game_timer: function(data_id_value) {
            let duration_window = $('#' + data_id_value + '-gameTimerDuration');
            let form = $('#' + data_id_value + '-gameTimerDurationUpdateForm');
            let input = $(form).children().children('input');
            input.val('0:00:00');
            form.submit();
            duration_window.empty().text('0:00:00');
        },
    }
}

// reveal editing options for a Game Timer
$('.game-timer-title').click(function() {
    'use strict';
    let selector = $(this).closest('form');
    let data_id = selector.attr("data-id");
    let game_timer_title_box = $("#" + data_id + "-gameTimerTitle");
    let game_timer_title_input = $("#" + data_id + '-gameTimerTitleInput');
    let confirm_game_timer_title_change_btn = $("#" + data_id + '-confirmGameTimerTitleChangeBtn');
    let cancel_game_timer_title_change_btn = $("#" + data_id + '-cancelGameTimerTitleChangeBtn');
    let game_timer_control_box_btn = $('.game-timer-control-box-btn');
    let game_timer_delete_btn = $("#" + data_id + '-gameTimerDeleteBtn');


    function revealGameTimerTitleChangeBtns() {
        game_timer_title_box.css({'display': 'none'});
        game_timer_title_input.css({'display': 'inline', 'background-color': '#555555'});
        game_timer_control_box_btn.css({'display': 'none'});
        confirm_game_timer_title_change_btn.css({'display': 'inline'});
        cancel_game_timer_title_change_btn.css({'display': 'inline'});
        game_timer_delete_btn.css({'display': 'inline'});
    }

    function hideGameTimerTitleChangeBtns() {
        game_timer_title_box.css({'display': 'inline'});
        game_timer_title_input.css({'display': 'none'});
        game_timer_control_box_btn.css({'display': 'inline'});
        confirm_game_timer_title_change_btn.css({'display': 'none'});
        cancel_game_timer_title_change_btn.css({'display': 'none'});
        game_timer_delete_btn.css({'display': 'none'});
    }

        revealGameTimerTitleChangeBtns();
    game_timer_title_input.children('input').val(game_timer_title_box.text().trim());
    game_timer_title_input.children('input').focus();

    // reveal title, hide input and re-enable buttons if user clicks cancel
    cancel_game_timer_title_change_btn.click(function() {
        hideGameTimerTitleChangeBtns();
        });
});

// update a game timer title
$('.game-timer-form').submit(function(e) {
    'use strict';
    // preventing from page reload and default actions
    e.preventDefault();
    let data_id = '#' + $(this).attr("data-id");
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
            // reset the title box and display the value
            $(data_id + '-gameTimerTitle').css({'display': 'inline'})
                                                .empty()
                                                .prepend(fields.title);
            $(data_id + '-gameTimerTitleInput').css({'display': 'none'});
            $('.game-timer-control-box-btn').css({'display': 'inline'});
            $(data_id + '-confirmGameTimerTitleChangeBtn').css({'display': 'none'});
            $(data_id + '-cancelGameTimerTitleChangeBtn').css({'display': 'none'});
            $(data_id + '-gameTimerDeleteBtn').css({'display': 'none'});
            console.log('ajaxSuccess');
        },
        error: function (response) {
            console.log(response["responseJSON"]["error"]);
            messageControl.display_error_message('#errorMessageWrapper', 'Uh oh, status ' + response.status);
        }
    })
});

// detect window unloads, stop the game timer and save the timer duration
$(window).on('beforeunload', function() {
    console.log('unload trigger')
    if (localStorage.getItem('game_timer_status') === 'running') {
        timer_running = false;
        let data_id = localStorage.getItem('game_timer_id');
        let form = $('#' + data_id + '-gameTimerDurationUpdateForm');
        let input = $(form).children().children('input');
        input.val(localStorage.getItem('game_timer_value'));
        form.submit()
        gameTimerControl.game_timer_funcs.game_timer_start_stop(data_id, 'not_running');
        // set the timer status to continue running only if the user is refreshing
        // the tool-session page.  Otherwise the timer will stop running, with the
        // assumption the came from the login page, or home page etc.
        if (document.referrer.includes('tool-session')) {
            localStorage.setItem('game_timer_status', 'running');
        }
    }
});

// if a game timer was running before a page reload, set the correct duration
// value and start the timer
if (window.location.href.includes('tool-session')) {
    // check for running timers and start them on page load
    if (localStorage.getItem('game_timer_status') === 'running') {
        timer_running = true;
        let data_id = localStorage.getItem('game_timer_id');
        let duration_window = $('#' + data_id + '-gameTimerDuration');
        duration_window.text(localStorage.getItem('game_timer_value'));
        gameTimerControl.game_timer_funcs.game_timer_start_stop(data_id, 'running');
    }
}

// start a game timer and set timer_running to true
$('.game-timer-control-box-btn.start').click(function() {
    let data_id = $(this).attr('data-id');
    if (timer_running === false) {
        timer_running = true;
        gameTimerControl.game_timer_funcs.game_timer_start_stop(data_id, 'running');
    }
});
// stop a game timer and set timer_running to false
$('.game-timer-control-box-btn.stop').click(function() {
    if (timer_running === true) {
        timer_running = false;
        let data_id = $(this).attr('data-id');
        let form = $('#' + data_id + '-gameTimerDurationUpdateForm');
        form.submit()
        gameTimerControl.game_timer_funcs.game_timer_start_stop(data_id, 'not_running');
    }
});
// reset a game timer back to 0
$('.game-timer-control-box-btn.reset').click(function() {
    timer_running = false;
    let data_id = $(this).attr('data-id');
    gameTimerControl.game_timer_funcs.reset_game_timer(data_id);
    gameTimerControl.game_timer_funcs.game_timer_start_stop(data_id, 'not_running');
});

// push current game timer duration to database
$('.game-timer-duration-update-form').submit(function(e) {
    'use strict';
    e.preventDefault();
    let data_id = '#' + $(this).attr('data-id');
    let serialized_data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: serialized_data,
        success: function (response) {
            console.log('ajaxSuccess');
        },
        error: function (response) {
            console.log(response["responseJSON"]["error"]);
            messageControl.display_error_message('#errorMessageWrapper', 'Uh oh, status ' + response.status);
        }
    });
});


// --------------- DRAW BAG CONTROL ---------------

drawBagControl = {
    draw_bag_funcs: {}
}

// reveal editing options for a draw bag box
$('.draw-bag-title').click(function() {
    'use strict';
    let selector = $(this).closest('form');
    let data_id = selector.attr("data-id");
    let draw_bag_title_box = $("#" + data_id + "-drawBagTitle");
    let draw_bag_title_input = $("#" + data_id + '-drawBagTitleInput');
    let confirm_draw_bag_title_change_btn = $("#" + data_id + '-confirmDrawBagTitleChangeBtn ');
    let cancel_draw_bag_title_change_btn = $("#" + data_id + '-cancelDrawBagTitleChangeBtn');
    let draw_bag_control_box_btn = $('.draw-bag-control-box-btn');
    let draw_bag_delete_btn = $("#" + data_id + '-drawBagDeleteBtn');

    function revealDrawBagTitleChangeBtns() {
        draw_bag_title_box.css({'display': 'none'});
        draw_bag_title_input.css({'display': 'inline', 'background-color': '#555555'});
        draw_bag_control_box_btn.css({'display': 'none'});
        confirm_draw_bag_title_change_btn.css({'display': 'inline'});
        cancel_draw_bag_title_change_btn.css({'display': 'inline'});
        draw_bag_delete_btn.css({'display': 'inline'});
    }
    function hideDrawBagTitleChangeBtns() {
        draw_bag_title_box.css({'display': 'inline'});
        draw_bag_title_input.css({'display': 'none'});
        draw_bag_control_box_btn.css({'display': 'inline'});
        confirm_draw_bag_title_change_btn.css({'display': 'none'});
        cancel_draw_bag_title_change_btn.css({'display': 'none'});
        draw_bag_delete_btn.css({'display': 'none'});
    }
    revealDrawBagTitleChangeBtns();
    draw_bag_title_input.children('input').val(draw_bag_title_box.text().trim());
    draw_bag_title_input.children('input').focus();

    // reveal title, hide input and re-enable buttons if user clicks cancel
    cancel_draw_bag_title_change_btn.click(function() {
    hideDrawBagTitleChangeBtns();
    });
});

// update a draw bag title and hide editing controls
$('.draw-bag-form').submit(function(e) {
    'use strict';
    // preventing from page reload and default actions
    e.preventDefault();
    let data_id = '#' + $(this).attr("data-id");
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
            // reset the title box and display the value
            $(data_id + '-drawBagTitle').css({'display': 'inline'})
                                                .empty()
                                                .prepend(fields.title);
            $(data_id + '-drawBagTitleInput').css({'display': 'none'});
            $('.draw-bag-control-box-btn').css({'display': 'inline'});
            $(data_id + '-confirmDrawBagTitleChangeBtn').css({'display': 'none'});
            $(data_id + '-cancelDrawBagTitleChangeBtn').css({'display': 'none'});
            $(data_id + '-drawBagDeleteBtn').css({'display': 'none'});
            console.log('ajaxSuccess');
        },
        error: function (response) {
            console.log(response["responseJSON"]["error"]);
            messageControl.display_error_message('#errorMessageWrapper', 'Uh oh, status ' + response.status);
        }
    })
});


// --------------- END OF FILE ---------------
console.log('this application has been brought to you by David Cates.');