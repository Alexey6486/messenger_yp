export default `
<div>
<form class="{{styles.add-modal-form}}" id="{{id}}">
{{{ markup.modal-add-user-field }}}
{{{ markup.modal-add-user-submit }}}
</form>
{{#if searchUsersList.length}}
<div class="{{styles.chat-user-list}}">
{{{ markup.modal-add-user-list }}}
</div>
{{/if}}
</div>
`;
