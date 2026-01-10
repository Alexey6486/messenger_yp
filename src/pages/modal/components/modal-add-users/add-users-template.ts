export default `
<div class="{{styles.add-modal-form}}" id="{{id}}">

<form>
{{{ markup.modal-add-user-field }}}
</form>

{{#if addUsersList.length}}
<div class="{{styles.new-users-list}} {{styles.modal-ul-list}}">
{{{ markup.modal-new-users-list }}}
</div>
{{/if}}

{{{ markup.modal-add-user-submit }}}

{{#if searchUsersList.length}}
<div class="{{styles.chat-user-list}}">
{{{ markup.modal-add-user-list }}}
</div>
{{/if}}

</div>
`;
