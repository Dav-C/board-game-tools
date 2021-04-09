//  on page load - check for an active tool menu and set it to visible
if (localStorage.getItem('activeTool')) {
    let activeTool= localStorage.getItem('activeTool');
    $(activeTool).css({'display': 'flex'});
}

// control messages that popup after certain actions (such as creating a tool)

let messageControl = {
    display_message: function(message_wrapper, message) {
        'use strict';
        let message_timeout;
        clearTimeout(message_timeout);
        $(message_wrapper).empty().prepend(
            '<div class="message-box success fade_out_quick">' + message + '</div>'
        ).css({'display': 'inline'});
        message_timeout = setTimeout(function () {
            $(message_wrapper).css({'display': 'none'}).empty();
        }, 2000);
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
                messageControl.display_message('#toolCreatedSuccessMessageWrapper', 'tool created');
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
$("#createResourceGroupForm").submit(newToolsFormSubmit(
    '#createResourceGroupForm',
    '#createResourceGroupFormWrapper',
    '#openResourceGroupsBtn'
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
    hpTrackerTimeoutHandler= setTimeout(function () {
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
            console.log('ajaxSuccess');
        },
        error: function (response) {
            console.log(response["responseJSON"]["error"]);
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
            messageControl.display_message('#dieAddedSuccessMessageWrapper', 'die added!');
            console.log('ajaxSuccess');
        },
        error: function (response) {
            console.log(response["responseJSON"]["error"]);
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
            messageControl.display_message('#dieAddedSuccessMessageWrapper', 'die added!');
            console.log('ajaxSuccess');
        },
        error: function (response) {
            console.log(response["responseJSON"]["error"]);
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
            $(data_id + '-resourceNameInputWrapper').removeClass('absolute-hidden').children('input').focus();;
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
            console.log($(data_id));
        },
        calculate_resource_production_value: function(data_id_value) {
            let data_id = '#' + data_id_value;
            let resource_qty = parseInt($(data_id + '-resourceQtyBox').text());
            let production_qty = parseInt($(data_id + '-productionModifierQtyBox').text());
            let new_resource_qty = (resource_qty + production_qty);
            console.log(resource_qty);
            console.log(production_qty);
            console.log(new_resource_qty);
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
            messageControl.display_message('#resourceCreatedSuccessMessageWrapper', 'resource added!');
            console.log('ajaxSuccess');
        },
        error: function (response) {
            console.log(response["responseJSON"]["error"]);
        }
    });
});

// ajax for adding a resource via the #resourceGroupCreateResourceForm
$('.create-custom-object-form.resource').submit(function(e) {
    'use strict';
    e.preventDefault();
    let serialized_data = $(this).serialize();
    $.ajax({
        type: 'POST',
        url: $(this).attr('action'),
        data: serialized_data,
        success: function (response) {
            messageControl.display_message('#resourceCreatedSuccessMessageWrapper', 'resource added!');
            console.log('ajaxSuccess');
        },
        error: function (response) {
            console.log(response["responseJSON"]["error"]);
        }
    });
});

// open the resource name change form and reveal the individual resource
// delete buttons
$('.resource-name-box').click(function(){
    'use strict';
    resourceControl.resource_funcs.reveal_resource_title_change_and_delete_btn($(this).attr('data-id'));
});
// hide the resource name change form and reveal the individual resource
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
        }
    });
});

$('.produce-single-resource-btn').click(function(){
    let data_id = $(this).closest('form').attr('data-id')
    console.log(data_id)
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
        }
    });
});
// produce resource

console.log('this application has been brought to you by David Cates.');