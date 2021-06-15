// reload the contents of an element
function load_element(element_id, callback) {
    'use strict';
    let element = $(element_id);
    element.load(' ' + element_id + ' > *', function() {
        closeToolPageCover();
        if (callback !== null) {
          callback();
        }
    });
}
// display the active tool
function display_active_tool(){
    'use strict';
    if (localStorage.getItem('activeTool')) {
        let active_tool = localStorage.getItem('activeTool');
        load_element(active_tool, null);
        $('.tool-body').addClass('no-display');
        $(active_tool).removeClass('no-display');
    }
};
//  on page load - check for an active tool menu and set it to visible
if (localStorage.getItem('activeTool')) {
    display_active_tool();
}

/* Utility function to convert a canvas to a BLOB */
function dataURLToBlob(dataURL) {
    'use strict';
    let BASE64_MARKER = ';base64,';
    if (dataURL.indexOf(BASE64_MARKER) === -1) {
        let parts = dataURL.split(',');
        let contentType = parts[0].split(':')[1];
        let raw = parts[1];

        return new Blob([raw], {type: contentType});
    }

    let parts = dataURL.split(BASE64_MARKER);
    let contentType = parts[0].split(':')[1];
    let raw = window.atob(parts[1]);
    let rawLength = raw.length;

    let uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], {type: contentType});
};
/* End Utility function to convert a canvas to a BLOB      */

// hide an element and reveal a replacement element
function hide_reveal_element(hide_element, reveal_element) {
    'use strict';
    if (hide_element !== null) {
        hide_element.addClass('no-display');
    }
    if (reveal_element !== null) {
        reveal_element.removeClass('no-display');
    }
}

// submit form and reload element
function submit_form_and_load_element(form, element_id, method, message_wrapper, message){
    'use strict';
    let data_id = form.attr("data-id");
    let serializedData = form.serialize();
    $.ajax({
        headers: {"X-HTTP-Method-Override": method},
        type: 'POST',
        url: form.attr('action'),
        data: serializedData,
        success: function () {
            if (element_id !== null) {
                load_element(element_id, null);
                console.log('ajaxSuccess, element loaded');
            } else {
                console.log('ajax success');
            }
            if (message_wrapper !== null) {
                messageControl.display_success_message(message_wrapper, message);
            }
        },
        error: function (response) {
            console.log(response["responseJSON"]["error"]);
            messageControl.display_error_message(
                '#errorMessageWrapper', 'Uh oh, status ' + response.status
            );
        }
    });
}
// reveal the dark cover over the tool page when various forms are opened
function openToolPageCover() {
    'use strict';
    $('#toolPageDarkCover').css({
    'display': 'inline',
    'position': 'absolute',
    'opacity': '70%'
    });
    $('body, html').addClass('no_scroll');
}
// close the dark cover over the tool page
function closeToolPageCover() {
    'use strict';
    $('#toolPageDarkCover').css({
    'display': 'none',
    'position': 'absolute',
    'opacity': '0'
    });
    $('body, html').removeClass('no_scroll');
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
    openToolPageCover();
});
$('#CloseToolSelectionMenuBtn').click(function() {
    'use strict';
    $('#ToolSelectionMenu').css({'top': '-80vh', 'visibility': 'hidden'});
    setTimeout(function(){
        display_active_tool();
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

// set the selected tool to active, close the menu and display the selected tool
function setActiveTool(active_tool_wrapper_id) {
    'use strict';
    setTimeout(function(){
        $('#ToolSelectionMenu').css({'top': '-90vh', 'visibility': 'hidden'});
        localStorage.setItem('activeTool', active_tool_wrapper_id);
        display_active_tool();
    }, 275);
}

// Set the Hp Trackers to the active tool
$("#OpenPlayersBtn").click(function () {
    'use strict';
    setActiveTool('#playersViewWrapper');
});
// Set the Hp Trackers to the active tool
$("#OpenHpTrackersBtn").click(function () {
    'use strict';
    setActiveTool('#hpTrackersViewWrapper');
});
// Set the Die Groups to the active tool
$("#OpenDieGroupsBtn").click(function () {
    'use strict';
    setActiveTool('#dieGroupsViewWrapper');
});
// Set the Resource Groups to the active tool
$("#openResourceGroupsBtn").click(function () {
    'use strict';
    setActiveTool('#resourceGroupsViewWrapper');
});
// Set Game Times to the active tool
$("#openGameTimersBtn").click(function () {
    'use strict';
    setActiveTool('#gameTimersViewWrapper');
});
// Set the Draw Bags to the active tool
$("#openDrawBagsBtn").click(function () {
    'use strict';
    setActiveTool('#drawBagsViewWrapper');
});
// Set the Scoring Groups to the active tool
$("#openScoringGroupsBtn").click(function () {
    'use strict';
    setActiveTool('#scoringGroupsViewWrapper');
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

// --------------- HP TRACKER CONTROL ---------------

// control timeout before hp_value increase or decrease is submitted
localStorage.setItem('hp_change_value', '0');
let hpTrackerTimeoutHandler;

function timeoutControl(element) {
    'use strict';
    clearTimeout(hpTrackerTimeoutHandler);
    let selector = $(element).closest('.hp-change-value-form');
    let data_id = '#' + selector.attr("data-id");
    let hp_change_value = parseInt(localStorage.getItem('hp_change_value'));
    let hp_initial_value = parseInt($(data_id + "-hpValue").text());
    let hp_add_subtract_value = hp_initial_value + hp_change_value;
    // get the title of the hp tracker to submit with the form so its not set
    // to an empty string when the form posts.
    let title_box = $(data_id + "-hpTrackerTitle");

    // After a 2 second delay submit the form and reset the change value to 0
    hpTrackerTimeoutHandler = setTimeout(function () {
        $(data_id + '-hpValueInput input').val(hp_add_subtract_value);
        $(data_id + '-hpTrackerTitleInput input').val(title_box.text());
        $(data_id + '-hpChangeValueForm').submit();
        $(data_id + '-hpValueChange').css({'display': 'none'});
        $(data_id + '-hpValueChangeCover').css({'display': 'none'});
        localStorage.setItem('hp_change_value', '0');
    }, 2000);
}

// decrease the hp value with each button click - value is not submitted until
// after a 2 second delay via timeoutControl()
$("#hpTrackersViewWrapper").on('click', '.hp-value-change-btn.decrease', function (e) {
    'use strict';
    let selector = $(this).closest('.hp-tracker-control-box');
    let data_id = selector.attr('data-id');
    let tool_box = $('#' + data_id + '-hpTrackerBox');
    tool_box.addClass('raise-over-cover');
    openToolPageCover();
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
$("#hpTrackersViewWrapper").on('click', '.hp-value-change-btn.increase', function (e) {
    'use strict';
    let selector = $(this).closest('.hp-tracker-control-box');
    let data_id = selector.attr('data-id');
    let tool_box = $('#' + data_id + '-hpTrackerBox');
    tool_box.addClass('raise-over-cover');
    openToolPageCover();
    let hp_change_value = parseInt(localStorage.getItem('hp_change_value'));
    hp_change_value++;
    localStorage.setItem('hp_change_value', hp_change_value.toString());
    $(selector.find('.hp-change-value')).css({'display': 'inline'});
    $(selector.find('.hp-change-value-cover')).css({'display': 'inline'});
    $(selector.find('.hp-change-value')).empty().prepend(hp_change_value);
    timeoutControl(this);

});
// reveal editing options for an hp tracker - change title/delete
$("#hpTrackersViewWrapper").on('click', '.tool-title', function (e) {
    'use strict';
    let data_id = $(this).attr('data-id');
    let tool_box = $('#' + data_id + '-hpTrackerBox');
    let control_values_box = $('#' + data_id + '-controlValuesBox');
    let edit_values_box = $('#' + data_id + '-editValuesBox');
    let title = $('#' + data_id + '-hpTrackerTitle');
    let title_input = $('#' + data_id + '-hpTrackerTitleInput');
    let delete_tool_form = $('#' + data_id + '-deleteToolForm');
    title_input.children('input').val(title.text().trim());
    tool_box.addClass('raise-over-cover');
    openToolPageCover();
    hide_reveal_element(control_values_box, edit_values_box);
    hide_reveal_element(title, title_input);
    hide_reveal_element(null, delete_tool_form);
    $("#hpTrackersViewWrapper").on('click', '.cancel-change-btn', function (e) {
        hide_reveal_element(edit_values_box, control_values_box);
        hide_reveal_element(title_input, title);
        hide_reveal_element(delete_tool_form, null);
        closeToolPageCover();
        tool_box.removeClass('raise-over-cover');
    });
});
// submit the change value form and fill in empty inputs if needed
$("#hpTrackersViewWrapper").on('submit', '.hp-change-value-form', function (e) {
    'use strict';
    e.preventDefault();
    let form = $(this);
    let data_id = form.attr('data-id');
    let tool_box = $('#' + data_id + '-hpTrackerBox');
    tool_box.removeClass('raise-over-cover');
    let element_id = '#' + data_id + '-hpTrackerBox';
    // check if the hp value has been changed, if not then set the hp value input
    // to the current hp value
    if (parseInt(localStorage.getItem('hp_change_value')) === 0) {
        let hp_initial_value = parseInt($('#' + data_id + "-hpValue").text());
        $('#' + data_id + '-hpValueInput input').val(hp_initial_value);
    }
    submit_form_and_load_element(form, element_id, 'PUT');
});
// delete an hp tracker
$("#hpTrackersViewWrapper").on('submit', '.delete-tool-form', function (e) {
    'use strict';
    e.preventDefault();
    let form = $(this);
    let data_id = form.attr('data-id');
    submit_form_and_load_element(form, '#hpTrackersViewWrapper', 'DELETE');
});


// --------------- DICE CONTROL ---------------

diceControl = {
    dice_funcs: {
        open_add_die_form: function(this_value) {
            let data_id = "#" + $(this_value).attr('data-id');
            let form_wrapper = $(data_id + '-dieGroupAddNewDieFormWrapper');
            form_wrapper.removeClass('no-display');
            openToolPageCover();
        },
        close_add_die_form: function(this_value) {
            let data_id = $(this_value).attr('data-id');
            let form_wrapper = $("#" + data_id + '-dieGroupAddNewDieFormWrapper');
            form_wrapper.addClass('no-display');
            load_element("#" + data_id + '-dieGroupBox', null);
        }
    }
};
// reveal editing options for a diegroup - change title/delete
$("#dieGroupsViewWrapper").on('click', '.tool-title', function (e) {
    'use strict';
    let data_id = $(this).attr('data-id');
    let tool_box = $('#' + data_id + '-dieGroupBox');
    let control_values_box = $('#' + data_id + '-controlValuesBox');
    let edit_values_box = $('#' + data_id + '-editValuesBox');
    let title = $('#' + data_id + '-dieGroupTitle');
    let title_input = $('#' + data_id + '-dieGroupTitleInput');
    let delete_tool_form = $('#' + data_id + '-deleteToolForm');
    title_input.children('input').val(title.text().trim());
    tool_box.addClass('raise-over-cover');
    openToolPageCover();
    hide_reveal_element(control_values_box, edit_values_box);
    hide_reveal_element(title, title_input);
    hide_reveal_element($('.die-rolled-value'), $('.delete-die-form'));
    hide_reveal_element(null, delete_tool_form);
    $("#dieGroupsViewWrapper").on('click', '.cancel-change-btn', function (e) {
        hide_reveal_element(edit_values_box, control_values_box);
        hide_reveal_element(title_input, title);
        hide_reveal_element(delete_tool_form, null);
        hide_reveal_element($('.delete-die-form'), $('.die-rolled-value'));
        closeToolPageCover();
        tool_box.removeClass('raise-over-cover');
    });
});
// delete a die group
$("#dieGroupsViewWrapper").on('submit', '.delete-tool-form', function (e) {
    'use strict';
    e.preventDefault();
    let form = $(this);
    let data_id = form.attr('data-id');
    submit_form_and_load_element(form, '#dieGroupsViewWrapper', 'DELETE');
});
// delete a single die
$("#dieGroupsViewWrapper").on('submit', '.delete-die-form', function (e) {
    'use strict';
    e.preventDefault();
    let form = $(this);
    let data_id = form.attr('data-id');
    let die_group_box_id = '#' + data_id + '-dieGroupBox';
    submit_form_and_load_element(form, die_group_box_id, 'DELETE');
});
// change a die group title
$("#dieGroupsViewWrapper").on('submit', '.die-group-update-form', function (e) {
    'use strict';
    e.preventDefault();
    let form = $(this);
    let data_id = form.attr('data-id');
    let tool_box = $('#' + data_id + '-dieGroupBox');
    tool_box.removeClass('raise-over-cover');
    let element_id = '#' + data_id + '-dieGroupBox';
    submit_form_and_load_element(form, element_id, 'PUT');
});
// roll an entire dice group
$("#dieGroupsViewWrapper").on('submit', '.die-group-roll-all-form', function (e) {
    'use strict';
    e.preventDefault();
    let form = $(this);
    let data_id = form.attr('data-id');
    let element_id = '#' + data_id + '-dieGroupBox';
    submit_form_and_load_element(form, element_id, 'GET');
});
// roll a single die
$("#dieGroupsViewWrapper").on('submit', '.die-group-roll-die-form', function (e) {
    'use strict';
    e.preventDefault();
    let form = $(this);
    let data_id = form.attr('data-id');
    let element_id = '#' + data_id + '-dieGroupBox';
    submit_form_and_load_element(form, element_id, 'GET');
});
// open the add die form
$("#dieGroupsViewWrapper").on('click', '.die-group-add-die-open-form-btn', function (e) {
    'use strict';
    diceControl.dice_funcs.open_add_die_form(this);
});
// close the add die form and reload the die groups
$("#dieGroupsViewWrapper").on('click', '.create-custom-object-form-done-btn.die', function (e) {
    'use strict';
    diceControl.dice_funcs.close_add_die_form(this);
});

// add a die with n sides via the #dieGroupAddDieStandardForm
$("#dieGroupsViewWrapper").on('submit', '.create-custom-object-form.die', function (e) {
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
// quickly add a common die via the #dieGroupAddDieStandardForm
$("#dieGroupsViewWrapper").on('click', '.quick-die-create-btn', function (e) {
    'use strict';
    e.preventDefault();
    let data_id = $(this).parent().parent('div').attr('data-id');
    let form = $('#' + data_id + '-dieGroupAddDieStandardForm');
    let selected_die_num_sides = $(this).attr('data-num-sides').toString();
    $('#' + data_id + '-addDieStandardNumSidesInput input').val(selected_die_num_sides);
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
            'use strict';
            let data_id = '#' + $(this_value).attr('data-id');
            let form_wrapper = $(data_id + '-resourceGroupCreateResourceFormWrapper');
            form_wrapper.removeClass('no-display');
            openToolPageCover();
        },
        close_create_resource_form: function(this_value) {
            'use strict';
            let data_id = $(this_value).attr('data-id');
            let form_wrapper = $('#' + data_id + '-resourceGroupCreateResourceFormWrapper');
            form_wrapper.addClass('no-display');
            load_element('#' + data_id + '-resourceGroupBox', null);
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
            let data_id = form.attr("data-id");
            let element_id = '#' + data_id + '-resourceBox';
            let initial_qty = parseInt($('#' + data_id + object_quantity_box_id).text());
            let add_subtract_value = initial_qty + resource_change_value;
            resourceTimeoutHandler = setTimeout(function () {
                $('#' + data_id + input_field_id).val(add_subtract_value);
                // this section completes the forms.py - ResourceForm so that data is not lost when the form is submitted
                let resource_name = $('#' + data_id + '-resourceName').text().trim();
                let resource_name_input = $('#' + data_id + '-qtyChangeResourceNameInputWrapper').children('input');
                resource_name_input.val(resource_name);
                if ($('#' + data_id + '-qtyChangeResourceProdAvailableInputWrapper')) {
                    let prod_modifier = parseInt($('#' + data_id + '-productionModifierQtyBox').text().trim());
                    let prod_available_input = $('#' + data_id + '-qtyChangeResourceProdAvailableInputWrapper').children('input');
                    let prod_modifier_input = $('#' + data_id + '-qtyChangeResourceProdModifierInputWrapper').children('input');
                    prod_available_input.attr('checked', 'checked');
                    prod_modifier_input.val(prod_modifier);
                }
                submit_form_and_load_element(form, element_id, 'PUT');
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
            let data_id = form.attr("data-id");
            let element_id = '#' + data_id + '-resourceBox';
            let initial_qty = parseInt($('#' + data_id + object_quantity_box_id).text());
            let add_subtract_value = initial_qty + production_modifier_change_value;
            productionModifierTimeoutHandler = setTimeout(function () {
                $('#' + data_id + input_field_id).val(add_subtract_value);
                // this section completes the forms.py - ResourceForm so that data is not lost when the form is submitted
                let resource_name = $('#' + data_id + '-resourceName').text().trim();
                let resource_name_input = $('#' + data_id + '-prodChangeResourceNameInputWrapper').children('input');
                resource_name_input.val(resource_name);
                let resource_qty = parseInt($('#' + data_id + '-resourceQtyBox').text().trim());
                let resource_qty_input = $('#' + data_id + '-prodChangeResourceQtyInputWrapper').children('input');
                resource_qty_input.val(resource_qty);
                let prod_available_input = $('#' + data_id + '-prodChangeResourceProdAvailableInputWrapper').children('input');
                prod_available_input.attr('checked', 'checked');
                submit_form_and_load_element(form, element_id, 'PUT');
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

// reveal editing options for a resource group - change title/delete
$("#resourceGroupsViewWrapper").on('click', '.tool-title', function (e) {
    'use strict';
    let data_id = $(this).attr('data-id');
    let tool_box = $('#' + data_id + '-resourceGroupBox');
    let control_values_box = $('#' + data_id + '-controlValuesBox');
    let edit_values_box = $('#' + data_id + '-editValuesBox');
    let title = $('#' + data_id + '-resourceGroupTitle');
    let title_input = $('#' + data_id + '-resourceGroupTitleInput');
    let delete_tool_form = $('#' + data_id + '-deleteToolForm');
    title_input.children('input').val(title.text().trim());
    tool_box.addClass('raise-over-cover');
    openToolPageCover();
    hide_reveal_element(control_values_box, edit_values_box);
    hide_reveal_element(title, title_input);
    hide_reveal_element(null, delete_tool_form);
    $("#resourceGroupsViewWrapper").on('click', '.cancel-change-btn', function (e) {
        hide_reveal_element(edit_values_box, control_values_box);
        hide_reveal_element(title_input, title);
        hide_reveal_element(delete_tool_form, null);
        closeToolPageCover();
        tool_box.removeClass('raise-over-cover');
    });
});
// delete an resource group
$("#resourceGroupsViewWrapper").on('submit', '.delete-tool-form', function (e) {
    'use strict';
    e.preventDefault();
    let form = $(this);
    let data_id = form.attr('data-id');
    submit_form_and_load_element(form, '#resourceGroupsViewWrapper', 'DELETE');
});
// delete a single resource
$("#resourceGroupsViewWrapper").on('submit', '.delete-resource-form', function (e) {
    'use strict';
    e.preventDefault();
    let form = $(this);
    let data_id = form.attr('data-id');
    let element_id = '#' + data_id + '-resourceGroupBox'
    submit_form_and_load_element(form, element_id, 'DELETE', null, null);
});
// change a resource group title
$("#resourceGroupsViewWrapper").on('submit', '.resource-group-update-form', function (e) {
    'use strict';
    e.preventDefault();
    let form = $(this);
    let data_id = form.attr('data-id');
    let tool_box = $('#' + data_id + '-resourceGroupBox');
    tool_box.removeClass('raise-over-cover');
    let element_id = '#' + data_id + '-resourceGroupBox';
    submit_form_and_load_element(form, element_id, 'PUT');
});
// open the create resource form
$("#resourceGroupsViewWrapper").on('click', '.resource-group-add-resource-open-form-btn', function (e) {
    'use strict';
    resourceControl.resource_funcs.open_create_resource_form(this);
});

// close the create resource form and reload the resource groups
$("#resourceGroupsViewWrapper").on('click', '.create-custom-object-form-done-btn.resource', function (e) {
    'use strict';
    resourceControl.resource_funcs.close_create_resource_form(this);
});
// quickly add a common resource type with the quick-add buttons in the create
// resource form
$("#resourceGroupsViewWrapper").on('click', '.common-object-quick-create-btn.resource-create', function (e) {
    'use strict';
    e.preventDefault();
    let data_id = $(this).parent().parent().attr('data-id');
    let form = $('#' + data_id + '-resourceGroupCreateResourceForm');
    let resource_name = $(this).attr('data-name').toString();
    $('#' + data_id + '-createResourceNameField input').val(resource_name);
    submit_form_and_load_element(form, null, 'POST', '#resourceCreatedSuccessMessageWrapper', 'resource added!');
});
// create a new resource with a custom name
$("#resourceGroupsViewWrapper").on('submit', '.create-custom-object-form.resource', function (e) {
    'use strict';
    e.preventDefault();
    let form = $(this);
    submit_form_and_load_element(form, null, 'POST', '#resourceCreatedSuccessMessageWrapper', 'resource added!');
});
// open the resource name change form and reveal the individual resource
// delete buttons
$("#resourceGroupsViewWrapper").on('click', '.resource-name-box', function (e) {
    'use strict';
    resourceControl.resource_funcs.reveal_resource_title_change_and_delete_btn($(this).attr('data-id'));
});
// hide the resource name change form and hide the individual resource
// delete buttons
$("#resourceGroupsViewWrapper").on('click', '.resource-name-change-cancel-btn', function (e) {
    'use strict';
    resourceControl.resource_funcs.hide_resource_title_change_and_delete_btn($(this).attr('data-id'));
});
// change the name of a resource
$("#resourceGroupsViewWrapper").on('submit', '.resource-name-change-form', function (e) {
    'use strict';
    e.preventDefault();
    let form = $(this);
    let data_id = $(this).attr('data-id');
    let element_id = '#' + data_id + '-resourceBox';
// forms.py - ResourceForm must have all fields completed to prevent data loss
    let resource_qty = parseInt($('#' + data_id + '-resourceQtyBox').text().trim());
    let resource_qty_input = $('#' + data_id + '-nameChangeResourceQtyInputWrapper').children('input');
    resource_qty_input.val(resource_qty);
    if ($('#' + data_id + '-nameChangeResourceProdAvailableInputWrapper')) {
        let prod_modifier = parseInt($('#' + data_id + '-productionModifierQtyBox').text().trim());
        let prod_available_input = $('#' + data_id + '-nameChangeResourceProdAvailableInputWrapper').children('input');
        let prod_modifier_input = $('#' + data_id + '-nameChangeResourceProdModifierInputWrapper').children('input');
        prod_available_input.attr('checked', 'checked');
        prod_modifier_input.val(prod_modifier);
    }
    submit_form_and_load_element(form, element_id, 'PUT');
});

// change the resource quantity with each button click - value is not submitted until
// after a 2 second delay via resourceTimeoutControl()
$("#resourceGroupsViewWrapper").on('click', '.resource-change-amt-btn.resource-increase', function (e) {
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
$("#resourceGroupsViewWrapper").on('click', '.resource-change-amt-btn.resource-decrease', function (e) {
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

// change the production modifier with each button click - value is not submitted until
// after a 2 second delay via resourceTimeoutControl()
$("#resourceGroupsViewWrapper").on('click', '.resource-change-amt-btn.modifier-increase', function (e) {
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
$("#resourceGroupsViewWrapper").on('click', '.resource-change-amt-btn.modifier-decrease', function (e) {
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

// produce resource
$("#resourceGroupsViewWrapper").on('click', '.produce-single-resource-btn', function (e) {
    let data_id = $(this).closest('form').attr('data-id');
    let form = $('#' + data_id + '-produceResourceForm');
    element_id = '#' + data_id + '-resourceBox';
    let new_resource_qty = resourceControl.resource_funcs.calculate_resource_production_value(data_id);
    $("#" + data_id + '-newResourceQtyInput input').val(new_resource_qty);
    // this section completes the forms.py - ResourceForm so that data is not lost when the form is submitted
    let resource_name = $('#' + data_id + '-resourceName').text().trim();
    let resource_name_input = $('#' + data_id + '-produceResourceNameInputWrapper').children('input');
    resource_name_input.val(resource_name);
    let prod_available_input = $('#' + data_id + '-produceResourceProdAvailableInputWrapper').children('input');
    prod_available_input.attr('checked', 'checked');
    submit_form_and_load_element(form, element_id, 'PUT');
});

// --------------- SCORING CONTROL ---------------

scoringControl = {
    scoring_funcs: {
        change_open_sub_group: function(sub_group_wrapper, this_value) {
            'use strict';
            let data_id = $(this_value).parent().attr('data-id');
            $('#' + data_id + '-scoringGroupPlayersWrapper').addClass('absolute-hidden');
            $('#' + data_id + '-scoringGroupCategoriesWrapper').addClass('absolute-hidden');
            $('#' + data_id + '-scoringGroupScoresWrapper').addClass('absolute-hidden');
            $(sub_group_wrapper).removeClass('absolute-hidden');
            localStorage.setItem('active-scoring-group-data-id', data_id.toString());
            localStorage.setItem('active-scoring-view-wrapper-id', sub_group_wrapper.toString());
        },
        set_active_view_wrapper: function() {
            'use strict';
            if (localStorage.getItem('active-scoring-group-data-id')) {
                let active_scoring_group_data_id = localStorage.getItem('active-scoring-group-data-id');
                let active_scoring_view_wrapper_id = localStorage.getItem('active-scoring-view-wrapper-id');
                $('#' + active_scoring_group_data_id  + '-scoringGroupPlayersWrapper').addClass('absolute-hidden');
                $('#' + active_scoring_group_data_id  + '-scoringGroupCategoriesWrapper').addClass('absolute-hidden');
                $('#' + active_scoring_group_data_id  + '-scoringGroupScoresWrapper').addClass('absolute-hidden');
                $(active_scoring_view_wrapper_id).removeClass('absolute-hidden');
            }
        },
        open_create_scoring_category_forms_box: function(this_value) {
            'use strict';
            let data_id = '#' + $(this_value).attr('data-id');
            let form_wrapper = $(data_id + '-scoringCategoryCreateFormWrapper');
            form_wrapper.removeClass('no-display');
            openToolPageCover();
        },
        close_create_scoring_category_forms_box: function(this_value) {
            'use strict';
            let data_id = $(this_value).attr('data-id');
            let element_id = '#' + data_id + '-resourceGroupBox'
            let form_wrapper = $('#' + data_id + '-scoringCategoryCreateFormWrapper');
            form_wrapper.addClass('no-display');
            load_element(element_id, null);
        },
        open_player_score_input_area: function(this_value) {
            'use strict';
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
            'use strict';
            let data_id = '#' + $(this_value).attr('data-id');
            let all_input_areas = $('.score-calc-input-area-wrapper');
            let all_open_buttons = $('.score-calc-input-area-open-btn');
            let all_close_buttons = $('.score-calc-input-area-close-btn');
            all_close_buttons.addClass('absolute-hidden');
            all_open_buttons.removeClass('absolute-hidden');
            all_input_areas.addClass('absolute-hidden');
        },
        update_scoring_group: function(form, data_id) {
            'use strict';
            let scoring_group_box = $('#' + data_id + '-scoringGroupBox');
            let serialized_data = form.serialize();
            $.ajax({
                headers: { "X-HTTP-Method-Override": "PUT" },
                type: 'POST',
                url: form.attr('action'),
                data: serialized_data,
                success: function (response) {
                    scoring_group_box.load(' ' + '#' + data_id + '-scoringGroupBox' + ' > *', function () {
                        scoringControl.scoring_funcs.set_active_view_wrapper();
                    console.log('ajaxSuccess');
                    });
                },
                error: function(response) {
                    let error_text = response.responseText
                        .replace('{','').replace('}','').replace(':','').replace('error','').replaceAll('"','');
                    messageControl.display_error_message('#errorMessageWrapper', error_text);
                }
            });
        },
    }
};

// reveal editing options for a scoring group box
$("#scoringGroupsViewWrapper").on('click', '.scoring-group-title', function (e) {
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

// update a scoring group title
$("#scoringGroupsViewWrapper").on('submit', '.scoring-group-title-form', function (e) {
    'use strict';
    e.preventDefault();
    let data_id = $(this).attr("data-id");
    let form = $('#' + data_id + '-scoringGroupTitleForm');
    scoringControl.scoring_funcs.update_scoring_group(form, data_id);
});
$("#scoringGroupsViewWrapper").on('click', '.scoring-group-control-box-btn', function (e) {
    'use strict';
    let sub_group_wrapper = $(this).attr('data-id');
    scoringControl.scoring_funcs.change_open_sub_group(sub_group_wrapper, $(this));
});
// add a scoring category
$("#scoringGroupsViewWrapper").on('click', '.scoring-group-add-category-open-form-btn', function (e) {
    'use strict';
    scoringControl.scoring_funcs.open_create_scoring_category_forms_box(this);
});
// close the add scoring category form
$("#scoringGroupsViewWrapper").on('click', '.create-custom-object-form-done-btn.scoring_category', function (e) {
    'use strict';
    scoringControl.scoring_funcs.close_create_scoring_category_forms_box(this);
});
// create a new scoring category
$("#scoringGroupsViewWrapper").on('submit', '.create-custom-object-form.scoring-category', function (e) {
    'use strict';
    e.preventDefault();
    let serialized_data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: serialized_data,
        success: function (response) {
            messageControl.display_success_message('#scoringPageSuccessMessageWrapper', 'category added!');
            scoringControl.scoring_funcs.set_active_view_wrapper();
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
$("#scoringGroupsViewWrapper").on('click', '.score-calc-input-area-open-btn', function (e) {
    'use strict';
    scoringControl.scoring_funcs.open_player_score_input_area($(this));
});
//  close all player scoring input areas
$("#scoringGroupsViewWrapper").on('click', '.score-calc-input-area-close-btn', function (e) {
    'use strict';
    scoringControl.scoring_funcs.close_player_score_input_area($(this));
});

// calculate a player's score
$("#scoringGroupsViewWrapper").on('submit', '.score-calc-form', function (e) {
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
    $(player_score_form).children().children('input').closest('#id_score').val(final_score);
    let player_name = $(player_score_form).parent().find('.scoring-calc-name-text').text();
    $(player_score_form).children().children('input').closest('#id_name').val(player_name);
    player_score_form.submit();
});

$("#scoringGroupsViewWrapper").on('submit', '.score-calc-player-score-form', function (e) {
    'use strict';
    e.preventDefault();
    let data_id = $(this).parent().parent().attr('data-id');
    let form = $(this);
    scoringControl.scoring_funcs.update_scoring_group(form, data_id);
});

// --------------- GAME TIMER CONTROL ---------------

let timer_running = false;
let run_timer;

gameTimerControl = {
    game_timer_funcs: {
        game_timer_start_stop: function(data_id_value, timer_run = 'not_running') {
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
        update_game_timer: function(form, data_id) {
            'use strict';
            let game_timer_title_area = $('#' + data_id + '-gameTimerTileArea');
            let serialized_data = form.serialize();
            $.ajax({
                headers: { "X-HTTP-Method-Override": "PUT" },
                type: 'POST',
                url: form.attr('action'),
                data: serialized_data,
                success: function (response) {
                    game_timer_title_area.load(' ' + '#' + data_id + '-gameTimerTileArea' + ' > *', function () {});
                    console.log('ajaxSuccess');
                },
                error: function(response) {
                    let error_text = response.responseText
                        .replace('{','').replace('}','').replace(':','').replace('error','').replaceAll('"','');
                    messageControl.display_error_message('#errorMessageWrapper', error_text);
                }
            });
        },
    }
}

// reveal editing options for a Game Timer
$("#gameTimersViewWrapper").on('click', '.game-timer-title', function () {
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
$("#gameTimersViewWrapper").on('submit', '.game-timer-title-form', function (e) {
    'use strict';
    e.preventDefault();
    let data_id = $(this).attr('data-id')
    let form = $('#' + data_id + '-gameTimerTitleForm')
    let current_timer_duration = $('#' + data_id + '-gameTimerDuration').text().trim();
    let timer_duration_input = form.find('#id_saved_duration');
    timer_duration_input.val(current_timer_duration);
    gameTimerControl.game_timer_funcs.update_game_timer(form, data_id);
});

// detect window unloads, stop the game timer and save the timer duration
$(window).on('beforeunload', function() {
    'use strict';
    console.log('unload trigger');
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
$("#gameTimersViewWrapper").on('click', '.game-timer-control-box-btn.start', function (e) {
    let data_id = $(this).attr('data-id');
    if (timer_running === false) {
        timer_running = true;
        gameTimerControl.game_timer_funcs.game_timer_start_stop(data_id, 'running');
    }
});
// stop a game timer and set timer_running to false
$("#gameTimersViewWrapper").on('click', '.game-timer-control-box-btn.stop', function (e) {
    if (timer_running === true) {
        timer_running = false;
        let data_id = $(this).attr('data-id');
        let form = $('#' + data_id + '-gameTimerDurationUpdateForm');
        form.submit()
        gameTimerControl.game_timer_funcs.game_timer_start_stop(data_id, 'not_running');
    }
});
// reset a game timer back to 0
$("#gameTimersViewWrapper").on('click', '.game-timer-control-box-btn.reset', function (e) {
    timer_running = false;
    let data_id = $(this).attr('data-id');
    gameTimerControl.game_timer_funcs.reset_game_timer(data_id);
    gameTimerControl.game_timer_funcs.game_timer_start_stop(data_id, 'not_running');
});
// push current game timer duration to database
$("#gameTimersViewWrapper").on('submit', '.game-timer-duration-update-form', function (e) {
    'use strict';
    e.preventDefault();
    let data_id = $(this).attr('data-id');
    let form = $('#' + data_id + "-gameTimerDurationUpdateForm");
    // put the name of the game timer into the form for updating the time.
    // the form must be complete prior to submitting to prevent data loss.
    let game_timer_name =  $('#' + data_id + "-gameTimerTitle").text().trim();
    let game_timer_name_input =  $('#' + data_id  + "-savedDurationInputWrapper").find('#id_title');
    game_timer_name_input.val(game_timer_name);
    gameTimerControl.game_timer_funcs.update_game_timer(form, data_id);
});


// --------------- DRAW BAG CONTROL ---------------

let resized_draw_bag_upload_image;

drawBagControl = {
    draw_bag_funcs: {
        change_open_sub_group: function(sub_group_wrapper, this_value) {
            'use strict';
            let data_id = $(this_value).parent().attr('data-id');
            $('#' + data_id + '-drawBagItemsWrapper').addClass('no-display');
            $('#' + data_id + '-drawBagDrawnItemsWrapper').addClass('no-display');
            $('#' + data_id + '-drawBagItemsInBagWrapper').addClass('no-display');
            $(sub_group_wrapper).removeClass('no-display');
            localStorage.setItem('active-draw-bag-group-data-id', data_id.toString());
            localStorage.setItem('active-draw-bag-view-wrapper-id', sub_group_wrapper.toString());

        },
        set_active_view_wrapper: function() {
            'use strict';
            if (localStorage.getItem('active-draw-bag-group-data-id')) {
                let active_draw_bag_group_data_id = localStorage.getItem('active-draw-bag-group-data-id');
                let active_draw_bag_view_wrapper_id = localStorage.getItem('active-draw-bag-view-wrapper-id');
                $('#' + active_draw_bag_group_data_id  + '-drawBagItemsWrapper').addClass('no-display');
                $('#' + active_draw_bag_group_data_id  + '-drawBagDrawnItemsWrapper').addClass('no-display');
                $('#' + active_draw_bag_group_data_id  + '-drawBagItemsInBagWrapper').addClass('no-display');
                $(active_draw_bag_view_wrapper_id).removeClass('no-display');
            }
        },
        update_draw_bag_item_modal: function(group_id, item_name, image_path) {
            'use strict';
            let draw_bag_item_modal_wrapper = $('#' + group_id + '-drawBagItemModalWrapper');
            let draw_bag_item_name = draw_bag_item_modal_wrapper.find('span:first');
            let draw_bag_image = draw_bag_item_modal_wrapper.find('img:first');
            let return_to_bag_btn = draw_bag_item_modal_wrapper.find('.draw-bag-item-modal-return-to-bag-btn');
            draw_bag_item_name.text(item_name);
            draw_bag_image.attr('src', image_path);
        },
        open_draw_bag_item_modal: function(group_id) {
            'use strict';
            let draw_bag_item_modal_wrapper = $('#' + group_id + '-drawBagItemModalWrapper');
            draw_bag_item_modal_wrapper.css({'visibility': 'visible'});
            openToolPageCover();
        },
        close_draw_bag_item_modal: function(group_id) {
            'use strict';
            let draw_bag_item_modal_wrapper = $('#' + group_id + '-drawBagItemModalWrapper');
            draw_bag_item_modal_wrapper.css({'visibility': 'hidden'});
            closeToolPageCover();
        },
        update_bag_and_open_modal: function(form) {
            'use strict';
            let data_id = $(form).attr('data-id');
            return $.ajax({
                type: 'GET',
                url: $(form).attr('action'),
                success: function (response) {

                    try {
                        let drawn_item = JSON.parse(response.item);
                        let drawn_item_id = drawn_item[0]['pk'];
                        let drawn_item_group_id = drawn_item[0]['fields']['group'];
                        let drawn_item_name = drawn_item[0]['fields']['name'].toString();
                        let drawn_item_image_path = '/' + drawn_item[0]['fields']['image'];
                        $('#drawBagsViewWrapper').load(' #drawBagsViewWrapper > *', function() {
                        drawBagControl.draw_bag_funcs.update_draw_bag_item_modal(
                            drawn_item_group_id, drawn_item_name, drawn_item_image_path)
                        drawBagControl.draw_bag_funcs.open_draw_bag_item_modal(data_id);
                        drawBagControl.draw_bag_funcs.set_active_view_wrapper();
                        });
                    }
                    catch(error) {
                        console.log(error.name)
                        if(error.name === 'SyntaxError') {
                            // this generates messages each time the divs are reloaded.  The volume of messages
                            // was too high so its been disabled.  Keeping it here for future use.
                            // let message = response.message
                            // messageControl.display_success_message('#errorMessageWrapper', message);
                            $('#drawBagsViewWrapper').load(' #drawBagsViewWrapper > *', function() {
                            drawBagControl.draw_bag_funcs.set_active_view_wrapper();
                            messageControl.display_success_message('#drawBagPageSuccessMessageWrapper', 'the bag is empty!')
                            });
                        }
                    }
                    console.log('ajaxSuccess');
                },
                error: function(response) {
                    let error_text = response.responseText
                        .replace('{','').replace('}','').replace(':','').replace('error','').replaceAll('"','');
                    messageControl.display_error_message('#errorMessageWrapper', error_text);
                },
            });
        },
        update_bag: function(form) {
            let data_id = $(form).attr('data-id');
            return $.ajax({
                type: 'GET',
                url: $(form).attr('action'),
                success: function (response) {

                    try {
                        let drawn_item = JSON.parse(response.item);
                        $('#drawBagsViewWrapper').load(' #drawBagsViewWrapper > *', function() {
                        drawBagControl.draw_bag_funcs.set_active_view_wrapper();
                        });
                    }
                    catch(error) {
                        console.log(error.name)
                        if(error.name === 'SyntaxError') {
                            // this generates messages each time the divs are reloaded.  The volume of messages
                            // was too high so its been disabled.  Keeping it here for future use.
                            // let message = response.message
                            // messageControl.display_success_message('#errorMessageWrapper', message);
                            $('#drawBagsViewWrapper').load(' #drawBagsViewWrapper > *', function() {
                            drawBagControl.draw_bag_funcs.set_active_view_wrapper();
                            });
                        }
                    }
                    console.log('ajaxSuccess');
                },
                error: function(response) {
                    let error_text = response.responseText
                        .replace('{','').replace('}','').replace(':','').replace('error','').replaceAll('"','');
                    messageControl.display_error_message('#errorMessageWrapper', error_text);
                },
            });
        },
        create_item_and_update_bag: function(form, form_data_value = false) {
            let form_data = false;
            if (form_data_value) {
                console.log('triggered')
                form_data = new FormData(form[0]);
                form_data.append('image', form_data_value, 'uploaded_image.jpg');
                content_type = false
            }
            console.log(form_data);
            $.ajax({
                processData: false,
                contentType: form_data ? content_type: 'application/x-www-form-urlencoded; charset=UTF-8',
                type: 'POST',
                url: $(form).attr('action'),
                data: form_data ? form_data : form.serialize(),
                success: function (response) {
                    $('#drawBagsViewWrapper').load(' #drawBagsViewWrapper > *', function() {
                    drawBagControl.draw_bag_funcs.set_active_view_wrapper();
                    closeToolPageCover();
                    });
                    console.log('ajaxSuccess');
                },
                error: function(response) {
                    let error_text = response.responseText
                        .replaceAll('{','').replaceAll('}','').replaceAll(':','').replace('error','').replaceAll('"','')
                        .replaceAll('[', '').replaceAll(']', '').replaceAll('\\', '').replaceAll('code', '')
                        .replaceAll('message', '').replaceAll(',', '').replace('image', '');
                    messageControl.display_error_message('#errorMessageWrapper', error_text);
                }
            });
        },
        open_draw_bag_item_create_form_wrapper: function(this_value) {
            let data_id = '#' + $(this_value).attr('data-id');
            let form_wrapper = $(data_id + '-drawBagItemCreateFormWrapper');
            form_wrapper.removeClass('no-display');
            openToolPageCover();
        },
        close_draw_bag_item_create_form_wrapper: function(this_value) {
            let data_id = '#' + $(this_value).attr('data-id');
            let form_wrapper = $(data_id + '-drawBagItemCreateFormWrapper');
            form_wrapper.addClass('no-display');
            $('#drawBagsViewWrapper').load(' #drawBagsViewWrapper > *', function() {
                drawBagControl.draw_bag_funcs.set_active_view_wrapper();
                closeToolPageCover();
            });
        },
        // uploaded images are resized, drawn to a preview canvas and the canvas
        // image is converted to blob and appended to drawBagItemCreateForm for
        // upload
        handleDrawBagImageUpload: function(this_value) {
            let data_id = $(this_value).attr('data-id');
            form = $('#' + data_id + '-drawBagItemCreateForm');
            let canvas = document.getElementById(data_id + '-imageCanvas');
            let context = canvas.getContext('2d');
            let image_input_field = $('#' + data_id + '-id_image')
            let image_upload = image_input_field[0].files[0];
            let file_reader = new FileReader();
            // let file_types =

            file_reader.onload = function(event) {
                let image= new Image();
                let max_height = 350;
                let max_width = 350;

                image.onload = function(event) {
                    let width = image.width;
                    let height = image.height;
                    if (width > height) {
                        height *= max_width / width;
                        width = max_width;
                    } else {
                        if (height > max_height) {
                            width *= max_height / height;
                            height = max_height;
                        }
                    }
                    canvas.width = width;
                    canvas.height = height
                    context.drawImage(image, 0, 0, width, height)
                let canvas_data = canvas.toDataURL("image/png");
                resized_draw_bag_upload_image = dataURLToBlob(canvas_data);
                }
                image.src = event.target.result;
            }
            file_reader.readAsDataURL(image_upload);
            form.reset();
        },
    }
}

// reveal editing options for a draw bag box
$("#drawBagsViewWrapper").on('click', '.draw-bag-title', function() {
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
$("#drawBagsViewWrapper").on('submit', '.draw-bag-form', function(e) {
    'use strict';
    e.preventDefault();
    let data_id = '#' + $(this).attr("data-id");
    let serializedData = $(this).serialize();
    $.ajax({
        headers: { "X-HTTP-Method-Override": "PUT" },
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
        },
    })
});
// change the active view window
$("#drawBagsViewWrapper").on('click', '.draw-bag-control-box-btn', function() {
    let sub_group_wrapper = $(this).attr('data-id');
    drawBagControl.draw_bag_funcs.change_open_sub_group(sub_group_wrapper, $(this));
});
// draw a random item from a draw bag and update the page with the results
$("#drawBagsViewWrapper").on('submit', '.draw-bag-draw-item-form', function (e) {
    e.preventDefault();
    let data_id = $(this).attr('data-id');
    let form = $('#' + data_id + '-drawBagDrawItemForm');
    drawBagControl.draw_bag_funcs.update_bag_and_open_modal(form);
});
// return a specific item to the bag and update the page with the results
$("#drawBagsViewWrapper").on('submit', '.draw-bag-item-return-form', function (e) {
    e.preventDefault();
    let data_id = $(this).attr('data-id')
    let form = $('#' + data_id + '-drawBagItemReturnForm');
    drawBagControl.draw_bag_funcs.update_bag(form);
});
// draw a specific item from the bag and update the page with the results
$("#drawBagsViewWrapper").on('submit', '.draw-bag-item-draw-form', function (e) {
    e.preventDefault();
    let data_id = $(this).attr('data-id');
    let form = $('#' + data_id + '-drawBagItemDrawForm');
    drawBagControl.draw_bag_funcs.update_bag(form);
});
// reset a draw bag by setting the drawn field on all items to False
$("#drawBagsViewWrapper").on('submit', '.draw-bag-reset-form', function (e) {
    e.preventDefault();
    let data_id = $(this).attr('data-id');
    let form = $('#' + data_id + '-drawBagResetForm');
    drawBagControl.draw_bag_funcs.update_bag(form);
});
// open the create new draw bag item form wrapper
$("#drawBagsViewWrapper").on('click', '.draw-bag-add-item-open-form-btn', function() {
    drawBagControl.draw_bag_funcs.open_draw_bag_item_create_form_wrapper($(this));
})
// close the create new draw bag item form wrapper
$("#drawBagsViewWrapper").on('click', '.create-custom-object-form-done-btn.draw_bag_item', function() {
    let data_id = $(this).attr('data-id');
    let sub_group_wrapper = "#" + data_id + '-drawBagItemsWrapper'
    drawBagControl.draw_bag_funcs.close_draw_bag_item_create_form_wrapper($(this));
    drawBagControl.draw_bag_funcs.change_open_sub_group(sub_group_wrapper, $(this));
})
// create a new draw bag item
$("#drawBagsViewWrapper").on('submit', '.create-custom-object-form.draw-bag-item', function (e) {
    e.preventDefault();
    let data_id = $(this).attr('data-id');
    let form = $('#' + data_id + '-drawBagItemCreateForm');
    drawBagControl.draw_bag_funcs.create_item_and_update_bag(form, resized_draw_bag_upload_image);
});
// close the draw bag item modal when the close button is pressed
$("#drawBagsViewWrapper").on('click', '.draw-bag-item-modal-close-btn', function (e) {
    e.preventDefault();
    let data_id = $(this).attr('data-id');
    drawBagControl.draw_bag_funcs.close_draw_bag_item_modal(data_id);
});

// when the "return to bag" button is pressed in the image modal, the item is returned
// to a non-drawn state and the modal is closed
$("#drawBagsViewWrapper").on('click', '.draw-bag-item-modal-return-to-bag-btn', function (e) {
    e.preventDefault();
    let data_id = $(this).attr('data-id');
    drawBagControl.draw_bag_funcs.close_draw_bag_item_modal(data_id);
});

// open the draw bag item modal when an image thumbnail is clicked
$("#drawBagsViewWrapper").on('click', '.draw-bag-item-img-small', function (e) {
    e.preventDefault();
    let item_group_id = $(this).attr('data-id');
    let item_name = $(this).closest('.draw-bag-item-box')
                           .find('.draw-bag-item-box-title')
                           .text();
    let item_image_path = $(this).attr('src');
    drawBagControl.draw_bag_funcs.update_draw_bag_item_modal(
        item_group_id, item_name, item_image_path)
    drawBagControl.draw_bag_funcs.open_draw_bag_item_modal(item_group_id);

});

console.log('this application has been brought to you by David Cates.');
// --------------- END OF FILE ---------------