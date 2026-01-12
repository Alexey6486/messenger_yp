export default `
<div class="{{styles.modal-container}}" id="{{id}}">

<div class="{{styles.chat-users-list}} {{styles.modal-ul-list}}">
{{{ markup.modal-chat-users-list }}}
{{#if isDisabled}}
<div class="{{styles.modal-no-users}}">
В группе никого нет
</div>
{{/if}}
</div>

</div>
`;
