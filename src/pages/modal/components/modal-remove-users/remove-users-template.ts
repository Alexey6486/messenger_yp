export default `
<div class="{{styles.add-modal-form}}" id="{{id}}">

<div class="{{styles.chat-users-list}} {{styles.modal-ul-list}}">
{{{ markup.modal-chat-users-list }}}
{{#if isDisabled}}
<div class="{{styles.no-users}}">
В группе никого нет
</div>
{{/if}}
</div>

</div>
`;
